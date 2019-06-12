
import '../scss/main.scss';
import Chart from 'chart.js';

const form = document.querySelector('.app__form');
// eslint-disable-next-line prefer-const
let booksChart = document.querySelector('#stats__booksChart').getContext('2d');
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
  static createElement(el, insertBefore, className) {
    const element = document.createElement(el);
    insertBefore.before(element);
    element.classList.add(className);
  }

  static createElementX(el, parent, className, text, titles) { // dodana nowa wlascwosc arg
    const element = document.createElement(el);
    parent.appendChild(element);
    if (Array.isArray(className)) { // sprawdz czy jest tablica a nie objektem!!!
      for (let i = 0; i < className.length; i += 1) {
        element.classList.add(className[i]);
      }
    } else {
      element.classList.add(className);
    }

    if (text !== undefined) {
      element.innerHTML = `${titles} ${text}`;
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

  static createCards(bookData, cardsTitle, bookCardIconClass, sectionTitle) {
    const that = this;
    // let cart = document.createDocumentFragment();
    let insertBefore = false;

    if (document.querySelector('.book-section__row').childNodes.length > 0) {
      insertBefore = true;
    }

    (function createWrapCart() {
      if (insertBefore) {
        that.createElement('div',
          document.querySelector('.book-card__wraper'),
          'book-card__wraper');
      } else {
        that.createElementX('div',
          document.querySelector('.book-section__row'),
          'book-card__wraper');
      }


      that.createElementX('ul',
        document.querySelector('.book-card__wraper'),
        'book-card__list');
    }());
    (function createEditorNumberData() {
      that.createElementX('article',
        document.querySelector('.book-card__wraper'),
        'book-card___change-values',
        'Add values:');

      that.createElementX('form',
        document.querySelector('.book-card___change-values'),
        'book-card__form');
      document.querySelector('.book-card__form').setAttribute('name', 'changeValues');

      that.createInput(document.querySelector('.book-card__form'),
        'page_value',
        'Page: +',
        'book-card__edit-value',
        true);

      that.createInput(document.querySelector('.book-card__form'),
        'hours_value',
        'Hours: +',
        'book-card__edit-value');

      that.createElementX('button',
        document.querySelector('.book-card__form'),
        'book-card__form-button',
        'Change!');
      document.querySelector('.book-card__form-button').setAttribute('type', 'submit');
    }());

    (function createCartList() {
      const maxFeature = 6;
      for (let i = 0; i < maxFeature; i += 1) {
        that.createElementX('li',
          document.querySelector('.book-card__list'),
          (`${i === 0 ? cardsTitle[0] : cardsTitle[1]}`),
          bookData[i],
          i > 0 ? sectionTitle[i - 1] : '');
      }
    }());

    (function createBtnCartSection() {
      that.createElementX('div',
        document.querySelector('.book-card__wraper'),
        'book-card__btn-wraper');

      for (let i = 0; i < bookCardIconClass.length; i += 1) {
        that.createElementX('button',
          document.querySelector('.book-card__btn-wraper'),
          'book-card__button');

        that.createElementX('i',
          document.querySelectorAll('.book-card__button')[i],
          ['fas', `${bookCardIconClass[i]}`]);
      }
    }());
  }


  static correctValue(input) { // moze usprawnij
    let posiitive = false;
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
      `${story.stats.spanish.name}`,
      `${story.stats.readingTime.name}`,
      `${story.stats.numberPages.name}`],
    datasets: [{
      label: 'Liczba',
      data: [story.stats.read.value,
        story.stats.stillRead.value,
        story.stats.english.value,
        story.stats.polish.value,
        story.stats.spanish.value,
        story.stats.readingTime.value,
        story.stats.numberPages.value],
      backgroundColor: 'cadetblue',
    }],
  },
  options: {
    responsive: 'true',
    maintainAspectRatio: 'false',
  },
});

const addDataToChart = () => {
  massPopChart.data.datasets[0].data = [story.stats.read.value,
    story.stats.stillRead.value,
    story.stats.english.value,
    story.stats.polish.value,
    story.stats.spanish.value,
    story.stats.readingTime.value,
    story.stats.numberPages.value];
  massPopChart.update();
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
    const x = UI.newBookInstance(
      document.querySelector('.app-panel__book-name'),
      document.querySelector('.book-features__author'),
      document.querySelector(`.${story.clickStory[1]}`),
      document.querySelector(`.${story.clickStory[2]}`),
      document.querySelector('.book-features__time'),
      document.querySelector('.book-features__pages-amount'),
    );
    UI.createCards(x.bookData, x.cardsTitle, x.bookCardIconClass, x.sectionTitles);
    UI.clearInput();
    story.clickStory.splice(0, story.clickStory.length);
    addDataToChart();
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
form.addEventListener('submit', start);

// aktywuj statystyki
// document.querySelectorAll('.stats__toggle').forEach((btn) => {
//   btn.addEventListener('click', () => {
//     console.log('xlixk');
//     document.querySelector('.app-stats').classList.toggle('app-stats--active');
//   });
// });

// aktywuj pasek z lista ksiazek
document.querySelector('.fa-angle-down').addEventListener('click', () => {
  console.log('xd');
  document.querySelector('.book-section__row').classList.toggle('book-section__row--active');
});


// console.log(document.querySelector('.book-card__wraper').tagName);

// console.log(document.querySelector('.book-section__row').childNodes.length);

console.log(document.querySelector('.book-section__row'));

// LISTENER
// document.querySelector('.book-section__row').addEventListener('click', (e) => {
//   ['Read']
//   console.log(e.target.textContent.indexOf('Read'));

//   // if (e.target.classList[1] === 'fa-edit') {
//   //  ONLICK NA ELEMENT KTÓRY POCZATKOWO NIE ISTNIEJE _---BUTTON
//   // document.querySelector('.fa-edit').onclick = () => {
//   //   document.querySelector('.book-card___change-values').style.display = 'grid';
//   // };

//   // // ONLICK NA BUTTON ABY POBRAC FORMULARZ
//   // document.querySelector('.book-card___change-values > form > button').onclick = (event) => {
//   //   event.preventDefault();
//   //   //  POBRANIE DANYCH Z FORMULARZA :)))))
//   //   console.log(document.forms.changeValues.page_value.value);
//   //   console.log(document.forms.changeValues.hours_value.value);
//   //   document.querySelector('.book-card___change-values').style.display = 'none';
//   // };
//   // book-card__delete
//   // document.querySelector('.fa-trash').onclick = () => {
//   //   document.querySelector('.book-card___change-values').style.display = 'grid';
//   // };
//   // }
// });
