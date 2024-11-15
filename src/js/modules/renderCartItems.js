const cartContainer = document.querySelector(".cart");

function renderCartItems(product) {
  const cartHTML = `
        <div class="cart-item cart-item-${product.number}" data-num="${product.number}">
          <div class="remove-cart-item"><i class='bx bx-trash'></i></div>
          <div class="cart-image">
            <img src="${product.rightImage}" alt="" />
          </div>
          <div class="cart-text-content">
            <div>
              <h3 class="subheading cart-product-name">${product.name}</h3>
              <h5 class="subheading cart-product-price">$${product.price}</h5>
            </div>
            <div class="cart-product-counter">
              <div class="counter-minus cursor-pointer white-bg">&minus;</div>
              <div class="counter-number data-num="${product.number}">${product.amount}</div>
              <div class="counter-plus cursor-pointer white-bg">&plus;</div>
            </div>
          </div>
        </div>`;
  cartContainer.insertAdjacentHTML("beforeend", cartHTML);
}

export default renderCartItems;
