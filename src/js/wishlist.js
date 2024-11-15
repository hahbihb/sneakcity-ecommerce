import displayProducts from "./modules/displayProducts.js";
import { openModal } from "./modules/productModal.js";
import { miniCartFn, closeMiniCart } from "./modules/miniCart.js";
import { mouseOverProduct, mouseLeaveProduct } from "./modules/productHover.js";
import { renderEmptyWishlist } from "./modules/updateWishlist.js";
import * as utils from "./modules/utils.js";

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
let cart = JSON.parse(localStorage.getItem("cart"));

const init = function () {
  renderEmptyWishlist();

  //update minicart
  cart.forEach((prod) => {
    miniCartFn(prod);
  });

  utils.updateCartBubble(cart);

  wishlist.forEach((product) => {
    displayProducts(product);
  });
};

// MOBILE-MENU
const menuBtn = document.querySelector(".menu-btn");
const header = document.querySelector(".header");

menuBtn.addEventListener("click", function () {
  header.classList.toggle("nav-open");
});

header.addEventListener("click", utils.closeMobileMenu);

//LOADING SCREEN
window.addEventListener("load", utils.removeLoadScreen);

// SIGN IN
const modalOverlay = document.querySelector(".modal-overlay");
const signInBtn = document.querySelector(".sign-in-btn");
const signInCloseBtn = document.getElementById("closeModalBtn");

signInBtn.addEventListener("click", utils.openSignInModal);
modalOverlay.addEventListener("click", utils.closeSignInModal);
signInCloseBtn.addEventListener("click", function () {
  utils.closeSignInModal();
  modalOverlay.classList.add("hidden");
});

//MOUSE-OVER
const productContainer = document.querySelector(".products-container");
productContainer.addEventListener("mouseover", mouseOverProduct);
productContainer.addEventListener("mouseout", mouseLeaveProduct);

//OPEN MINI-CART
const miniCart = document.querySelector(".mini-cart");
const cartButton = document.querySelector(".cart-icon");
cartButton.addEventListener("click", function () {
  miniCart.classList.toggle("hidden");
});

//CLOSE MINI-CART
window.addEventListener("click", closeMiniCart);

//PRODUCT MODAL
const prodModal = document.querySelector(".product-modal-container");

modalOverlay.addEventListener("click", utils.closeModal);

//OPEN MODAL FUNCTION
productContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".product-box");
  if (!clicked) return;
  const prodnum = wishlist.find((prod) => prod.number === +clicked.dataset.num);

  prodModal.style.transform = "scale(1) translate(-50%, -50%)";
  openModal(prodnum);
  modalOverlay.classList.remove("hidden");
});

init();
