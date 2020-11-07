import getNodes from "../functions/cardsSettings.js";

export default class Card extends getNodes {
  constructor(templateClasses, template, productInfo) {
    super();
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
      calculatePoints,
      calculateMeasure,
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
    this.calculatePoints = calculatePoints;
    this.calculateMeasure = calculateMeasure;
  }
}

// Create a new card & insert 'server' mock-data into new nodes

Card.prototype.getCard = function () {
  const clone = this.template,
    productInfo = this.productInfo,
    accessorie = productInfo.assocProducts
      .replace(/[.,\/#!$%\^&\*:{}=\-_`~()]/g, "")
      .replace(/\s{2,}/g, " "),
    finalAccesorie = accessorie.split(";").filter((expr) => expr !== ""),
    classes = Object.values(this).filter((v) => v[0] === "."),
    nodes = this.getNodes(clone, classes),
    [
      name,
      img,
      code,
      links,
      metreControl,
      packageControl,
      button,
      goldPrice,
      retailPrice,
      accessoriesText,
      calculatePoints,
      calculateMeasure,
    ] = nodes,
    deficitLinkCount = finalAccesorie.length - links.length;

  if (deficitLinkCount > 0) {
    for (let i = 0; i < deficitLinkCount; i++) {
      const newLink = document.createElement("a");
      newLink.setAttribute("class", "accessories__link");
      accessoriesText.after(newLink);
    }
  }

  clone.style.display = "flex";
  clone.setAttribute("id", `card-${productInfo.productId}`);

  metreControl.setAttribute("id", productInfo.productId);
  packageControl.setAttribute("id", productInfo.productId);

  // toogle black-background between of measure controls

  metreControl.onclick = (evt) => {
    if (!Array.from(evt.target.classList).includes("product-info__measure"))
      evt.target.classList.add("product-info__measure");
    packageControl.classList.remove("product-info__measure");
  };

  // toogle black-background between of measure controls

  packageControl.onclick = (evt) => {
    if (!Array.from(evt.target.classList).includes("product-info__measure")) {
      evt.target.classList.add("product-info__measure");
      metreControl.classList.remove("product-info__measure");
    }
  };

  name.textContent = productInfo.title;

  img.src =
    productInfo.primaryImageUrl.replace(/.jpg|.png/gi, "_220x220_1") + ".jpg";
  code.textContent = `${"Код: " + productInfo.code}`;

  // Insert prepared string into accesorie-link

  links.forEach((link, i) => {
    if (finalAccesorie[i] !== undefined) {
      if (finalAccesorie.length - 1 === i)
        link.textContent = finalAccesorie[i] + ".";
      else {
        link.textContent = finalAccesorie[i] + ",";
      }
    }
  });

  // set button id

  button.dataset.productId = `card-${productInfo.productId}`;

  goldPrice.textContent = +productInfo.priceGoldAlt.toFixed(2);
  retailPrice.textContent = +productInfo.priceRetailAlt.toFixed(2);

  metreControl.classList.add("product-info__measure");

  calculatePoints.textContent = `Можно купить за ${productInfo.bonusAmount} балла`;

  calculateMeasure.textContent = `1 ${productInfo.unit} = ${productInfo.unitRatioAlt} ${productInfo.unitAlt}`;

  return clone;
};
