/* eslint-disable max-len */

import '../scss/main.scss';
import Chart from 'chart.js';


const form1 = document.querySelector('.app__form');
// eslint-disable-next-line prefer-const
let booksChart = document.querySelector('#stats__booksChart').getContext('2d');
const speedOfReadingChart = document.querySelector('#stats__speed').getContext('2d');
let featuresCounter = 0;

class Book {
  constructor(title, author, status, language, time, pages) {
    this.bookData = [title, author, status, language, time, pages];
    this.sectionTitles = ['Author:', 'Status:', 'Language:', 'Hours:', 'Pages:'];
    this.cardsTitle = ['book-card__title', 'book-card__feature'];
    this.bookCardIconClass = ['fa-edit', 'fa-trash', 'fa-check-square'];
  }
}

class HistoryStats {
  constructor() {
    this.stats = {
      read: {
        name: 'read',
        value: 0,
      },
      stillRead: {
        name: 'In progress',
        value: 0,
      },
      english: {
        name: 'english',
        value: 0,
      },
      polish: {
        name: 'polish',
        value: 0,
      },
      spanish: {
        name: 'spanish',
        value: 0,
        // active: 0,
      },
      readingTime: {
        name: 'time',
        value: 0,
      },
      numberPages: {
        name: 'pages',
        value: 0,
      },
    };
  }

  // POPRAW METODE ABY SIE DODAWOALO
  addReadingInfoToStory(bookData) {
    switch (bookData.value) {
      case 'done':
        this.stats.read.value += 1;
        break;
      case 'still':
        this.stats.stillRead.value += 1;
        break;
      case 'Polish':
        this.stats.polish.value += 1;
        break;
      case 'English':
        this.stats.english.value += 1;
        break;
      case 'Spanish':
        this.stats.spanish.value += 1;
        break;
      default:
    }
  }

  addNumberStatsToStory(currentObject) {
    this.stats.readingTime.value += currentObject[4];
    this.stats.numberPages.value += currentObject[5];
  }

  // MOÆE PODZIAØA JAKA§ ITERACJA
  setStats(object) {
    this.stats.read.value += object[0].read.value;
    this.stats.stillRead.value += object[0].stillRead.value;
    this.stats.polish.value += object[0].polish.value;
    this.stats.english.value += object[0].english.value;
    this.stats.spanish.value += object[0].spanish.value;
    this.stats.readingTime.value += object[0].readingTime.value;
    this.stats.numberPages.value += object[0].numberPages.value;
  }
}

// /
// LOCAL STORAGE
// /
class Store {
  // POŁACZ 2 PONIZSZE METODY
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static getStats() {
    let stats;
    if (localStorage.getItem('stats') === null) {
      stats = [];
    } else {
      stats = JSON.parse(localStorage.getItem('stats'));
    }
    return stats;
  }

  static addStats(addStats) {
    const stats = Store.getStats();
    stats.splice(0);
    stats.push(addStats);
    localStorage.setItem('stats', JSON.stringify(stats));
  }

