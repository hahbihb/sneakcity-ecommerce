const productContainer = document.querySelector(".products-container");

const displayProducts = function (product) {
  const html = `
    <div class="product-box product-${product.number}" data-num="${product.number}">
    <div class="product-img">
    <img
    data-src="${product.doubleImage}"
    src="${product.rightImage}"
    alt="blue-green jordan-4"
    />
    </div>
    <h3 class="subheading product-name">${product.name}</h3>
    <h5 class="subheading product-price">$${product.price}</h5>
    </div>`;
  productContainer.insertAdjacentHTML("beforeend", html);
};

export default displayProducts;
