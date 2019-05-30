/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-console */
// Posprzataj syf
// zoptymalizuj etody createElement i createElementX do jednej metody
import '../scss/main.scss';
import { resolve } from 'url';


// nowy
const dataArray = []; // moze da sie rozwinać ten i nie tworzyc next
const allData = [];


//
const bookCardIconClass = ['fa-edit', 'fa-trash', 'fa-check-square'];
const bookCardTitle = ['book-card__title', 'book-card__feature'];
const incorrectNames = {
  read: 'book-features__done',
  inProgressRead: 'book-features__in-progress',
  polish: 'book-features__polish',
  english: 'book-features__english',
  spanish: 'book-features__spanish',
};

const book = document.querySelector('.app-panel__button');
const putBookName = document.querySelector('.app-panel__book-name'); // bookTitle

const featureInputs = document.querySelectorAll('.book-features__next'); // nastepna cecha do wpisania

const feaureBtns = document.querySelectorAll('.book-features__button');
const featureWindow = document.querySelector('.book-features__window');

const maxFeature = 6;
let createCounter = 0;

// eslint-disable-next-line max-len
let featuresCounter = 0;
const maxScrollFeatures = (document.querySelectorAll('.book-features__option').length - 1) * (-100);


const title = document.querySelector('.app-panel__book-name');
const authorName = document.querySelector('.app-panel__book-name');
const status = 'DONE'; // pobierzesz potem
const language = 'POLISH'; // pobierzesz potem
const time = document.querySelector('.book-features__time');
const page = document.querySelector('.book-features__pages-amount');


// eslint-disable-next-line no-unused-vars
let add = true; // flaga czy dodawać
let addBook = false;

const changeToCorrectValue = (el) => {
  let result = '';
  switch (el) {
    case incorrectNames.inProgressRead:
      result = 'In Progres';
      break;
    case incorrectNames.read:
      result = 'Read';
      break;
    case incorrectNames.polish:
      result = 'Language: Polish';
      break;
    case incorrectNames.english:
      result = 'Language: English';
      break;
    case incorrectNames.spanish:
      result = 'Language: Spanish';
      break;
    default:
  }
  return result;
};
const createElement = (el, insertBefore, className) => {
  const element = document.createElement(el);
  insertBefore.before(element);
  element.classList.add(className);
};
const createElementX = (el, parent, className, text) => {
  const element = document.createElement(el);
  parent.appendChild(element);
  console.log(typeof className === 'object');
  if (typeof className === 'object') { // sprawdz czy jest tablica a nie objektem!!!
    for (let i = 0; i < className.length; i += 1) {
      element.classList.add(className[i]);
    }
  } else {
    element.classList.add(className);
  }

  if (text !== undefined) {
    element.textContent = `${text}`;
  }
};

// jest tutaj tymczasowo ta funkcja, bo uzyje PROMISA
const createCards = () => {
  if (addBook === true) {
    createCounter += 1;

    createElement('div',
      document.querySelector('.book-card__wraper'),
      'book-card__wraper');

    createElementX('ul',
      document.querySelector('.book-card__wraper'),
      'book-card__list');

    for (let i = 0; i < maxFeature; i += 1) {
      createElementX('li',
        document.querySelector('.book-card__list'),
        (`${i === 0 ? bookCardTitle[0] : bookCardTitle[1]}`),
        allData[createCounter - 1][i]);
    }

    createElementX('div',
      document.querySelector('.book-card__wraper'),
      'book-card__btn-wraper');

    for (let i = 0; i < bookCardIconClass.length; i += 1) {
      createElementX('button',
        document.querySelector('.book-card__btn-wraper'),
        'book-card__button');

      createElementX('i',
        document.querySelectorAll('.book-card__button')[i],
        ['fas', `${bookCardIconClass[i]}`]);
    }
  }

  addBook = !addBook;
};

