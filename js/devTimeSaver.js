import { duplicateElement } from "./frontend-utilities";

export default function () {
  // hide taxonomy-navigation
  (function () {
    const styleSheet = document.createElement("style");
    styleSheet.innerHTML = `
    .taxonomy-navigation {
      display: none;
    }
  `;
    document.head.appendChild(styleSheet);
  })();

  // product-list page only
  (function (iMustRun) {
    if (!iMustRun) return;

    // duplicate product list item some times for development ...
    (function () {
      duplicateElement({
        selector: ".product-grid__item",
        times: 16,
        elementModifierCallback: (el, index) => {
          const assetsProductCount = 6;
          let clampedIndex = (index + 2) % assetsProductCount;
          clampedIndex++;
          el.querySelectorAll("img").forEach((img, i) => {
            const newSrc = `assets/images/products/${clampedIndex}/${i + 1}.jpg`;
            img.src = newSrc;
          });
        },
      });
    })();
  })(document.body.classList.contains("PRODUCT-LIST-PAGE"));

  // single-product page only
  (function (iMustRun) {
    if (!iMustRun) return;

    // duplicate product list item some times for development ...
    (function () {
      duplicateElement({
        selector: ".product-grid__item",
        times: 3,
        elementModifierCallback: (el, index) => {
          const assetsProductCount = 6;
          let clampedIndex = (index + 2) % assetsProductCount;
          clampedIndex++;
          el.querySelectorAll("img").forEach((img, i) => {
            const newSrc = `assets/images/products/${clampedIndex}/${i + 1}.jpg`;
            img.src = newSrc;
          });
        },
      });
    })();
  })(document.body.classList.contains("SINGLE-PRODUCT-PAGE"));
}
