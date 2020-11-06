import { priceHandler } from "./priceHandler.js";

const controlPrice = () => {
  const container = document.querySelector(".main");

  container.addEventListener("click", priceHandler);
};

export { controlPrice };
