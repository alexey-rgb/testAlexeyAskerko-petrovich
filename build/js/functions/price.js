"use strict";

const productPrices = [];

const getPrices = (productsInfo) => {
  productsInfo.forEach((product) => {
    const productPrice = {};
    productPrice["product-info__package-price"] = {
      productId: product.productId,
      "product-info__retail-price": product.priceRetail,
      "product-info__gold-price": product.priceGold,
    };
    productPrice["product-info__metre-price"] = {
      productId: product.productId,
      "product-info__retail-price": product.priceRetailAlt,
      "product-info__gold-price": product.priceGoldAlt,
    };

    productPrices.push(productPrice);
  });
};

export { productPrices, getPrices };
