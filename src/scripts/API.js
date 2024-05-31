// export const API_URL = "https://delightful-dear-magnolia.glitch.me";
export const API_URL = "https://mirano-api-jgxv.onrender.com/";

import { productStore } from "./Store";

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

    productStore.setProducts(products);
  } catch (error) {
    console.error(`error while receiving data: ${error}`);
    return [];
  }
};

export const sendOrder = async (orderData) => {
  try {
    const responce = await fetch(`${API_URL}/api/orders`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (!responce.ok) {
      throw new Error(`HTTP error, responce status: ${responce.status}`);
    }

    return await responce.json();
  } catch (error) {
    console.error(error);
  }
};
