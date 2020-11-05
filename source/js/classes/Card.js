export default class Card {
  constructor(templateClasses, template, productInfo) {
    const [
      productName,
      productImage,
      productCode,
      productAccessories,
      productMetrePrice,
      productPackagePrice,
      productButton,
      goldPrice,
      retailPrice,
    ] = templateClasses;
    this.productName = productName;
    this.productImage = productImage;
    this.productCode = productCode;
    this.productAccessories = productAccessories;
    this.template = template;
    this.productInfo = productInfo;
    this.productMetrePrice = productMetrePrice;
    this.productPackagePrice = productPackagePrice;
    this.productButton = productButton;
    this.goldPrice = goldPrice;
    this.retailPrice = retailPrice;
  }
}

// Insert sever data into new card

Card.prototype.getNode = (wrapper, className) => {
  if (className === ".accessories__link")
    return wrapper.querySelectorAll(className);
  return wrapper.querySelector(className);
};

// Create a new card

Card.prototype.getCard = function () {
  const clone = this.template.cloneNode(true),
    cloneText = clone.querySelector(this.productCode).textContent.slice(0, 5);
  clone.style.display = "flex";

  // Insert sever data into new card

  this.getNode(clone, this.productName).textContent = this.productInfo.title;

  this.getNode(clone, this.productImage).src =
    this.productInfo.primaryImageUrl.replace(/.jpg|.png/gi, "_220x220_1") +
    ".jpg";
  this.getNode(clone, this.productCode).textContent = `${
    cloneText + this.productInfo.code
  }`;
  this.getNode(clone, this.productAccessories).forEach((link, i) => {
    let accessorie = this.productInfo.assocProducts.split(";\n")[i];
    console.log(
      accessorie.includes("undefined"),
      accessorie.includes(undefined),
      accessorie === undefined
    );
    /*   link.textContent = accessorie.includes("undefined")
      ? accessorie.replace(/./, "") + ","
      : false; */
  });
  this.getNode(
    clone,
    this.productButton
  ).dataset.productId = `card-${this.productInfo.productId}`;
  this.getNode(clone, this.productMetrePrice).setAttribute(
    "id",
    this.productInfo.productId
  );
  this.getNode(clone, this.productPackagePrice).setAttribute(
    "id",
    this.productInfo.productId
  );
  clone.setAttribute("id", `card-${this.productInfo.productId}`);
  this.getNode(
    clone,
    this.goldPrice
  ).textContent = +this.productInfo.priceGoldAlt.toFixed(2);
  this.getNode(
    clone,
    this.retailPrice
  ).textContent = +this.productInfo.priceRetailAlt.toFixed(2);

  return clone;
};
