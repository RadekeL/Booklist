
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

  static createCards(bookData, cardsTitle, bookCardIconClass, sectionTitle) {
    const that = this;
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
const downloadingDataToCart = (e) => {
  const maxScrollFeatures = (document.querySelectorAll('.book-features__option').length - 1) * (-100);
  const featureWindow = document.querySelector('.book-features__window');
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

const start = (e) => {
  e.preventDefault();
  const featureBtns = document.querySelectorAll('.book-features__next');
  if (UI.correctValue(e.target)) {
    document.querySelector('.book-features').classList.add('book-features--active');
    featureBtns.forEach((btn) => {
      btn.addEventListener('click', downloadingDataToCart);
    });
  }
};

// LISTENERS
form.addEventListener('submit', start);


document.querySelectorAll('.stats__toggle').forEach((btn) => {
  btn.addEventListener('click', () => {
    console.log('xlixk');
    document.querySelector('.app-stats').classList.toggle('app-stats--active');
  });
});


document.querySelector('.fa-angle-down').addEventListener('click', () => {
  console.log('xd');
  document.querySelector('.book-section__row').classList.toggle('book-section__row--active');
});


// console.log(document.querySelector('.book-card__wraper').tagName);

console.log(document.querySelector('.book-section__row').childNodes.length);
