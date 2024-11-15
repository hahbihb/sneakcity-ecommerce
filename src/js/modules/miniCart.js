const miniCart = document.querySelector(".mini-cart");

export function miniCartFn(product) {
  const miniCartHTML = `
    <div class="mini-cart-details">
    <img src="${product.rightImage}" alt="" />
    <div>
    <h3 class="mini-cart-product-name">${product.name}</h3>
    <h5 class="mini-cart-product-price">$${product.price}</h5>
    </div>
    </div>`;
  miniCart.insertAdjacentHTML("afterbegin", miniCartHTML);
}

export function closeMiniCart(e) {
  if (
    !miniCart.classList.contains("hidden") &&
    !e.target.closest(".mini-cart") &&
    !e.target.closest(".cart-icon")
  ) {
    miniCart.classList.add("hidden");
  }
}
