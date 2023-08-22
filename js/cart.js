// js/cart.js

const cartKey = 'cart';

let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

export function addToCart(product, quantity) {
  const existingCartItem = cart.find(item => item.id === product.id);
  if (existingCartItem) {
    console.log('Product already in cart:', existingCartItem.title);
    return; // Avoid adding duplicates
  }

  for (let i = 0; i < quantity; i++) {
    cart.push(product);
  }
  saveCartToLocalStorage();
}

export function removeFromCart(productId) {
  const index = cart.findIndex(item => item.id === productId);
  if (index !== -1) {
    cart.splice(index, 1);
    saveCartToLocalStorage();
  }
}

export function getCart() {
  return [...cart];
}

function saveCartToLocalStorage() {
  localStorage.setItem(cartKey, JSON.stringify(cart));
}
