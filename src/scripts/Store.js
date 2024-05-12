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

export const store = new Store();
