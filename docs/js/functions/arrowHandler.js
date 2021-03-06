"use strict";

const arrowHandler = () => {
  const container = document.querySelector(".main"),
    arrowHandler = (evt) => {
      evt.preventDefault();
      let currentInputValue = Number(
        evt.target.parentElement.parentElement.querySelector("input").value
      );
      const input = evt.target.parentElement.parentElement.querySelector(
          "input"
        ),
        arrowAttribute = evt.target.getAttribute("class");

      arrowAttribute.includes("stepper__up")
        ? (input.value = (currentInputValue + 1).toString())
        : arrowAttribute.includes("stepper__down") && currentInputValue === 1
        ? (input.value = 1)
        : arrowAttribute.includes("stepper__down") && currentInputValue !== 1
        ? (input.value = (currentInputValue - 1).toString())
        : false;
    };
  container.addEventListener("click", arrowHandler);
};

export { arrowHandler };
