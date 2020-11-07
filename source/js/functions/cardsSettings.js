export default function getNodes() {}

getNodes.prototype.getNodes = (wrapper, classesNames) => {
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
