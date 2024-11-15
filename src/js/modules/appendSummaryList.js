const summaryCartList = document.querySelector(".summary-cart-list");
const orderSummary = document.querySelector(".order-summary");

export const appendCartList = function (prod) {
  const itemListHTML = `<li><p>${prod.name}</p><p> &times;${
    prod.amount
  }</p><p class"price-calculation">$${prod.price * prod.amount}</p></li>`;
  summaryCartList.insertAdjacentHTML("beforeend", itemListHTML);
};

export const appendCheckoutList = function (item) {
  const itemSummaryhtml = `<div class="item-summary">
              <img src="${item.rightImage}" alt="Product Image" />
              <div class="item-details">
                <h3>${item.name}</h3>
                <p>$${item.price}</p>
                <p>&times; ${item.amount}</p>
              </div>
            </div>`;
  orderSummary.insertAdjacentHTML("afterbegin", itemSummaryhtml);
};
