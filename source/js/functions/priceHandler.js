import { productPrices } from "./pricePattern.js";

("use strict");

const priceHandler = (evt) => {
  evt.preventDefault();
  const controllerId = evt.target.getAttribute("id"),
    controllerClass = evt.target.getAttribute("class").split(" ")[0];

  productPrices.forEach((product) => {
    const productId = product[controllerClass]["productId"],
      cardWrapper = document.getElementById(`card-${productId}`),
      goldPrice = cardWrapper.querySelector(".product-info__gold-price"),
      retailPrice = cardWrapper.querySelector(".product-info__retail-price"),
      actualeGoldPrice = +product[controllerClass][
        "product-info__gold-price"
      ].toFixed(2),
      actualeRetailPrice = +product[controllerClass][
        "product-info__retail-price"
      ].toFixed(2);

    if (productId === controllerId) {
      goldPrice.textContent = actualeGoldPrice;
      retailPrice.textContent = actualeRetailPrice;
    }
  });
};

export { priceHandler };
