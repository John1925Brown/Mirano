import { debounce } from "./debounce";

const adjustElementPosition = (elem, count = 0) => {
  const rect = elem.getBoundingClientRect();
  const viewPortWidth = window.innerWidth;

  if (rect.left < 0) {
    elem.style.left = "0";
    elem.style.right = "auto";
    elem.style.transform = "translateX(0)";
  } else if (rect.right > viewPortWidth) {
    elem.style.left = "auto";
    elem.style.right = 0;
    elem.style.transform = "translateX(0)";
  } else {
    elem.style.left = "50%";
    elem.style.right = "auto";
    elem.style.transform = "translateX(-50%)";
  }

  const postRect = elem.getBoundingClientRect();
  if ((postRect.left < 0 || postRect.right > viewPortWidth) && count < 3) {
    count++;
    adjustElementPosition(elem, count);
  }
};
export const initChoices = () => {
  const choices = document.querySelectorAll(".choices");

  const closeAllChoices = ({ target }) => {
    let clickInside = target.closest(".choices");

    if (!clickInside) {
      choices.forEach((choice) => {
        choice
          .querySelector(".choices__box")
          .classList.remove("choices__box--open");
      });

      document.removeEventListener("click", closeAllChoices);
    }
  };

  choices.forEach((choice) => {
    const choiseBtn = choice.querySelector(".choices__btn");
    const choiseBox = choice.querySelector(".choices__box");

    choiseBtn.addEventListener("click", () => {
      choiseBox.classList.toggle("choices__box--open");

      choices.forEach((otherChoise) => {
        if (otherChoise !== choice) {
          otherChoise
            .querySelector(".choices__box")
            .classList.remove("choices__box--open");
        }
      });

      if (choiseBox.classList.contains("choices__box--open")) {
        document.addEventListener("click", closeAllChoices);
      } else {
        document.removeEventListener("click", closeAllChoices);
      }

      adjustElementPosition(choiseBox);
    });

    window.addEventListener(
      "resize",
      debounce(() => {
        adjustElementPosition(choiseBox);
      })
    );
  });
};