const finish = (helpArr, mainArr) => {
  if (helpArr.length === maxFeature) {
    mainArr.push(helpArr.splice(0, helpArr.length));
    setTimeout(() => {
      document.querySelector('.book-features').classList.remove('book-features--active');
      addBook = !addBook;
      createCards(); // TYMCZASOWO wrzuce to na promisa
    }, 1000);
  }
  return addBook;
};
// eslint-disable-next-line no-unused-vars
const correctValue = (value) => {
  // console.log(value.length);
  for (let i = 0; i < value.length; i += 1) { // putBookName.value.length
    if (value[i] === ' ' || value[i] === '') {
      add = false;
    } else {
      add = true;
    }
  }
  return add;
};


const clearInput = (target) => {
  const clear = target;
  clear.previousElementSibling.value = '';
};


// const bookCardIconClass = ['fa-edit', 'fa-trash', 'fa-check-square'];
// const bookCardTitle = ['book-card__title', 'book-card__feature'];

// SECTION MAIN BOOK TITLE
// const insertBookName = (event) => {
//   if (correctValue(event.target.previousElementSibling.value)) {
//     // Start
//     dataArray.push(event.target.previousElementSibling.value);
//     book.removeEventListener('click', insertBookName);
//     document.querySelector('.book-features').classList.add('book-features--active');
//   } else {
//     alert('Please write correct Book Name');
//     add = false;
//   }
//   // clear input
//   clearInput(event.target);
// };
// CZY PROMISY I EVENTLISTENERY NIE GRYZA SIEM???

// SECTION FEATURES
// const addBtnData = (event) => {
//   dataArray.push(changeToCorrectValue(event.target.classList[2]));
//   featureWindow.style.top = `${featuresCounter === maxScrollFeatures ? featuresCounter = 0 : featuresCounter -= 100}%`;
// };

// const addInputsData = (event) => {
//   if (correctValue(event.target.previousElementSibling.value)) {
//     featureWindow.style.top = `${featuresCounter === maxScrollFeatures ? featuresCounter = 0 : featuresCounter -= 100}%`;
//     dataArray.push(event.target.previousElementSibling.value);
//     clearInput(event.target);
//     finish(dataArray, allData);
//     console.log('xdd');
//   }
// };

// Start
// book.addEventListener('click', insertBookName);

// Sekcja
// feaureBtns.forEach((btn) => {
//   btn.addEventListener('click', addBtnData);
// });

// featureInputs.forEach((arrow) => {
//   arrow.addEventListener('click', addInputsData);
// });

// EDIT
// createCards(); // ZROB PROMISE NA TO, OBECNIE DZIALA BO JEST W FUNKCJHI FINISH

// function scaryClown() {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve('🤡');
//     }, 2000);
//   });

// async function msg() {
//   const msfg = await scaryClown();
//   console.log('Message:', msfg);
// }

// msg(); // Message: 🤡 <-- after 2 seconds
const insertBookName = (event) => {
  console.log(event.target);
  if (correctValue(event.target.previousElementSibling.value)) {
    // Start
    document.querySelector('.book-features').classList.add('book-features--active');
    dataArray.push(event.target.previousElementSibling.value);
    book.removeEventListener('click', insertBookName);
  } else {
    alert('Please write correct Book Name');
    add = false;
  }
  // clear input
  clearInput(event.target);
};


const addTitleBook = () => {
  book.addEventListener('click', insertBookName);
};

// const addBookFeatures = () => {
//   console.log(addBook);

//   if (addBook) {
const addBtnData = (event) => {
  dataArray.push(changeToCorrectValue(event.target.classList[2]));
  featureWindow.style.top = `${featuresCounter === maxScrollFeatures ? featuresCounter = 0 : featuresCounter -= 100}%`;
};

const addInputsData = (event) => {
  if (correctValue(event.target.previousElementSibling.value)) {
    featureWindow.style.top = `${featuresCounter === maxScrollFeatures ? featuresCounter = 0 : featuresCounter -= 100}%`;
    dataArray.push(event.target.previousElementSibling.value);
    clearInput(event.target);
    finish(dataArray, allData);
    console.log('xdd');
  }
};

feaureBtns.forEach((btn) => {
  btn.addEventListener('click', addBtnData);
});

