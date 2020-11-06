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

// get node to continue settings

Card.prototype.getNode = (wrapper, className) => {
  if (className === ".accessories__link")
    return wrapper.querySelectorAll(className);
  return wrapper.querySelector(className);
};

Card.prototype.getNodes = (wrapper, classesNames) => {
  const settableNodes = [];
  classesNames.forEach((className) => {
    if (className === ".accessories__link")
      settableNodes.push(wrapper.querySelectorAll(className));
    else {
      settableNodes.push(wrapper.querySelector(className));
    }
  });
  return settableNodes;
};

// Create a new card & insert 'server' mock-data into new nodes

Card.prototype.getCard = function () {
  const clone = this.template.cloneNode(true),
    accessorie = this.productInfo.assocProducts
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
  clone.setAttribute("id", `card-${this.productInfo.productId}`);

  metreControl.setAttribute("id", this.productInfo.productId);
  packageControl.setAttribute("id", this.productInfo.productId);

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

  name.textContent = this.productInfo.title;

  img.src =
    this.productInfo.primaryImageUrl.replace(/.jpg|.png/gi, "_220x220_1") +
    ".jpg";
  code.textContent = `${"Код: " + this.productInfo.code}`;

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

  button.dataset.productId = `card-${this.productInfo.productId}`;

  goldPrice.textContent = +this.productInfo.priceGoldAlt.toFixed(2);
  retailPrice.textContent = +this.productInfo.priceRetailAlt.toFixed(2);

  metreControl.classList.add("product-info__measure");

  calculatePoints.textContent = `Можно купить за ${this.productInfo.bonusAmount} балла`;

  calculateMeasure.textContent = `1 ${this.productInfo.unit} = ${this.productInfo.unitRatioAlt} ${this.productInfo.unitAlt}`;

  return clone;
};
