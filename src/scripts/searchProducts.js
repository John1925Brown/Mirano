import { fetchProducts } from "./API";
import { callBackWithPreload } from "./preload";

export const initSearchProducts = () => {
  const headerForm = document.querySelector(".header__form");
  const goodsTitle = document.querySelector(".goods__title");
  const goodsSection = document.querySelector(".goods");

  headerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(headerForm);

    const searchQuery = formData.get("search").trim();
    console.log(searchQuery);

    if (searchQuery) {
      goodsTitle.textContent = "Результат поиска";

      callBackWithPreload(goodsSection, fetchProducts, { search: searchQuery });
    }
  });
};
