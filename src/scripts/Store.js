import { API_URL } from "./API";
import { renderCart } from "./renderCart";

class Store {
  constructor() {
    this.observers = [];
    this.products = [];
    this.categories = new Set();
  }
  subscribe(observerFunc) {
    // Метод для добавления новых наблюдателей
    this.observers.push(observerFunc);
  }
  // Метод для уведомления всех наблюдателей о изменении хранилища
  notifyObservers() {
    this.observers.forEach((observer) => observer());
  }
}

class ProductStore extends Store {
  constructor() {
    super();
    this.products = [];
    this.categories = new Set();
  }

  getProducts() {
    return this.products;
  }

  setProducts(newProducts) {
    this.products = newProducts;
    this.updateCategories(newProducts);
    this.notifyObservers();
  }

  getCategories() {
    return this.categories;
  }

  updateCategories(products) {
    this.categories.clear();

    products.forEach((product) => {
      if (product.categories) {
        product.categories.forEach((category) => {
          this.categories.add(category);
        });
      }
    });
    this.notifyObservers();
  }
}

class CartStore extends Store {
  constructor() {
    super();
    this.cart = [];
  }

  async init() {
    await this.registerCart();
    await this.fetchCart();
  }

  async registerCart() {
    try {
      const responce = await fetch(`${API_URL}/api/cart/register`, {
        method: "POST",
        credentials: "include",
      });

      if (!responce.ok) {
        throw new Error(`HTTP Error. Status: ${responce.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  getCart() {
    return this.cart;
  }

  async fetchCart() {
    try {
      const responce = await fetch(`${API_URL}/api/cart`, {
        method: "GET",
        credentials: "include",
      });

      if (!responce.ok) {
        throw new Error(`HTTP Error. Status: ${responce.status}`);
      }

      const data = await responce.json();
      this.cart = data;
      this.notifyObservers();
    } catch (error) {
      console.error(error);
    }
  }

  async postCart({ id, quantity }) {
    try {
      const responce = await fetch(`${API_URL}/api/cart/items`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: id,
          quantity,
        }),
      });

      if (!responce.ok) {
        throw new Error(`HTTP Error. Status: ${responce.status}`);
      }

      const data = await responce.json();
      this.cart = data;
      this.notifyObservers();
    } catch (error) {
      console.error(error);
    }
  }

  async addProductCart(id) {
    await this.postCart({ id, quantity: 1 });
  }

  clearCart() {
    this.cart = [];
    this.notifyObservers();
  }
}

export const productStore = new ProductStore();
export const cartStore = new CartStore();
