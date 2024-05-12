export const API_URL = "http://localhost:3000";
import { store } from "./Store";

const formatQueryString = (params) => {
  if (Object.keys(params).length === 0) {
    return "";
  }
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    searchParams.append(key, value);
  });

  return `?${searchParams.toString()}`;
};

export const fetchProducts = async (params = {}) => {
  try {
    const responce = await fetch(
      `${API_URL}/api/products${formatQueryString(params)}`
    );

    if (!responce.ok) {
      throw new Error(`HTTP error status: ${responce.status}`);
    }

    const products = await responce.json();

    store.setProducts(products);
  } catch (error) {
    console.error(`error while receiving data: ${error}`);
    return [];
  }
};
