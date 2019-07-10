/* eslint-disable max-len */
/* eslint-disable max-len */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
import '../scss/main.scss';
import Store from './localSotrage-handler';
import Story from './storyStats';
import Book from './newBook';
import {
  readingStats, speedReadingStats, addDataToChart, addDataToSpeedChart, renderChart,
} from './charts';
// import { speedReadingStats } from './charts';
import { UI, story } from './UI-handler';
import CreateCarts from './cart-creator';
import Validation from './validation-form';
// import CreateCart from './cart-creator';

const bookApp = {
  init: function init() {
    // IMPORT
    this.formOperation = new Validation();
    // this.formOperation = this.forms.constructor;
    // VARIABLES
    this.formPosition = 0;
    this.initialForm = document.querySelector('.book-features__FORM');
    this.readingDataChart = document.querySelector('.fa-chart-bar');
    this.speedDataChart = document.querySelector('.fa-book-open');
    this.booksListBtn = document.querySelector('.fa-angle-down');
    this.bookCartSection = document.querySelector('.book-section__row');
    this.firstForm = document.querySelector('.app__form');
    this.bookHandler = false;
    // EVENTS
    document.addEventListener('DOMContentLoaded', UI.displayBooks);
    this.firstForm.addEventListener('submit', this.start.bind(this));
    this.bookCartSection.addEventListener('click', this.cartBookHandler.bind(this));
    // DISPLAY ELEMENTS
    this.booksListBtn.addEventListener('click', this.displayBooksList.bind(this));
    this.readingDataChart.addEventListener('click', this.displayReadingChart.bind(this));
    this.speedDataChart.addEventListener('click', this.displaySpeedChart.bind(this));
    return this;
  },
  start: function start(e) {
    e.preventDefault();
    if (Validation.formValidation(e.target.children[2])) {
      document.querySelector('.book-features').classList.add('book-features--active');
      this.initialForm.addEventListener('submit', this.takeBookFeatures.bind(this));
    }
  },
  takeBookFeatures: function takeBookFeatures(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    const counter = this.formPosition === 0 ? this.formPosition : -this.formPosition / 100;
    const MAX_HEIGHT = (document.querySelectorAll('.book-features__option').length) * (-100);
    const additionalForm = document.querySelector('.book-features__window');
    if (Validation.formValidation(e.target.children[counter].children[1])) {
      this.formPosition -= 100;
    }

    if (this.formPosition === MAX_HEIGHT) {
      const ratioValue = Validation.getRatioValue(document.querySelectorAll('input[name="readData"]'));
      const featuresBook = [
        document.querySelector('.app-panel__book-name').value,
        document.querySelector('.book-features__author').value,
        ratioValue.value,
        Validation.getSelectValue(document.querySelector('select[name="language"]')).value,
        document.querySelector('.book-features__time').value,
        document.querySelector('.book-features__pages-amount').value];
      const bookInstance = new Book(featuresBook);
      this.formPosition = 0;
      CreateCarts.createCarts({
        cartState: ratioValue.value,
        bookData: bookInstance.bookData,
        cartsTitle: bookInstance.cardsTitle,
        bookCartIconClass: bookInstance.bookCardIconClass,
        sectionTitle: bookInstance.sectionTitles,
      });
      UI.addToStory(featuresBook);
      Store.renderStorageData(bookInstance, story.stats);
      UI.updateInterface();
      renderChart(story);
      Validation.clearInput([this.firstForm, this.initialForm]);
    }
    additionalForm.style.top = `${this.formPosition}%`;
  },
  activeCartHandler: function activeCartHandler() {
    if (this.bookHandler === false) {
      this.cartBookHandler();
      this.bookHandler = !this.bookHandler;
    }
  },

  displaySpeedChart: function displaySpeedChart() {
    document.querySelector('.stats-speed').classList.toggle('stats-speed--active');
    document.querySelector('.app-stats').classList.toggle('app-stats--active');
  },

  displayBooksList: function displayBooksList(e) {
    document.querySelector('.book-section__row').classList.toggle('book-section__row--active');
    this.activeCartHandler();
  },
  displayReadingChart: function displayReadingChart() {
    document.querySelector('.stats-cont').classList.toggle('stats-cont--active');
    document.querySelector('.app-stats').classList.toggle('app-stats--active');
  },

  deleteBook: function deleteBook(event) {
    const cart = event.target.parentElement.parentElement.parentElement;
    const cartList = cart.childNodes[0].childNodes;
    event.stopPropagation();
    event.stopImmediatePropagation();
    // DELETE BOOK FROM STORAGE
    Store.removeBooks(cart.children[0].children[0].textContent);
    // DELETE STATS FROM STORAGE
    Store.removeStats(cartList, event.target);
    // REMOVE CART DOM
    cart.parentNode.removeChild(cart);
    // DELETE STATS
    UI.removeFromStory(cartList);
    // RENDER BOOKS NUMBER
    UI.bookCounter();
    renderChart(story);
  },
  changeReadStatus: function changeReadStatus(event) {
    const aim = event.target;
    const buttonWraper = aim.parentElement.parentElement;
    const cart = buttonWraper.parentElement;
    const cartTitle = cart.children[0].children[0];
    event.stopPropagation();
    event.stopImmediatePropagation();
    // CHANGE BOOK STATUS CART
    cart.firstElementChild.children[2].children[0].textContent = 'done';
    // CHANGE BOOK STATUS IN STORAGE
    Store.changeReadStatus(cartTitle.textContent, 'done');
    Store.readBookChangeData();
    // CHANGE STATS
    story.stats.stillRead.value -= 1;
    story.stats.read.value += 1;
    // DELETE UNUSEFUL CART BUTTONS WHEN BOOK WILL BE READ
    buttonWraper.children[0].parentNode.removeChild(buttonWraper.children[0]);
    event.target.parentNode.removeChild(event.target);
    renderChart(story);
  },

  editCart: function editCart(event) {
    event.stopImmediatePropagation();
    event.preventDefault();
    const editForm = event.target.parentElement;

    // CHANGE CART VALUE
    if (Validation.formValidation(editForm.hours_value, editForm.page_value)) {
      const thisCartWrap = editForm.parentElement.parentElement;
      const title = thisCartWrap.children[0].children[0];
      const timeText = thisCartWrap.firstElementChild.children[4].children[0];
      const pageNumberText = thisCartWrap.firstElementChild.children[5].children[0];
      const addingPageNumber = editForm.page_value.value;
      const addingTime = editForm.hours_value.value;

      pageNumberText.textContent = UI.updateCartNumberData(pageNumberText, addingPageNumber);
      timeText.textContent = UI.updateCartNumberData(timeText, addingTime);
      // UPDATE STATS
      story.stats.numberPages.value += parseInt(addingPageNumber, 10);
      story.stats.readingTime.value += parseInt(addingTime, 10);
      // UPDATE STORAGE
      Store.editStorageStats(title.textContent, [pageNumberText.textContent, timeText.textContent]);
      Store.addStats(story.stats);

      thisCartWrap.querySelector('.book-card___change-values').style.display = 'none';
      renderChart(story);
    }
  },

  startEdit: function startEdit(event) {
    event.stopPropagation();
    const thisCartWrap = event.target.parentElement.parentElement.parentElement;
    thisCartWrap.querySelector('.book-card___change-values').style.display = 'grid';
  },

  cartBookHandler: function cartBookHandler() {
    // BUTTONS INSIDE SECTION
    const sign = document.querySelectorAll('.book-card___change-values > form > button');
    const editBtn = document.querySelectorAll('.fa-edit');
    const changeStatus = document.querySelectorAll('.fa-check-square');
    const deleteCart = document.querySelectorAll('.fa-trash');
    changeStatus.forEach((changeBtn) => {
      changeBtn.addEventListener('click', this.changeReadStatus.bind(this));
    });

    sign.forEach((signBtn) => {
      signBtn.addEventListener('click', this.editCart);
    });

    editBtn.forEach((editCartBtn) => {
      editCartBtn.addEventListener('click', this.startEdit.bind(this));
    });

    deleteCart.forEach((deleteBtn) => {
      deleteBtn.addEventListener('click', this.deleteBook.bind(this));
    });
    return this;
  },
};

bookApp.init();
