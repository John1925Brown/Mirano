export default function jsx(tag, attributes = {}, ...children) {
  if (typeof tag === "function") {
    return tag(attributes, ...children);
  }

  const elem = document.createElement(tag);

  Object.entries(attributes).forEach(([key, value]) => {
    if (key === "class") {
      elem.classList.add(...value.split(" "));
    } else if (key.startsWith("on") && key.toLowerCase() in window) {
      elem.addEventListener(key.toLowerCase().substring(2), value);
    } else if (key === "style" && typeof value === "object") {
      Object.assign(elem.style, value);
    } else {
      elem.setAttribute(key, value);
    }
  });

  children.forEach((child) => {
    if (typeof child === "string" || typeof child === "number") {
      elem.append(document.createTextNode(child.toString()));
    } else if (Array.isArray(child)) {
      child.forEach((innerChild) => {
        elem.append(innerChild);
      });
    } else {
      elem.append(child);
    }
  });

  return elem;
}
