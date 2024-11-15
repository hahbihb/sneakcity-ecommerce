import { miniCartFn, closeMiniCart } from "./modules/miniCart.js";
import * as utils from "./modules/utils.js";
import { appendCheckoutList } from "./modules/appendSummaryList.js";

// CART
let cart = JSON.parse(localStorage.getItem("cart"));

//LOADING SCREEN
window.addEventListener("load", utils.removeLoadScreen);

// MENU
const menuBtn = document.querySelector(".menu-btn");
const header = document.querySelector(".header");

menuBtn.addEventListener("click", function () {
  header.classList.toggle("nav-open");
});

header.addEventListener("click", utils.closeMobileMenu);

// SIGN IN
const modalOverlay = document.querySelector(".modal-overlay");
const signInBtn = document.querySelector(".sign-in-btn");
const signInCloseBtn = document.getElementById("closeModalBtn");

signInBtn.addEventListener("click", utils.openSignInModal);
modalOverlay.addEventListener("click", utils.closeSignInModal);
modalOverlay.addEventListener("click", function () {
  modalOverlay.classList.add("hidden");
});
signInCloseBtn.addEventListener("click", function () {
  utils.closeSignInModal();
  modalOverlay.classList.add("hidden");
});

//CART BUBBLE
utils.updateCartBubble(cart);

// MINI-CART FUNCTION
const miniCart = document.querySelector(".mini-cart");

//ADD CART ITEMS TO MINI-CART
cart.forEach((prod) => {
  miniCartFn(prod);
});

//OPEN MINI-CART
const cartButton = document.querySelector(".cart-icon");
cartButton.addEventListener("click", function () {
  miniCart.classList.toggle("hidden");
});

//CLOSE MINI-CART
window.addEventListener("click", closeMiniCart);

//APPEND ORDER SUMMARY
cart.forEach((item) => {
  appendCheckoutList(item);
});

//CALCULATE TOTAL
const subtotalHTML = document.querySelector(".subtotal");
const totalPriceHTML = document.querySelector(".order-summary-total");

utils.calculateTotal(cart, totalPriceHTML, subtotalHTML);
