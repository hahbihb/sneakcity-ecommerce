import { updateLocalStorage, closeModal } from "./utils.js";
// import { renderEmptyList } from "../wishlist.js";

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
const productContainer = document.querySelector(".products-container");

export const addToWishlist = function (clicked, product) {
  //update cart button ui
  clicked.classList.remove("add");
  clicked.textContent = "REMOVE FROM WISHLIST";

  //add product to wishlist
  wishlist.push(product);

  //update local storage
  updateLocalStorage(wishlist, "wishlist");
};

export const removeFromWishilst = function (clicked, product) {
  //update cart button ui
  clicked.classList.add("add");
  clicked.textContent = "ADD TO WISHLIST";

  //add product to wishlist
  wishlist = wishlist.filter((item) => item.ID !== product.ID);

  //update local storage
  updateLocalStorage(wishlist, "wishlist");
};

const footer = document.querySelector("footer");
const emptyWishlist = document.querySelector(".empty-fav");
export const renderEmptyWishlist = function () {
  if (wishlist.length === 0) {
    emptyWishlist.classList.remove("hidden");
    footer.classList.add("hidden");
  }
};

const wishlistToastMsg = document.querySelector(".wish-toast-msg");
export const updateWishlist = function (clicked, product) {
  if (clicked.classList.contains("add")) {
    wishlistToastMsg.textContent = "Item has been added to wishlist";
    addToWishlist(clicked, product);
  } else {
    wishlistToastMsg.textContent = "Item has been removed from wishlist";
    removeFromWishilst(clicked, product);
    if (window.location.href.includes("/wishlist.html")) {
      //remove from ui
      const child = productContainer.querySelector(
        `[data-num="${product.number}"]`
      );
      closeModal();
      productContainer.removeChild(child);
      //render empty wishlist if wishlist is empty
      renderEmptyWishlist();
    }
  }
};
