import displayProducts from "./modules/displayProducts.js";
import { openModal } from "./modules/productModal.js";
import { miniCartFn, closeMiniCart } from "./modules/miniCart.js";
import { mouseOverProduct, mouseLeaveProduct } from "./modules/productHover.js";
import * as utils from "./modules/utils.js";
import { nextSlide, prevSlide } from "./modules/sliderComponent.js";
import {
  product1,
  product2,
  product3,
  product4,
} from "./modules/productsArray.js";

const products = [product1, product2, product3, product4];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

if (cart.length === 0) {
  localStorage.setItem("cart", JSON.stringify([]));
}

const init = function () {
  //display products
  products.forEach((product) => {
    displayProducts(product);
  });
  //update mini-cart
  cart.forEach((prod) => {
    miniCartFn(prod);
  });

  utils.updateCartBubble(cart);
};

//MOBILE MENU
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
const signUpBtn = document.querySelectorAll(".sign-up-btn");

signUpBtn.forEach((btn) =>
  btn.addEventListener("click", utils.openSignInModal)
);
signInBtn.addEventListener("click", utils.openSignInModal);
modalOverlay.addEventListener("click", utils.closeSignInModal);
signInCloseBtn.addEventListener("click", function () {
  utils.closeSignInModal();
  modalOverlay.classList.add("hidden");
});

//OPEN MINI-CART
const miniCart = document.querySelector(".mini-cart");
const cartButton = document.querySelector(".cart-icon");
cartButton.addEventListener("click", function () {
  miniCart.classList.toggle("hidden");
});

//CLOSE MINI-CART
window.addEventListener("click", closeMiniCart);

//STICKY NAV
const heroSctn = document.querySelector(".section-hero");

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
});
headerObserver.observe(heroSctn);

//MOUSE-OVER
const productContainer = document.querySelector(".products-container");
productContainer.addEventListener("mouseover", mouseOverProduct);
productContainer.addEventListener("mouseout", mouseLeaveProduct);

//COLLECTION REVEAL
const collectionImg = document.querySelectorAll(".image-hidden");
const collectionSctn = document.querySelector(".section-collection");

const revealCollection = function (entries) {
  const [entry] = entries;
  if (entry.isIntersecting) {
    collectionImg.forEach((collection) => {
      collection.style.opacity = 100;
      collection.style.transform = `translateY(0)`;
      collectionObserver.unobserve(collectionSctn);
    });
  }
};

const collectionObserver = new IntersectionObserver(revealCollection, {
  root: null,
  threshold: 0.4,
});
collectionObserver.observe(collectionSctn);

const smallScreen = window.matchMedia("(max-width: 700px)");

if (smallScreen.matches) {
  collectionImg.forEach((collection) => {
    collection.style.opacity = 100;
    collection.style.transform = `translateY(0)`;
  });
}

//SLIDER
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");

slides.forEach(
  (slide, index) => (slide.style.transform = `translate(${100 * index}%)`)
);

btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);

//SEARCH
const searchBtn = document.querySelector(".icon-search");
const searchInput = document.getElementById("search-input");

searchBtn.addEventListener("click", () =>
  utils.searchProducts(searchInput.value, "/product.html?search=")
);

//PRODUCT MODAL
const prodModal = document.querySelector(".product-modal-container");

modalOverlay.addEventListener("click", utils.closeModal);

//OPEN MODAL FUNCTION
productContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".product-box");
  if (!clicked) return;
  const prodnum = products.find((prod) => prod.number === +clicked.dataset.num);

  prodModal.style.transform = "scale(1) translate(-50%, -50%)";
  openModal(prodnum);
  modalOverlay.classList.remove("hidden");
});

//LOADING SCREEN
window.addEventListener("load", utils.removeLoadScreen);

init();