featureInputs.forEach((arrow) => {
  arrow.addEventListener('click', addInputsData);
});
//   }
// };
// addBookFeatures();
addTitleBook();

changeToCorrectValue(el) {
  switch (el.classList[2]) {
    case 'book-features__done':
      this.statNumbers.read = 1;
      break;
    case 'book-features__in-progress':
      this.statNumbers.stillRead = 1;
      break;
    case 'book-features__polish':
      this.statNumbers.polish = 1;
      break;
    case 'book-features__english':
      this.statNumbers.english = 1;
      break;
    case 'book-features__spanish':
      this.statNumbers.spanish = 1;
      break;
    case 'book-features__time':
      this.statNumbers.time = `${el.previousElementSibling.value}`;
      break;
    case 'book-features__page':
      this.statNumbers.page = `${el.previousElementSibling.value}`;
      break;
    default:
  }
  return stats;
}

class HistoryStats {
  constructor() {
    this.stats = {
      read: 0,
      stillRead: 0,
      polish: 0,
      english: 0,
      spanish: 0,
      time: 0,
      page: 0,
    };
  }
  
}

// TUTAJ MAM ALTERNATYWE DO TEGO JAK PRZEMIESCIC DANE(STATUS, LANGUAGE) ORAZ 
// WPROWADZENIE ABY WYKRES BYL KOMPATYBILMY

// const statNumbers = [
//   {name: 'read',
//     value: 0},
//   {name: 'stillRead',
//     value: 0},
//   {name: 'english',
//     value: 0},
//   {name: 'polish',
//     value: 0},
//   {name: 'spanish',
//     value: 0},
//   {name: 'readingTime',
//     value: 0},
//   {name: 'pages',
//     value: 0},
// ]
const statNumbers = {

}


static changeToCorrectValue(el, statNumbers) {
  let stats = statNumbers;
  switch (el.classList[2]) {
    case 'book-features__done':
      stats.read = 1;
      break;
    case 'book-features__in-progress':
      stats.stillRead = 1;
      break;
    case 'book-features__polish':
      stats.polish = 1;
      break;
    case 'book-features__english':
      stats. = 1;
      break;
    case 'book-features__spanish':
      stats.value = 1;
      break;
    case 'book-features__time':
      stats.value = `${el.classList[2].previousElementSibling.value}`;
      break;
    case 'book-features__page':
      stats.value = `${el.classList[2].previousElementSibling.value}`;
      break;
    default:
  }
  return stats;
}

// static changeToCorrectValue(el, statNumbers) {
//   let stats = statNumbers;
//   switch (el.classList[2]) {
//     case 'book-features__done':
//       stats[0].value += 1;
//       break;
//     case 'book-features__in-progress':
//       stats[1].value += 1;
//       break;
//     case 'book-features__polish':
//       stats[2].value += 1;
//       break;
//     case 'book-features__english':
//       stats[3].value += 1;
//       break;
//     case 'book-features__spanish':
//       stats[4].value += 1;
//       break;
//     case 'book-features__time':
//       stats[5].value += `${el.classList[2].previousElementSibling.value}`;
//       break;
//     case 'book-features__page':
//       stats[6].value += `${el.classList[2].previousElementSibling.value}`;
//       break;
//     default:
//   }
//   return stats;
// }

static change(statNumbers, callback) {
  callback();
  const resArr = [];
  statNumbers.forEach((num) => {
    if (num.value > 0) {
      resArr.push(num);
    }
  });
  return resArr; // zwraca elementy które maja ponad 1
}




static changeToCorrectValue(el) {
  let result = '';
  console.log(el);
  switch (el.classList[2]) {
    case 'book-features__done':
      result = 'In Progres';
      break;
    case 'book-features__in-progress':
      result = 'Read';
      break;
    case 'book-features__polish':
      result = 'Language: Polish';
      break;
    case 'book-features__english':
      result = 'Language: English';
      break;
    case 'book-features__spanish':
      result = 'Language: Spanish';
      break;
    default:
  }
  return result;
}