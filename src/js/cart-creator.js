/* eslint-disable object-curly-newline */
export default class CreateCart {
  static createNewElement({ el, parent, className, text, titles }) { // dodana nowa wlascwosc arg
    const element = el;
    parent.appendChild(el);
    if (Array.isArray(className)) {
      for (let i = 0; i < className.length; i += 1) {
        element.classList.add(className[i]);
      }
    } else {
      element.classList.add(className);
    }

    if (text !== undefined) {
      element.innerHTML = `${titles} <span>${text}</span>`;
    }
  }

  // eslint-disable-next-line no-unused-vars
  static createInput({ parent, id, text, className, br }) {
    const label = document.createElement('label');
    const input = document.createElement('input');

    input.setAttribute('id', id);
    input.setAttribute('name', id);
    input.type = 'text';

    label.setAttribute('for', id);
    label.textContent = text;

    parent.appendChild(label);
    parent.appendChild(input);

    if (br === true) {
      parent.appendChild(document.createElement('br'));
    }
  }

  // eslint-disable-next-line object-curly-spacing
  static createCarts({cartState, bookData, cartsTitle, bookCartIconClass, sectionTitle}) {
    const that = this;
    // the cart should be insert before last cart
    let insertBefore = false;
    // DOM Elements
    const cartContainer = document.querySelector('.book-section__row');
    // FRAGMENT
    const cart = document.createDocumentFragment();
    // CREATING ELEMENTS
    const div = document.createElement('div');
    const list = document.createElement('ul');
    const article = document.createElement('article');
    const form = document.createElement('form');
    const button = document.createElement('button');
    const btnWraper = document.createElement('div');

    // Add Class list
    div.classList.add('book-card__wraper');

    // Where the cart should be insert
    if (cartContainer.children.length > 0) {
      insertBefore = true;
    }

    (function createWrapCart() {
      that.createNewElement({
        el: list,
        parent: div,
        className: 'book-card__list' });
    }());

    (function createEditor() {
      that.createNewElement({
        el: article,
        parent: div,
        className: 'book-card___change-values',
        text: 'Add values:' });

      that.createNewElement({
        el: form,
        parent: article,
        className: ['book-card__form', 'book-features__number'] });

      form.setAttribute('name', 'changeValues');

      that.createInput({
        parent: form,
        id: 'page_value',
        text: 'Page: +',
        className: 'book-card__edit-value',
        br: true });

      that.createInput({
        parent: form,
        id: 'hours_value',
        text: 'Hours: +',
        className: 'book-card__edit-value' });

      that.createNewElement({
        el: button,
        parent: form,
        className: 'book-card__form-button',
        text: 'Change!' });
      button.setAttribute('type', 'submit');
    }());

    (function createFeatureList() {
      const MAX = 6;
      for (let i = 0; i < MAX; i += 1) {
        const liEl = document.createElement('li');
        that.createNewElement({
          el: liEl,
          parent: list,
          className: (`${i === 0 ? cartsTitle[0] : cartsTitle[1]}`),
          text: bookData[i],
          titles: i > 0 ? sectionTitle[i - 1] : '' });
      }
    }());

    (function createBtnCartSection() {
      that.createNewElement({
        el: btnWraper,
        parent: div,
        className: 'book-card__btn-wraper' });

      // CREATE 2 MORE BTNS, WHICH ALLOWS EDIT CART PARAMTRS, IF A BOOK HASN'T BEEN READ
      if (cartState === 'still') {
        for (let i = 0; i < bookCartIconClass.length; i += 1) {
          const icon = document.createElement('i');
          const changeCartState = document.createElement('button');

          that.createNewElement({
            el: changeCartState,
            parent: btnWraper,
            className: 'book-card__button' });
          that.createNewElement({
            el: icon,
            parent: changeCartState,
            className: ['fas', `${bookCartIconClass[i]}`] });
        }
        // CREATE ONLY ONE BTN TO DELETE BOOK CART, IF A BOOK HAS BEEN READ
      } else if (cartState === 'done') {
        const icon = document.createElement('i');
        const changeCartState = document.createElement('button');

        that.createNewElement({
          el: changeCartState,
          parent: btnWraper,
          className: 'book-card__button' });
        that.createNewElement({
          el: icon,
          parent: changeCartState,
          className: ['fas', `${bookCartIconClass[1]}`] });
      }
    }());

    (function appendToDOM() {
      cart.appendChild(div);
      // INSERT FRAGMENT TO RIGHT PLACE
      if (insertBefore) {
        document.querySelector('.book-card__wraper').before(cart);
      } else {
        cartContainer.appendChild(cart);
      }
    }());
  }
}
