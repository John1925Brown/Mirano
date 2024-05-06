import "/src/scss/index.scss";

const header = document.querySelector(".header");
const body = document.body;
let headerHeight = header.offsetHeight;

window.addEventListener("resize", () => {
  headerHeight = header.offsetHeight;
});

window.addEventListener("scroll", () => {
  const scrollDistance = window.scrollY;

  if (scrollDistance > 200) {
    header.classList.add("header--fixed");
    body.style.paddingTop = `${headerHeight}px`;
  } else {
    header.classList.remove("header--fixed");
    body.style.paddingTop = "0";
  }
});

const choices = document.querySelectorAll(".choices");

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

choices.forEach((choice) => {
  const choiseBtn = choice.querySelector(".choices__btn");
  const choiseBox = choice.querySelector(".choices__box");

  choiseBtn.addEventListener("click", () => {
    document.querySelectorAll(".choices__box").forEach((elem) => {
      if (elem.classList.contains("choices__box--open")) {
        elem.classList.remove("choices__box--open");
      }
    });
    
    choiseBox.classList.toggle("choices__box--open");

    adjustElementPosition(choiseBox);
  });

  window.addEventListener("resize", () => {
    adjustElementPosition(choiseBox);
  });
});
