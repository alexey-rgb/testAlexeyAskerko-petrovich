import { getData } from "./service/cardsData.js";
import { renderCards } from "./functions/render.js";
import { arrowHandler } from "./functions/arrowHandler.js";
import { controlPrice } from "./functions/payForControl.js";

(function () {
  getData(renderCards);
  arrowHandler();
  controlPrice();
})();
