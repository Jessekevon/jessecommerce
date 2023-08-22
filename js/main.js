// js/main.js

import { fetchProducts } from './fetch-utils.js';
import { addToCart, removeFromCart, getCart } from './cart.js';

const productGrid = document.querySelector('.product-grid');
const categoryFilter = document.getElementById('category-filter');
const cartContainer = document.getElementById('cart-container');
const cartIcon = document.getElementById('cart-icon');
const cartIndicator = document.getElementById('cart-indicator');
const cartPopup = document.getElementById('cart-popup');
const hamburgerIcon = document.getElementById('hamburger-icon');

let isCartPopupOpen = false;
let products = [];

categoryFilter.addEventListener('change', renderProducts);

hamburgerIcon.addEventListener('click', () => {
  // Implement logic to toggle navigation menu for mobile
});

cartIcon.addEventListener('click', () => {
  isCartPopupOpen = !isCartPopupOpen;
  cartPopup.style.display = isCartPopupOpen ? 'block' : 'none';
  cartPopup.classList.toggle('show', isCartPopupOpen);
  showCartPopup(getCart());
});

// Define a function to handle adding products to cart
function handleAddToCartClick(event) {
  const target = event.target;

  if (target.classList.contains('add-to-cart')) {
    const productId = parseInt(target.getAttribute('data-product-id'));
    const product = products.find(item => item.id === productId);

    if (product) {
      const selectedQuantity = parseInt(target.parentNode.querySelector('.quantity-select').value);
      addToCart(product, selectedQuantity);
      renderCart();
    }
  }
}

// Attach the event listener to the entire product grid
productGrid.addEventListener('click', handleAddToCartClick);

async function renderProducts() {
  const selectedCategory = categoryFilter.value;
  
  // Filter products based on selected category
  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory);
  
  productGrid.innerHTML = '';

  filteredProducts.forEach(product => {
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
  products = await fetchProducts(); // Fetch products and store them in the products array
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

  updateCartIndicator(cartItems.length);
  showCartPopup(cartItems);
}

function updateCartIndicator(itemCount) {
  cartIndicator.textContent = itemCount;
}

function showCartPopup(cartItems) {
  cartPopup.innerHTML = '';

  cartItems.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    // Populate cart item details and append to cartPopup
    cartPopup.appendChild(cartItem);
  });

  cartPopup.classList.toggle('show', isCartPopupOpen);
}

productGrid.addEventListener('click', event => {
  const target = event.target;

  if (target.classList.contains('add-to-cart')) {
    const productId = parseInt(target.getAttribute('data-product-id'));
    const product = products.find(item => item.id === productId);

    if (product) {
      const selectedQuantity = parseInt(target.parentNode.querySelector('.quantity-select').value);
      addToCart(product, selectedQuantity);
      renderCart();
    }
  }
});