  static addBooks(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBooks(title) {
    const books = Store.getBooks();
    books.forEach((book, index) => {
      if (book.bookData[0].trim() === title.trim()) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}

// jedyna instancja statystyk
const story = new HistoryStats();


// CHART JS
const massPopChart = new Chart(booksChart, {
  type: 'bar',
  data: {
    labels: [`${story.stats.read.name}`,
      `${story.stats.stillRead.name}`,
      `${story.stats.english.name}`,
      `${story.stats.polish.name}`,
      `${story.stats.spanish.name}`],
    datasets: [{
      label: 'Liczba',
      data: [story.stats.read.value,
        story.stats.stillRead.value,
        story.stats.english.value,
        story.stats.polish.value,
        story.stats.spanish.value],
      backgroundColor: 'cadetblue',
    }],
  },
  options: {
    responsive: 'true',
    maintainAspectRatio: 'true',
  },
});
const speedMeasureChart = new Chart(speedOfReadingChart, {
  type: 'bar',
  data: {
    labels: [`${story.stats.readingTime.name}`,
      `${story.stats.numberPages.name}`],
    datasets: [{
      label: 'Liczba',
      data: [story.stats.readingTime.value,
        story.stats.numberPages.value],
      backgroundColor: 'cadetblue',
    }],
  },
  options: {
    responsive: 'true',
    maintainAspectRatio: 'true',
  },
});

const addDataToChart = () => {
  massPopChart.data.datasets[0].data = [story.stats.read.value,
    story.stats.stillRead.value,
    story.stats.english.value,
    story.stats.polish.value,
    story.stats.spanish.value];
  massPopChart.update();
};

const addDataToSpeedChart = () => {
  speedMeasureChart.data.datasets[0].data = [story.stats.readingTime.value,
    story.stats.numberPages.value];
  speedMeasureChart.update();
};

class UI {
  static createBefore(el, insertBefore, className) {
    const element = document.createElement(el);
    insertBefore.before(element);
    element.classList.add(className);
  }
  //  put && set property of elements

  static createNewElement(el, parent, className, text, titles) { // dodana nowa wlascwosc arg
    const element = el;
    parent.appendChild(el);
    if (Array.isArray(className)) { // sprawdz czy jest tablica a nie objektem!!!
      for (let i = 0; i < className.length; i += 1) {
        element.classList.add(className[i]);
      }
    } else {
      element.classList.add(className);
    }

    if (text !== undefined) {
      element.textContent = `${titles} ${text}`;
    }
  }

  // eslint-disable-next-line no-unused-vars
  static createInput(parent, id, text, className, br) {
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

  // ADD STATUS CART
  static createCards(cartState, bookData, cardsTitle, bookCardIconClass, sectionTitle) {
    const that = this;
    // the cart should be insert before last cart
    let insertBefore = false;
    // Elements which i want to CREATE:
    // - Fragment
    const cart = document.createDocumentFragment();
    const divek = document.createElement('div');
    const list = document.createElement('ul');
    const article = document.createElement('article');
    const form = document.createElement('form');
    const button = document.createElement('button');
    const btnWraper = document.createElement('div');
    // DOM Elements
    const cartContainer = document.querySelector('.book-section__row');

    // Add Class list
    divek.classList.add('book-card__wraper');

    // Where the cart should be insert
    if (cartContainer.childNodes.length > 0) {
      insertBefore = true;
    }

    (function createWrapCart() {
      that.createNewElement(list, divek, 'book-card__list');
    }());

    (function createEditorNumberData() {
      that.createNewElement(article, divek, 'book-card___change-values', 'Add values:');

      that.createNewElement(form, article, 'book-card__form');
      form.setAttribute('name', 'changeValues');

      that.createInput(form,
        'page_value',
        'Page: +',
        'book-card__edit-value',
        true);

      that.createInput(form,
        'hours_value',
        'Hours: +',
        'book-card__edit-value');

      that.createNewElement(button, form, 'book-card__form-button', 'Change!');
      button.setAttribute('type', 'submit');
    }());

    (function createCartList() {
      const maxFeature = 6;
      for (let i = 0; i < maxFeature; i += 1) {
        const liEl = document.createElement('li');

        // list.appendChild(liEl);
        that.createNewElement(liEl,
          list,
          (`${i === 0 ? cardsTitle[0] : cardsTitle[1]}`),
          bookData[i],
          i > 0 ? sectionTitle[i - 1] : '');
      }
    }());

    (function createBtnCartSection() {
      // divek.appendChild(btnWraper);
      that.createNewElement(btnWraper, divek, 'book-card__btn-wraper');
      // CREATE 2 MORE BTNS, WHICH ALLOWS EDIT CART PARAMTRS, IF A BOOK HASN'T BEEN READ
      if (cartState === 'still') {
        for (let i = 0; i < bookCardIconClass.length; i += 1) {
          const icon = document.createElement('i');
          const changeCartState = document.createElement('button');

          that.createNewElement(changeCartState, btnWraper, 'book-card__button');
          that.createNewElement(icon, changeCartState, ['fas', `${bookCardIconClass[i]}`]);
        }
        // CREATE ONLY ONE BTN TO DELETE BOOK CART, IF A BOOK HAS BEEN READ
      } else if (cartState === 'done') {
        const icon = document.createElement('i');
        const changeCartState = document.createElement('button');

        that.createNewElement(changeCartState, btnWraper, 'book-card__button');
        that.createNewElement(icon, changeCartState, ['fas', `${bookCardIconClass[1]}`]);
      }

      // JEŚLI STATUS JEST READ
    }());

    (function appendToDOM() {
      cart.appendChild(divek);
      // insert fragment to right place
      if (insertBefore) {
        document.querySelector('.book-card__wraper').before(cart);
      } else {
        cartContainer.appendChild(cart);
      }
    }());
  }

  static displayBooks() {
    const books = Store.getBooks();
    const stats = Store.getStats();
    books.forEach((book) => {
      UI.createCards(book.bookData[2], book.bookData,
        book.cardsTitle, book.bookCardIconClass,
        book.sectionTitles);
    });
    if (stats.length !== 0) {
      story.setStats(stats);
      addDataToChart();
      addDataToSpeedChart();
    }
    document.querySelector('.book-section__title > h2 > span').textContent = `(${story.stats.read.value + story.stats.stillRead.value})`;
  }

  static isEmptyArea(value) {
    if (value === '') return false;
    return true;
  }

  static isLetters(field) {
    if (/^[a-zA-Z ]+$/.test(field.value)) return true;
    return false;
  }

  static isCheckRadio(radioElements) {
    if (UI.getRatioValue(radioElements)) return true;
    return false;
  }

  static isNumber(field) {
    if (/^[0-9]+$/.test(field.value)) return true;
    return false;
  }

  static inputNumberValidation(input) {
    if (UI.isEmptyArea(input.value.trim()) && UI.isNumber(input)) return true;
    return false;
  }

  static inputRadioValidation(input) {
    if (UI.isCheckRadio(input.parentElement.querySelectorAll('input[name="readData"]'))) return true;
    return false;
  }

  static inputTextValidation(input) {
    if (UI.isEmptyArea(input.value.trim()) && UI.isLetters(input)) return true;
    return false;
  }

  static formValidation(input) { // moze usprawnij
    let posiitive = false;

    if (input.parentElement.classList[1] === 'book-features__number') {
      posiitive = UI.inputNumberValidation(input);
    } else if (input.parentElement.classList[1] === 'book-features__radio') {
      posiitive = UI.inputRadioValidation(input);
    } else {
      posiitive = UI.inputTextValidation(input);
    }
    return posiitive;
  }

  static clearInput() {
    document.querySelector('.app-panel__book-name').value = '';
    document.querySelector('.book-features__author').value = '';
    document.querySelector('.book-features__time').value = '';
    document.querySelector('.book-features__pages-amount').value = '';
  }

  static hidefeaturePanel() {
    setTimeout(() => {
      document.querySelector('.book-features').classList.remove('book-features--active');
    }, 1000);
  }

  static getSelectValue(selectElement) {
    return selectElement.options[selectElement.selectedIndex];
  }

  static getRatioValue(ratioElement) {
    let selectedValue = null;
    for (let i = 0; i < ratioElement.length; i += 1) {
      if (ratioElement[i].checked) {
        selectedValue = ratioElement[i];
      }
    }
    return selectedValue;
  }

  static newBook(statsObject, title, author, status, language, time, pages) {
    const bookDataArr = [title, author, status, language, Number(time.value), Number(pages.value)];
    for (let i = 2; i < bookDataArr.length - 2; i += 1) {
      statsObject.addReadingInfoToStory(bookDataArr[i]);
    }
    statsObject.addNumberStatsToStory(bookDataArr);
    // Store.addStats(statsObject);
    // Add Stats to LS
    Store.addStats(statsObject.stats);
    return new Book(title.value, author.value, status.value, language.value, time.value, pages.value);
  }
}

// EVENT FUNCTIONS
// funkcja
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// CAŁY SĘK POLEGA NA TYM ZE PROGRAM NEI JEST PRZYSTOSOWANY DO NOWEGO TYPU FORMULARZA
//  INPUT RATIO/ SECTION itp
const downloadingDataToCart = (e) => {
  // moment do którego panel dodatkowych cech ma się przesówać
  e.preventDefault();
  // console.log('RAZEM KART:');
  // console.log(story.stats.read.value + story.stats.stillRead.value);
  const counter = featuresCounter === 0 ? featuresCounter : -featuresCounter / 100;
  // UI.currentFormType(e.target.children[counter]);
  const maxScrollFeatures = (document.querySelectorAll('.book-features__option').length - 1) * (-100);
  const featureWindow = document.querySelector('.book-features__window');
  // przekazanie danych dot. klikniętego przycisku do obiektu historia
  // story.addStatistics(e.target); // add stats // NAD SENSEM ISTNIENIA TEGO TEZ TRZEBA SIE ZASTANOWIĆ
  if (featuresCounter === maxScrollFeatures) {
    // UI.getRatioValue(document.querySelectorAll('input[name="readData"]'));
    // UI.getSelectValue(document.querySelector('select[name="language"]'));
    featuresCounter = 0;
    UI.hidefeaturePanel();
    const x = UI.newBook(
      story,
      document.querySelector('.app-panel__book-name'),
      document.querySelector('.book-features__author'),
      UI.getRatioValue(document.querySelectorAll('input[name="readData"]')),
      UI.getSelectValue(document.querySelector('select[name="language"]')),
      document.querySelector('.book-features__time'),
      document.querySelector('.book-features__pages-amount'),
    );
    // PIERWSZY ARGUMENT MOZE BYC LEPIEJ CIAGNIETY, WYKORZYSTAJ METODE PODOBNA DO LS
    UI.createCards(UI.getRatioValue(document.querySelectorAll('input[name="readData"]')).value, x.bookData, x.cardsTitle,
      x.bookCardIconClass, x.sectionTitles);
    // Add to storage
    Store.addBooks(x);
    // console.log(Store.getBooks()[0].bookData[2]);
    document.querySelector('.book-section__title > h2 > span').textContent = `(${story.stats.read.value + story.stats.stillRead.value})`;
    UI.clearInput();
    addDataToChart();
    addDataToSpeedChart();
  } else if (featuresCounter !== maxScrollFeatures) {
    if (UI.formValidation(e.target.children[counter].children[1])) {
      if (e.target) {
        featuresCounter -= 100;
      }
    }
  }
  featureWindow.style.top = `${featuresCounter}%`;
};

// FUNKCJA POBIERAJĄCA TUTUŁ KSIĄŻKI
const start = (e) => {
  e.preventDefault();
  // pobieram dane z mojego formularza poprzez deklaracje
  const featureBtns = document.querySelector('.book-features__FORM');
  // eslint-disable-next-line max-len
  // Jeśli tytuł ma prawidłową wartość - wysówa aplikacja panel by wprowadzić bardziej szczegółowe informacje dotyczące ksiązki
  if (UI.formValidation(e.target.children[2])) {
    // ów panel się wysówa
    document.querySelector('.book-features').classList.add('book-features--active');
    // w wysuniętym panelu są buttony, które umożliwiają wpisanie następnej cechy książki
    // poniższa funkcja umożliwia klikniecie w owe przyciski
    // featureBtns.forEach((btn) => {
    //   btn.addEventListener('click', downloadingDataToCart);
    // });
    featureBtns.addEventListener('submit', downloadingDataToCart);
    // addEventListener('submit', downloadingDataToCart);
  }
};

// LOAD CARTS WITH START PAGE
document.addEventListener('DOMContentLoaded', UI.displayBooks);
// LISTENERS
form1.addEventListener('submit', start);

// aktywuj statystyki
document.querySelector('.fa-chart-bar').addEventListener('click', () => {
  console.log('statts');
  document.querySelector('.stats-cont').classList.toggle('stats-cont--active');
  document.querySelector('.app-stats').classList.toggle('app-stats--active');
});

document.querySelector('.fa-book-open').addEventListener('click', () => {
  console.log('speed Stats');
  document.querySelector('.stats-speed').classList.toggle('stats-speed--active');
  document.querySelector('.app-stats').classList.toggle('app-stats--active');
});

// aktywuj pasek z lista ksiazek
document.querySelector('.fa-angle-down').addEventListener('click', () => {
  console.log('xd');
  document.querySelector('.book-section__row').classList.toggle('book-section__row--active');
});

// ZROB TAK ABY DZIALANIA TYCH EVENTOW ODZIALYWALYBY NA WYKRES I NA OBIEKT STORYYY
const startEdit = (event) => {
  console.log('klik w przycisk edit');
  event.stopPropagation();
  document.querySelector('.book-card___change-values').style.display = 'grid';
};

const editCart = (event) => {
  event.stopImmediatePropagation();
  event.preventDefault();
  console.log('klik w panel edytora');
  story.stats.numberPages.value += parseInt(document.forms.changeValues.page_value.value, 10);
  story.stats.readingTime.value += parseInt(document.forms.changeValues.hours_value.value, 10);

  document.querySelector('.book-card___change-values').style.display = 'none';
  addDataToChart();
  addDataToSpeedChart();
};

const changeReadStatus = (event) => {
  const aim = event.target;
  event.stopPropagation();
  // Change read status
  aim.parentElement.parentElement.parentElement.firstElementChild.children[2].textContent = 'Status: Read';
  // change stats
  story.stats.stillRead.value -= 1;
  story.stats.read.value += 1;
  console.log('klik w checkera');
  // DELETE UNUSEFUL CART BUTTONS WHEN BOOK WILL BE READ
  event.target.parentElement.parentElement.children[0].parentNode
    .removeChild(event.target.parentElement.parentElement.children[0]);
  event.target.parentNode.removeChild(event.target);
  addDataToChart();
  addDataToSpeedChart();
};

const deleteStats = (cartData, target) => {
  //  NIE TRZEBA DWOCH PARAMETROW WSZYSTKO MOZNA Z JEDNEGO !!!!
  const findReadingTime = target.parentElement.parentElement.parentElement.children[0].children[4].textContent.indexOf(':');
  const findNumberPages = target.parentElement.parentElement.parentElement.children[0].children[5].textContent.indexOf(':');
  // MOZE ITERACJA JAKOS??
  const keys = Object.keys(story.stats);
  console.log(keys);
  if (cartData[2].textContent === 'Status: still') {
    story.stats.stillRead.value -= 1;
  } else if (cartData[2].textContent === 'Status: done') {
    story.stats.read.value -= 1;
  }
  if (cartData[3].textContent === 'Language: English') {
    story.stats.english.value -= 1;
  } else if (cartData[3].textContent === 'Language: Polish') {
    story.stats.polish.value -= 1;
  } else if (cartData[3].textContent === 'Language: Spanish') {
    story.stats.spanish.value -= 1;
  }
  story.stats.readingTime.value -= parseInt(cartData[4].textContent.slice(findReadingTime + 2), 10);
  story.stats.numberPages.value -= parseInt(cartData[5].textContent.slice(findNumberPages + 2), 10);
};
const deleteBook = (event) => {
  // MOŻE DA SIĘ ZMIENNA TO ZROBIĆ?????????????
  const cart = event.target.parentElement.parentElement.parentElement;
  const cartList = event.target.parentElement.parentElement.parentElement.childNodes[0].childNodes;
  event.stopPropagation();
  Store.removeBooks(event.target.parentElement.parentElement.parentElement.children[0].children[0].textContent);
  deleteStats(cartList, event.target);
  cart.parentNode.removeChild(cart);
  addDataToChart();
  addDataToSpeedChart();
  // render Books Number
  document.querySelector('.book-section__title > h2 > span').textContent = `(${story.stats.read.value + story.stats.stillRead.value})`;
};

// LISTENER
document.querySelector('.book-section__row').addEventListener('click', (e) => {
  // BUTTONS INSIDE SECTION
  const sign = document.querySelectorAll('.book-card___change-values > form > button');
  const editBtn = document.querySelectorAll('.fa-edit');
  const changeStatus = document.querySelectorAll('.fa-check-square');
  const deleteCart = document.querySelectorAll('.fa-trash');
  console.log(e.target);
  // LISTENERS
  changeStatus.forEach((changeBtn) => {
    changeBtn.addEventListener('click', changeReadStatus);
  });

  sign.forEach((signBtn) => {
    signBtn.addEventListener('click', editCart);
  });

  editBtn.forEach((editCartBtn) => {
    editCartBtn.addEventListener('click', startEdit);
  });

  deleteCart.forEach((deleteBtn) => {
    deleteBtn.addEventListener('click', deleteBook);
  });
});
