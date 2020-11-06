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
      accessoriesText,
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
    this.accessoriesText = accessoriesText;
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
    accessorie = this.productInfo.assocProducts
      .replace(/[.,\/#!$%\^&\*:{}=\-_`~()]/g, "")
      .replace(/\s{2,}/g, " "),
    finalAccesorie = accessorie.split(";").filter((expr) => expr !== ""),
    deficitLinkCount =
      finalAccesorie.length - this.getNode(clone, ".accessories__link").length;

  if (deficitLinkCount > 0) {
    for (let i = 0; i < deficitLinkCount; i++) {
      const newLink = document.createElement("a");
      newLink.setAttribute("class", "accessories__link");
      this.getNode(clone, this.accessoriesText).after(newLink);
    }
  }

  clone.style.display = "flex";

  // Insert 'server' mock-data into new card

  this.getNode(clone, this.productName).textContent = this.productInfo.title;

  this.getNode(clone, this.productImage).src =
    this.productInfo.primaryImageUrl.replace(/.jpg|.png/gi, "_220x220_1") +
    ".jpg";
  this.getNode(clone, this.productCode).textContent = `${
    "Код: " + this.productInfo.code
  }`;

  // Insert prepared string into accesorie-link

  this.getNode(clone, this.productAccessories).forEach((link, i) => {
    if (finalAccesorie[i] !== undefined) {
      if (finalAccesorie.length - 1 === i)
        link.textContent = finalAccesorie[i] + ".";
      else {
        link.textContent = finalAccesorie[i] + ",";
      }
    }
  });

  // Get id to the button

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
