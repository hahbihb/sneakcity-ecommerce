//UPDATE LOCAL STORAGE
export const updateLocalStorage = function (object, objectName) {
  if (object.length === 0) {
    localStorage.setItem(`${objectName}`, JSON.stringify([]));
  } else {
    localStorage.setItem(`${objectName}`, JSON.stringify(object));
  }
};

//UPDATE CART BUBBLE
export const updateCartBubble = function (cart) {
  const cartBubble = document.querySelector(".cart-bubble");
  cartBubble.textContent = cart.map((x) => x.amount).reduce((x, y) => x + y, 0);
};

//INCREASE COUNTER NUMBER
export const increaseCounter = function (counterNumber) {
  +counterNumber.textContent++;
};

//DECREASE COUNTER NUMBER
export const decreaseCounter = function (counterNumber) {
  if (+counterNumber.textContent > 1) {
    +counterNumber.textContent--;
  }
};

//CLOSE MODAL
const prodModal = document.querySelector(".product-modal-container");
const modalOverlay = document.querySelector(".modal-overlay");

export const closeModal = function () {
  prodModal.style.transform = "scale(0) translate(-50%, -50%)";
  modalOverlay.classList.add("hidden");
  prodModal.innerHTML = "";
};

//VIEW CHANGER
export function changeView(e) {
  const views = document.querySelectorAll(".view");
  const clicked = e.target.closest(".view");
  const mainImg = document
    .querySelector(".product-main-image")
    .querySelector("img");
  const clickedImg = clicked.querySelector("img");
  if (!clicked) return;

  views.forEach((view) => view.classList.remove("view--active"));
  clicked.classList.add("view--active");
  mainImg.src = clickedImg.src;
}

//TOAST NOTIF
export const showToastNotif = function (toast) {
  toast.style.visibility = "visible";
  toast.style.opacity = "1";
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.visibility = "hidden";
  }, 1700);
};

//close mobile menu when clicking on a product
export function closeMobileMenu(e) {
  const header = document.querySelector(".header");

  const navLinkClicked = e.target.closest(".main-nav-link");
  const containsNavOpen = e.target.classList.contains("nav-open");
  if (!navLinkClicked && !containsNavOpen) return;
  header.classList.remove("nav-open");
}

//SIGN IN MODAL
//open sign-in
const signInModal = document.querySelector(".sign-in-modal");

export const openSignInModal = function () {
  signInModal.classList.remove("hidden");
  modalOverlay.classList.remove("hidden");
};

//close sign-in
export const closeSignInModal = function () {
  signInModal.classList.add("hidden");
};

//calculate total
const vatHTML = document.querySelector(".vat-price");

export function calculateTotal(cart, totalPriceHTML, subtotal) {
  const totalPrice = cart
    .map((x) => x.price * x.amount)
    .reduce((x, y) => x + y);
  const vat = totalPrice * 0.2;
  totalPriceHTML.textContent = `Total: $${totalPrice + vat}`;
  vatHTML.textContent = `VAT: $${vat}`;
  subtotal.textContent = `Subtotal: $${totalPrice}`;
}

//Remove loading gif once screen loads
export function removeLoadScreen() {
  const loadingScreen = document.querySelector(".loading-screen");
  loadingScreen.classList.add("hidden");
}

//Search Products
export function searchProducts(query, directory = "?search=") {
  let newUrl = directory + encodeURIComponent(query);
  window.location.href = newUrl;
}

//get search query
export function getQueryParam(param) {
  let urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}
