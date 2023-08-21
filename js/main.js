// js/main.js

import { fetchProducts } from './fetch-utils.js';
import { addToCart, removeFromCart, getCart } from './cart.js';

const productGrid = document.querySelector('.product-grid');
const categoryFilter = document.getElementById('category-filter');
const cartContainer = document.getElementById('cart-container');

categoryFilter.addEventListener('change', renderProducts);

async function renderProducts() {
  const products = await fetchProducts();
  const productGrid = document.querySelector('.product-grid');

  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    const productImage = document.createElement('img');
    productImage.src = product.image;
    productImage.alt = product.title;
    productImage.classList.add('product-image');

    const productName = document.createElement('h3');
    productName.textContent = product.title;
    productName.classList.add('product-name');

    const productPrice = document.createElement('p');
    productPrice.textContent = `Price: $${product.price}`;
    productPrice.classList.add('product-price');

    // Create quantity dropdown
    const quantitySelect = document.createElement('select');
    quantitySelect.classList.add('quantity-select');
    
    Array.from({ length: 10 }, (_, index) => {
      const option = document.createElement('option');
      option.value = index + 1;
      option.textContent = index + 1;
      quantitySelect.appendChild(option);
    });
    
    // Create "Add to Cart" button
    const addToCartButton = document.createElement('button');
    addToCartButton.textContent = 'Add to Cart';
    addToCartButton.classList.add('add-to-cart');
    addToCartButton.setAttribute('data-product-id', product.id);
    
    // Add event listener to "Add to Cart" button
    addToCartButton.addEventListener('click', () => {
      const selectedQuantity = parseInt(quantitySelect.value);
      Array.from({ length: selectedQuantity }, () => addToCart(product));
      renderCart();
    });
    
    productCard.appendChild(productImage);
    productCard.appendChild(productName);
    productCard.appendChild(productPrice);
    productCard.appendChild(quantitySelect);
    productCard.appendChild(addToCartButton);

    productGrid.appendChild(productCard);
  });
}

async function init() {
  renderProducts();
  renderCart();
}

init();

function renderCart() {
  const cartItems = getCart();
  cartContainer.innerHTML = '';

  cartItems.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');

    const cartItemName = document.createElement('p');
    cartItemName.textContent = item.title;

    const cartItemRemove = document.createElement('button');
    cartItemRemove.textContent = 'Remove';
    cartItemRemove.addEventListener('click', () => {
      removeFromCart(item.id);
      renderCart();
    });

    cartItem.appendChild(cartItemName);
    cartItem.appendChild(cartItemRemove);

    cartContainer.appendChild(cartItem);
  });
}

productGrid.addEventListener('click', event => {
  const target = event.target;

  if (target.classList.contains('add-to-cart')) {
    const productId = parseInt(target.getAttribute('data-product-id'));
    const product = products.find(item => item.id === productId);

    if (product) {
      addToCart(product);
      renderCart();
    }
  }
});
