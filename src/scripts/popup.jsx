const openSelect = () => {
  const selectWrapper = document.querySelector(".popup__delivery--wrapper");
  selectWrapper.classList.add("popup__delivery--wrapper-active");
};
const closeSelect = () => {
  const selectWrapper = document.querySelector(".popup__delivery--wrapper");
  selectWrapper.classList.remove("popup__delivery--wrapper-active");
};

export const Order = (totalPriceValue) => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const deliveryDate = `${day}.${month}`;

  return (
    <section class="popup">
      <div class="popup__container">
        <h3 class="popup__title">Оформить заказ</h3>

        <form class="popup__form" id="order">
          <div class="popup__info">
            <div class="popup__customer">
              <h4 class="popup__info--title">Данные заказчика</h4>

              <div class="popup__customer--info">
                <input
                  type="text"
                  class="popup__customer--name"
                  name="name-buyer"
                  placeholder="Имя"
                />
                <input
                  type="text"
                  class="popup__customer--phone"
                  name="phone-buyer"
                  placeholder="Телефон"
                />
              </div>
            </div>

            <div class="popup__recipient">
              <h4 class="popup__info--title">Данные заказчика</h4>

              <div class="popup__recipient--info">
                <input
                  type="text"
                  class="popup__recipient--name"
                  name="name-recipient"
                  placeholder="Имя"
                />
                <input
                  type="text"
                  class="popup__recipient--phone"
                  name="phone-recipient"
                  placeholder="Телефон"
                />
              </div>
            </div>

            <div class="popup__addres">
              <h4 class="popup__info--title">Адрес</h4>

              <div class="popup__addres--info">
                <input
                  type="text"
                  class="popup__addres--street"
                  placeholder="Улица"
                  name="street"
                />
                <input
                  type="text"
                  class="popup__addres--house"
                  placeholder="Дом"
                  name="house"
                />
                <input
                  type="text"
                  class="popup__addres--flat"
                  placeholder="Квартира"
                  name="flat"
                />
              </div>
            </div>
          </div>

          <div class="popup__payment">
            <label class="popup__payment--label">
              <input
                class="popup__payment--input"
                type="radio"
                name="payment-online"
                value={"true"}
                checked
              />
              Оплата онлайн
            </label>
          </div>

          <div class="popup__delivery">
            <label for="delivery">Доставка {deliveryDate}</label>
            <input type="hidden" name="delivery-date" value={deliveryDate} />

            <div class="popup__delivery--wrapper">
              <select
                class="popup__delivery--select"
                name="delivery-time"
                id="delivery"
                onBlur={closeSelect}
                onFocus={openSelect}
              >
                <option value="9-12">с 9:00 до 12:00</option>
                <option value="12-15">с 12:00 до 15:00</option>
                <option value="15-18">с 15:00 до 18:00</option>
                <option value="18-21">с 18:00 до 21:00</option>
              </select>
            </div>
          </div>
        </form>

        <div class="popup__footer">
          <div class="popup__footer--price">{totalPriceValue}&nbsp;₽</div>
          <button class="popup__footer--button" type="submit" form="order">
            Заказать
          </button>
        </div>
      </div>
      <button class="popup__close" type="button">
        &times;
      </button>
    </section>
  );
};
