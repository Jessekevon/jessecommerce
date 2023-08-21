/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/cart.js":
/*!********************!*\
  !*** ./js/cart.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addToCart: () => (/* binding */ addToCart),\n/* harmony export */   getCart: () => (/* binding */ getCart),\n/* harmony export */   removeFromCart: () => (/* binding */ removeFromCart)\n/* harmony export */ });\n// js/cart.js\n\nconst cart = [];\n\nfunction addToCart(product) {\n  cart.push(product);\n}\n\nfunction removeFromCart(productId) {\n  const index = cart.findIndex(item => item.id === productId);\n  if (index !== -1) {\n    cart.splice(index, 1);\n  }\n}\n\nfunction getCart() {\n  return [...cart];\n}\n\n\n//# sourceURL=webpack://jessecommerce/./js/cart.js?");

/***/ }),

/***/ "./js/fetch-utils.js":
/*!***************************!*\
  !*** ./js/fetch-utils.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   fetchProducts: () => (/* binding */ fetchProducts)\n/* harmony export */ });\n// js/fetch-utils.js\n\nasync function fetchProducts() {\n  try {\n    const response = await fetch('https://fakestoreapi.com/products');\n    const products = await response.json();\n    return products;\n  } catch (error) {\n    console.error('Error fetching products:', error);\n    return [];\n  }\n}\n\n\n//# sourceURL=webpack://jessecommerce/./js/fetch-utils.js?");

/***/ }),

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _fetch_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fetch-utils.js */ \"./js/fetch-utils.js\");\n/* harmony import */ var _cart_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cart.js */ \"./js/cart.js\");\n// js/main.js\n\n\n\n\nconst productGrid = document.querySelector('.product-grid');\nconst categoryFilter = document.getElementById('category-filter');\nconst cartContainer = document.getElementById('cart-container');\n\ncategoryFilter.addEventListener('change', renderProducts);\n\nasync function renderProducts() {\n  const products = await (0,_fetch_utils_js__WEBPACK_IMPORTED_MODULE_0__.fetchProducts)();\n  const productGrid = document.querySelector('.product-grid');\n\n  products.forEach(product => {\n    const productCard = document.createElement('div');\n    productCard.classList.add('product-card');\n\n    const productImage = document.createElement('img');\n    productImage.src = product.image;\n    productImage.alt = product.title;\n    productImage.classList.add('product-image');\n\n    const productName = document.createElement('h3');\n    productName.textContent = product.title;\n    productName.classList.add('product-name');\n\n    const productPrice = document.createElement('p');\n    productPrice.textContent = `Price: $${product.price}`;\n    productPrice.classList.add('product-price');\n\n    // Create quantity dropdown\n    const quantitySelect = document.createElement('select');\n    quantitySelect.classList.add('quantity-select');\n    \n    Array.from({ length: 10 }, (_, index) => {\n      const option = document.createElement('option');\n      option.value = index + 1;\n      option.textContent = index + 1;\n      quantitySelect.appendChild(option);\n    });\n    \n    // Create \"Add to Cart\" button\n    const addToCartButton = document.createElement('button');\n    addToCartButton.textContent = 'Add to Cart';\n    addToCartButton.classList.add('add-to-cart');\n    addToCartButton.setAttribute('data-product-id', product.id);\n    \n    // Add event listener to \"Add to Cart\" button\n    addToCartButton.addEventListener('click', () => {\n      const selectedQuantity = parseInt(quantitySelect.value);\n      Array.from({ length: selectedQuantity }, () => (0,_cart_js__WEBPACK_IMPORTED_MODULE_1__.addToCart)(product));\n      renderCart();\n    });\n    \n    productCard.appendChild(productImage);\n    productCard.appendChild(productName);\n    productCard.appendChild(productPrice);\n    productCard.appendChild(quantitySelect);\n    productCard.appendChild(addToCartButton);\n\n    productGrid.appendChild(productCard);\n  });\n}\n\nasync function init() {\n  renderProducts();\n  renderCart();\n}\n\ninit();\n\nfunction renderCart() {\n  const cartItems = (0,_cart_js__WEBPACK_IMPORTED_MODULE_1__.getCart)();\n  cartContainer.innerHTML = '';\n\n  cartItems.forEach(item => {\n    const cartItem = document.createElement('div');\n    cartItem.classList.add('cart-item');\n\n    const cartItemName = document.createElement('p');\n    cartItemName.textContent = item.title;\n\n    const cartItemRemove = document.createElement('button');\n    cartItemRemove.textContent = 'Remove';\n    cartItemRemove.addEventListener('click', () => {\n      (0,_cart_js__WEBPACK_IMPORTED_MODULE_1__.removeFromCart)(item.id);\n      renderCart();\n    });\n\n    cartItem.appendChild(cartItemName);\n    cartItem.appendChild(cartItemRemove);\n\n    cartContainer.appendChild(cartItem);\n  });\n}\n\nproductGrid.addEventListener('click', event => {\n  const target = event.target;\n\n  if (target.classList.contains('add-to-cart')) {\n    const productId = parseInt(target.getAttribute('data-product-id'));\n    const product = products.find(item => item.id === productId);\n\n    if (product) {\n      (0,_cart_js__WEBPACK_IMPORTED_MODULE_1__.addToCart)(product);\n      renderCart();\n    }\n  }\n});\n\n\n//# sourceURL=webpack://jessecommerce/./js/main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./js/main.js");
/******/ 	
/******/ })()
;