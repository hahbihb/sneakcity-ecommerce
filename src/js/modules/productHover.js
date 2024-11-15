export function mouseOverProduct(e) {
  const hovered = e.target.closest(".product-box");
  if (!hovered) return;
  const productImg = hovered.querySelector("img[data-src]");
  const ogProductImg = productImg.src;
  productImg.src = productImg.dataset.src;
  productImg.setAttribute("data-original", ogProductImg);
  productImg.style.transform = "scale(1.05)";
}

export function mouseLeaveProduct(e) {
  const hovered = e.target.closest(".product-box");
  if (!hovered) return;
  const productImg = hovered.querySelector("img[data-src]");
  productImg.src = productImg.getAttribute("data-original");
  productImg.style.transform = "scale(1)";
}
