import Card from "../classes/Card.js";

("use strict");

const container = document.querySelector(".main"),
  classes = [
    ".product-info__name",
    ".product-info__image",
    ".product-info__code",
    ".accessories__link",
    ".product-info__metre-price",
    ".product-info__package-price",
    ".product-info__button",
    ".product-info__gold-price",
    ".product-info__retail-price",
    ".accessories__text",
    ".calculate__points",
    ".calculate__measure",
  ],
  renderCards = (res) => {
    res.forEach((product) => {
      const templateContent = document
        .getElementById("card")
        .content.querySelector(".main__card")
        .cloneNode(true);
      const newCard = new Card(classes, templateContent, product);
      container.appendChild(newCard.getCard());
    });
  };

export { renderCards };
