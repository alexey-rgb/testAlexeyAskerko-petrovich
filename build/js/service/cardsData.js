import { getPrices } from '../functions/price.js'

"use strict";

const getData = (renderProducts) => {
  fetch("../../data/products.json")
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      renderProducts(res);
      getPrices(res)
    })
    .catch((e) => console.log(e));
};

export { getData };
