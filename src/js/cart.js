import { miniCartFn, closeMiniCart } from "./modules/miniCart.js";
import renderCartItems from "./modules/renderCartItems.js";
import * as utils from "./modules/utils.js";
import { appendCartList } from "./modules/appendSummaryList.js";

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const init = function () {
  //update cart and mini-cart
  cart.forEach((prod) => {
    updateCart(prod);
    miniCartFn(prod);
  });
  //update cart Summary
  updateSummary();

  utils.updateCartBubble(cart);
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
modalOverlay.addEventListener("click", function () {
  modalOverlay.classList.add("hidden");
});
signInCloseBtn.addEventListener("click", function () {
  utils.closeSignInModal();
  modalOverlay.classList.add("hidden");
});

// MINI CART FUNCTION
const miniCart = document.querySelector(".mini-cart");

//OPEN MINI-CART
const cartButton = document.querySelector(".cart-icon");
cartButton.addEventListener("click", function () {
  miniCart.classList.toggle("hidden");
});

//CLOSE MINI-CART
window.addEventListener("click", closeMiniCart);

//////////////////////////
// MAIN CART
//////////////////////////
const emptyCart = document.querySelector(".empty-cart");
const cartContainer = document.querySelector(".cart");

const updateCart = function (prod) {
  if (cart.length !== 0) {
    emptyCart.classList.add("hidden");
    renderCartItems(prod);
  }

  // PRODUCT COUNTER FOR CART
  cartContainer.addEventListener("click", function (e) {
    const clicked = e.target;
    const counterIncrease = clicked.closest(".counter-plus");
    const counterDecrease = clicked.closest(".counter-minus");
    const counterNumber = clicked
      .closest(".cart-item")
      .querySelector(".counter-number");
    if (counterIncrease) {
      utils.increaseCounter(counterNumber);
    } else if (counterDecrease) {
      utils.decreaseCounter(counterNumber);
    } else {
      return;
    }
  });
};

//UPDATE SUMMARY FUNCTION
const cartSummary = document.querySelector(".cart-summary");
const summaryCartList = document.querySelector(".summary-cart-list");
const totalPriceHTML = document.querySelector(".total-price");
const subtotalHTML = document.querySelector(".subtotal-price");

const updateSummary = function () {
  if (cart.length !== 0) {
    summaryCartList.innerHTML = "";
    cart.forEach((prod) => appendCartList(prod));

    //CALCULATE TOTAL PRICE
    utils.calculateTotal(cart, totalPriceHTML, subtotalHTML);
  } else {
    cartSummary.innerHTML = "";
  }
};

//////////////////////////
//REMOVE ITEM FROM CART
//////////////////////////
const removeToast = document.querySelector(".remove-toast");

cartContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".remove-cart-item");
  const clickedParent = clicked.closest(".cart-item");
  const clickedProduct = +clickedParent.dataset.num;
  if (!clicked) return;

  //remove product from ui
  cartContainer.removeChild(clickedParent);

  //remove product from array
  cart = cart.filter((item) => item.number !== clickedProduct);

  //update local storage
  localStorage.setItem("cart", JSON.stringify(cart));

  // show Cart toast
  utils.showToastNotif(removeToast);

  //Update mini-cart
  cart.forEach((prod) => miniCartFn(prod));

  //Update Cart Bubble
  utils.updateCartBubble(cart);

  //Update Summary
  updateSummary();

  //render empty cart message
  if (cart.length === 0) {
    emptyCart.classList.remove("hidden");
  }
});
init();
