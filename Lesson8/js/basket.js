// 'use strict';

const basketWrapper = document.querySelector('.basket');


document.querySelector('.wish_btn').addEventListener('click', () => {
  basketWrapper.classList.toggle('basketHidden');
})

const basket = {};


document.querySelector('.cards').addEventListener('click', () => {
  if (!event.target.closest('.card_btn')) {
    return;
  }
  const cardInfoEl = event.target.closest('.card_info'); // можно еще через event.target.closest
  const id = +cardInfoEl.dataset.id;
  const name = cardInfoEl.dataset.name;
  const price = cardInfoEl.dataset.price;
  addToCart(id, name, price);
});

const basketWrpEl = document.querySelector('.badge span');
const basketTotalEl = document.querySelector('.basketTotal');
const basketTotalNumEl = document.querySelector('.basketTotalNum');
/**
 * Функция проверяет параметры продукта и добавляет его в корзину
 * @param {number} id
 * @param {string} name
 * @param {number} price
 * @returns {any}
 */
function addToCart (id, name, price) {
  if (!(id in basket)) {
    basket[id] = {id: id, name: name, price: price, count: 0};
  }
  basket[id].count++;
  basketWrpEl.textContent = getTotalBasketProd().toString();
  basketTotalNumEl.textContent = getTotalBasketPrice().toFixed(2);
  renderProductInBasket(id);
}

/**
 * Функция считает количество продуктов в корзине
 * @returns {any}
 */
function TotalBasketProd() {
  return Object.values(basket).reduce((acc, product) => acc + product.count, 0);
}


/** Функция считает обущю стоимость по всем продуктам в корзине
 * Description
 * @returns {any}
 */
function TotalBasketPrice() {
  return Object
    .values(basket)
    .reduce((acc, product) => acc + product.price * product.count, 0);
}

/**
 * Функция прописывают информацию о продукте в корзину
 * @param {any} productId
 * @returns {any}
 */
function renderProductInBasket(productId) {
    const basketRowEl = basketWrapper
    .querySelector(`.basketHeader[data-id="${productId}"]`);
  
  if (!basketRowEl) {
    renderNewProductInBasket(productId);
    return;
  }


  const prod = basket[productId];
  basketRowEl.querySelector('.productCount').textContent = product.count;
  basketRowEl.querySelector('.productTotalRow').textContent = (product.price * product.count).toFixed(2);
}

/** Функция прописывает в разметку новые товар в корзине*/
function renderNewProductInBasket(productId) {
  const productRow = `
    <div class="basketHeader" data-id="${productId}">
      <div>${basket[productId].name}</div>
      <div>
        <span class="productCount">${basket[productId].count}</span> шт.
      </div>
      <div>$${basket[productId].price}</div>
      <div>
        $<span class="productTotalRow">${(basket[productId].price * basket[productId].count).toFixed(2)}</span>
      </div>
    </div>
    `;
  basketTotalEl.insertAdjacentHTML("beforebegin", productRow);
}