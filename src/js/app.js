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
    this.clickStory = [];
  }


  addStatistics(el) {
    switch (el.getAttribute('id')) {
      case 'Read':
        this.stats.read.value += 1;
        break;
      case 'Still':
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
      case 'time':
        this.stats.readingTime.value += Number(el.previousElementSibling.value);
        break;
      case 'pages':
        this.stats.numberPages.value += Number(el.previousElementSibling.value);
        break;
      default:
    }
  }
}

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
      if (cartState === 'book-features__in-progress') {
        for (let i = 0; i < bookCardIconClass.length; i += 1) {
          const icon = document.createElement('i');
          const changeCartState = document.createElement('button');

          that.createNewElement(changeCartState, btnWraper, 'book-card__button');
          that.createNewElement(icon, changeCartState, ['fas', `${bookCardIconClass[i]}`]);
        }
        // CREATE ONLY ONE BTN TO DELETE BOOK CART, IF A BOOK HAS BEEN READ
      } else if (cartState === 'book-features__done') {
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


  static correctValue(input) { // moze usprawnij
    let posiitive = false;
    console.log('1');
    console.log(input.classList[0]);
    console.log('2');
    console.log(input.tagName);
    console.log('3');
    console.log(input.previousElementSibling.value);
    if (input.classList[0] === 'book-features__button' || input.tagName === 'FORM') {
      posiitive = true;
    } else {
      for (let i = 0; i < input.previousElementSibling.value.length; i += 1) {
        if (input.previousElementSibling.value[i] === ' ' || input.previousElementSibling.value[i] === '') {
          posiitive = false;
        } else {
          posiitive = true;
        }
      }
    }

    // if (type === 'number'){
    //   if(!isNaN(input)) {
    //   } else if (type === 'text'){
    //     if(isNaN(input)){

    //     }
    //   }
    // }
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

  static newBookInstance(title, author, status, language, time, pages) {
    return new Book(title.value, author.value, status.getAttribute('id'), language.getAttribute('id'), Number(time.value), Number(pages.value));
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

// EVENT FUNCTIONS
// funkcja
const downloadingDataToCart = (e) => {
  // moment do którego panel dodatkowych cech ma się przesówać
  const maxScrollFeatures = (document.querySelectorAll('.book-features__option').length - 1) * (-100);
  const featureWindow = document.querySelector('.book-features__window');
  // przekazanie danych dot. klikniętego przycisku do obiektu historia
  story.clickStory.push(e.target.classList[2]);
  story.addStatistics(e.target); // add stats
  if (featuresCounter === maxScrollFeatures) {
    featuresCounter = 0;
    UI.hidefeaturePanel();
    console.log(story.clickStory[1]);
    const x = UI.newBookInstance(
      document.querySelector('.app-panel__book-name'),
      document.querySelector('.book-features__author'),
      document.querySelector(`.${story.clickStory[1]}`),
      document.querySelector(`.${story.clickStory[2]}`),
      document.querySelector('.book-features__time'),
      document.querySelector('.book-features__pages-amount'),
    );
    UI.createCards(story.clickStory[1], x.bookData, x.cardsTitle,
      x.bookCardIconClass, x.sectionTitles);
    UI.clearInput();
    story.clickStory.splice(0, story.clickStory.length);
    addDataToChart();
    addDataToSpeedChart();
  } else if (featuresCounter !== maxScrollFeatures) {
    if (UI.correctValue(e.target)) {
      featuresCounter -= 100;
    }
  }
  featureWindow.style.top = `${featuresCounter}%`;
};

// FUNKCJA POBIERAJĄCA TUTUŁ KSIĄŻKI
const start = (e) => {
  e.preventDefault();
  // pobieram dane z mojego formularza poprzez deklaracje
  const featureBtns = document.querySelectorAll('.book-features__next');
  // eslint-disable-next-line max-len
  // Jeśli tytuł ma prawidłową wartość - wysówa aplikacja panel by wprowadzić bardziej szczegółowe informacje dotyczące ksiązki
  if (UI.correctValue(e.target)) {
    // ów panel się wysówa
    document.querySelector('.book-features').classList.add('book-features--active');
    // w wysuniętym panelu są buttony, które umożliwiają wpisanie następnej cechy książki
    // poniższa funkcja umożliwia klikniecie w owe przyciski
    featureBtns.forEach((btn) => {
      btn.addEventListener('click', downloadingDataToCart);
    });
  }
};

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
  const keys = Object.keys(story.stats);
  console.log(keys);

  if (cartData[2].textContent === 'Status: Still') {
    story.stats.stillRead.value -= 1;
  } else if (cartData[2].textContent === 'Status: Read') {
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
  const cart = event.target.parentElement.parentElement.parentElement;
  const cartList = event.target.parentElement.parentElement.parentElement.childNodes[0].childNodes;
  event.stopPropagation();
  deleteStats(cartList, event.target);
  cart.parentNode.removeChild(cart);
  addDataToChart();
  addDataToSpeedChart();
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
