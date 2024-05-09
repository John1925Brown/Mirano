export const API_URL = "http://localhost:3000";

export const fetchProducts = async () => {
  try {
    const responce = await fetch(`${API_URL}/api/products`);

    if (!responce.ok) {
      throw new Error(`HTTP error status: ${responce.status}`);
    }

    const products = responce.json();

    return products;
  } catch (error) {
    console.error(`error while receiving data: ${error}`);
    return [];
  }
};
