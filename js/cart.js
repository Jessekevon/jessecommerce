// js/cart.js

const cart = [];

export function addToCart(product) {
  cart.push(product);
}

export function removeFromCart(productId) {
  const index = cart.findIndex(item => item.id === productId);
  if (index !== -1) {
    cart.splice(index, 1);
  }
}

export function getCart() {
  return [...cart];
}
