import displayProducts from "./modules/displayProducts.js";
import { openModal } from "./modules/productModal.js";
import { miniCartFn, closeMiniCart } from "./modules/miniCart.js";
import { mouseOverProduct, mouseLeaveProduct } from "./modules/productHover.js";
import * as utils from "./modules/utils.js";
import { products } from "./modules/productsArray.js";

let cart = JSON.parse(localStorage.getItem("cart"));
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// MOBILE-MENU
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
signInCloseBtn.addEventListener("click", function () {
  utils.closeSignInModal();
  modalOverlay.classList.add("hidden");
});

//ADD CART ITEMS TO MINI-CART
const miniCart = document.querySelector(".mini-cart");

//OPEN MINI-CART
const cartButton = document.querySelector(".cart-icon");
cartButton.addEventListener("click", function () {
  miniCart.classList.toggle("hidden");
});

//CLOSE MINI-CART
window.addEventListener("click", closeMiniCart);

//PRODUCTS MOUSE-OVER
const productContainer = document.querySelector(".products-container");
productContainer.addEventListener("mouseover", mouseOverProduct);
productContainer.addEventListener("mouseout", mouseLeaveProduct);

//PRODUCT MODAL
const prodModal = document.querySelector(".product-modal-container");

modalOverlay.addEventListener("click", utils.closeModal);

//OPEN MODAL FUNCTION
productContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".product-box");
  if (!clicked) return;
  const prodnum = products.find((prod) => prod.number === +clicked.dataset.num);

  prodModal.style.transform = "scale(1) translate(-50%, -50%)";
  modalOverlay.classList.remove("hidden");
  openModal(prodnum);
});

//SEARCH
const searchBtn = document.querySelector(".icon-search");
const searchInput = document.getElementById("search-input");

searchBtn.addEventListener("click", () =>
  utils.searchProducts(searchInput.value)
);

//display search results
let searchQuery = utils.getQueryParam("search");
if (searchQuery) {
  productContainer.innerHTML = "";
  const searchProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  searchProducts.forEach((product) => displayProducts(product));
  searchInput.value = searchQuery;
}

//LOADING SCREEN
window.addEventListener("load", utils.removeLoadScreen);

//INIT FUNCTION
const init = function () {
  utils.updateCartBubble(cart);

  //update minicart
  cart.forEach((prod) => {
    miniCartFn(prod);
  });

  products.forEach((product) => {
    displayProducts(product);
  });
};

init();
