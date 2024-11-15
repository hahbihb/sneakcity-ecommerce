import * as utils from "./utils.js";
import addToCartFn from "./addToCart.js";
import { miniCartFn } from "./miniCart.js";
import { updateWishlist } from "./updateWishlist.js";

const prodModal = document.querySelector(".product-modal-container");
let cart = JSON.parse(localStorage.getItem("cart"));
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

const productModal = function (product, wishlist) {
  const modalhtml = `
  <div class="product-modal product-${product.number}-modal" data-num="${
    product.number
  }">
  <button class="close-modal">&times;</button>
  
  <div class="product-views">
  <div class="product-main-image">
  <img src="${product.rightImage}" alt="" />
  </div>
  <div class="product-view-changer">
  <div class="product-right-view view view--active">
  <img src="${product.rightImage}" alt="" />
  </div>
  <div class="product-double-view view">
  <img src="${product.doubleImage}" alt="" />
  </div>
  <div class="product-back-view view">
  <img src="${product.backImage}" alt="" />
  </div>
  </div>
  </div>
  <div class="product-header">
  <h3 class="product-modal-name">${product.name}</h3>
  <h4 class="product-modal-price">$${product.price}</h4>
  <h6 class="product-id">Product ID: <span>${product.ID}</span></h6>
  </div>
  <div class="product-text text">
  <p>
  ${product.name} is a top sneaker for sneakerheads. With authentic leather
  of color ${product.color[0]}  ${
    product.color.length > 1 ? `and ${product.color[1]}` : ""
  } with english language because, quo maiores dignissimos odio
  reiciendis suitable for Men and Women.
  </p>
  </div>
  <div class="product-counter">
  <div class="counter-minus cursor-pointer">&minus;</div>
  <div class="counter-number">1</div>
  <div class="counter-plus cursor-pointer">&plus;</div>
  </div>
  <div class="product-buttons">
  <div class="wishlist-button heading-tertiary white-bg ${
    wishlist.includes(product) ||
    wishlist.find((item) => item.ID === product.ID)
      ? ""
      : "add"
  }">${
    wishlist.includes(product) ||
    wishlist.find((item) => item.ID === product.ID)
      ? "REMOVE FROM"
      : "ADD TO"
  } WISHLIST</div>
  <div class="add-to-cart-button heading-tertiary blue-bg">ADD TO CART</div>
  </div>
  </div>`;

  prodModal.insertAdjacentHTML("beforeend", modalhtml);

  // VIEW CHANGER
  const viewChanger = document.querySelector(".product-view-changer");
  viewChanger.addEventListener("click", utils.changeView);

  // CLOSE MODAL
  const closeModalBtn = document.querySelector(".close-modal");
  closeModalBtn.addEventListener("click", utils.closeModal);

  // PRODUCT COUNTER
  const counterNumber = document.querySelector(".counter-number");
  const counterIncreaseBtn = document.querySelector(".counter-plus");
  const counterDecreaseBtn = document.querySelector(".counter-minus");

  counterIncreaseBtn.addEventListener("click", () =>
    utils.increaseCounter(counterNumber)
  );
  counterDecreaseBtn.addEventListener("click", () =>
    utils.decreaseCounter(counterNumber)
  );
};

const cartToast = document.querySelector(".cart-toast");
const wishlistToast = document.querySelector(".wishlist-toast");

export const openModal = function (product) {
  //get content for product modal
  productModal(product, wishlist);

  //MODAL ADD TO CART BUTTON
  const addToCart = document.querySelector(".add-to-cart-button");
  const counterNumber = document.querySelector(".counter-number");
  addToCart.addEventListener("click", function () {
    utils.showToastNotif(cartToast);
    addToCartFn(product, counterNumber, cart);
    utils.updateLocalStorage(cart, "cart");
    utils.updateCartBubble(cart);
    counterNumber.textContent = "1";
    console.log(cart);
    miniCartFn(product);
  });

  // MODAL WISHLIST BUTTON
  const wishlistBtn = document.querySelector(".wishlist-button");
  wishlistBtn.addEventListener("click", function () {
    updateWishlist(wishlistBtn, product);
    utils.showToastNotif(wishlistToast);
  });
};
