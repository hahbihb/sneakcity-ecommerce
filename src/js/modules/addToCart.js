const addToCartFn = function (product, counterNumber, cart) {
  if (cart.includes(product) || cart.find((item) => item.ID === product.ID)) {
    console.log("yes");
    const thisItem = cart.find((item) => item.ID === product.ID);
    thisItem.amount += +counterNumber.textContent;
  } else {
    product.amount = +counterNumber.textContent;
    cart.push(product);
  }
};

export default addToCartFn;
