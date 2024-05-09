import { API_URL } from "./API";

export const ProductCard = (product) => (
  <li class="goods__item">
    <article class="goods__card card">
      <img
        src={`${API_URL}${product.photoUrl}`}
        alt={product.name}
        class="card__img"
      />
      <div class="card__content">
        <h3 class="card__title">{product.name}</h3>
        <div class="card__footer">
          <p class="card__date-delivery">сегодня&nbsp;в&nbsp;14:00</p>
          <button class="card__btn">
            <span class="card__price">{product.price}&nbsp;₽</span>
            <span class="card__btn--text">В&nbsp;корзину</span>
          </button>
        </div>
      </div>
    </article>
  </li>
);
