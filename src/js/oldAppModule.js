
// NIE CHCE SIE DODAWAC KARTA!!!
let formPosition = 0;
const book = new Book();
const stor = new Store();
const store = stor.constructor;
const dataStats = new Story();
const tool = new UI();
const tools = tool.constructor;
const form1 = document.querySelector('.app__form');
console.log(tools.constructor.getRatioValue);
// NOWE PODZIALY
const creator = new CreateCarts();
const creatorCarts = creator.constructor;
const validator = new Validation();
const formOperation = validator.constructor;
const initialForm = document.querySelector('.book-features__FORM');
const readingDataChart = document.querySelector('.fa-chart-bar');
const speedDataChart = document.querySelector('.fa-book-open');
const booksListBtn = document.querySelector('.fa-angle-down');
const bookCartSection = document.querySelector('.book-section__row');


const takeBookFeatures = (e) => {
  e.preventDefault();
  const counter = formPosition === 0 ? formPosition : -formPosition / 100;
  const MAX_HEIGHT = (document.querySelectorAll('.book-features__option').length) * (-100);
  const additionalForm = document.querySelector('.book-features__window');
  if (formOperation.formValidation(e.target.children[counter].children[1])) {
    formPosition -= 100;
  }

  if (formPosition === MAX_HEIGHT) {
    const ratioValue = formOperation.getRatioValue(document.querySelectorAll('input[name="readData"]'));
    const featuresBook = [
      document.querySelector('.app-panel__book-name').value,
      document.querySelector('.book-features__author').value,
      ratioValue.value,
      formOperation.getSelectValue(document.querySelector('select[name="language"]')).value,
      document.querySelector('.book-features__time').value,
      document.querySelector('.book-features__pages-amount').value];
    const bookInstance = new Book(featuresBook);
    formPosition = 0;
    creatorCarts.createCards({
      cartState: ratioValue.value,
      bookData: bookInstance.bookData,
      cardsTitle: bookInstance.cardsTitle,
      bookCardIconClass: bookInstance.bookCardIconClass,
      sectionTitle: bookInstance.sectionTitles,
    });
    store.renderStorageData(bookInstance, story.stats);
    UI.updateInterface();
    UI.addToStory(featuresBook);
    renderChart(story);
    formOperation.clearInput([form1, initialForm]);
  }
  additionalForm.style.top = `${formPosition}%`;
};

// FUNKCJA POBIERAJĄCA TUTUŁ KSIĄŻKI
const start = (e) => {
  e.preventDefault();
  if (formOperation.formValidation(e.target.children[2])) {
    document.querySelector('.book-features').classList.add('book-features--active');
    initialForm.addEventListener('submit', takeBookFeatures);
  }
};

// LOAD CARTS WITH START PAGE
document.addEventListener('DOMContentLoaded', UI.displayBooks);
// LISTENERS
form1.addEventListener('submit', start);

const displaySpeedChart = () => {
  document.querySelector('.stats-speed').classList.toggle('stats-speed--active');
  document.querySelector('.app-stats').classList.toggle('app-stats--active');
};
const displayReadingChart = () => {
  document.querySelector('.stats-cont').classList.toggle('stats-cont--active');
  document.querySelector('.app-stats').classList.toggle('app-stats--active');
};

const displayBooksList = () => {
  document.querySelector('.book-section__row').classList.toggle('book-section__row--active');
};
// readingDataChar
readingDataChart.addEventListener('click', displayReadingChart);
speedDataChart.addEventListener('click', displaySpeedChart);

booksListBtn.addEventListener('click', displayBooksList);

// ZROB TAK ABY DZIALANIA TYCH EVENTOW ODZIALYWALYBY NA WYKRES I NA OBIEKT STORYYY
const startEdit = (event) => {
  console.log('klik w przycisk edit!');
  event.stopPropagation();
  document.querySelector('.book-card___change-values').style.display = 'grid';
};

const editCart = (event) => {
  event.stopImmediatePropagation();
  event.preventDefault();
  console.log('klik w panel edytora!');
  story.stats.numberPages.value += parseInt(document.forms.changeValues.page_value.value, 10);
  story.stats.readingTime.value += parseInt(document.forms.changeValues.hours_value.value, 10);

  document.querySelector('.book-card___change-values').style.display = 'none';
  renderChart(story);
};

const changeReadStatus = (event) => {
  const aim = event.target;
  event.stopPropagation();
  // Change read status
  aim.parentElement.parentElement.parentElement.firstElementChild.children[2].textContent = 'Status: Read';
  // change stats
  story.stats.stillRead.value -= 1;
  story.stats.read.value += 1;
  console.log('klik w checkera!');
  // DELETE UNUSEFUL CART BUTTONS WHEN BOOK WILL BE READ
  aim.parentElement.parentElement.children[0].parentNode
    .removeChild(event.target.parentElement.parentElement.children[0]);
  event.target.parentNode.removeChild(event.target);
  renderChart(story);
};

const deleteStats = (cartData, target) => {
  //  NIE TRZEBA DWOCH PARAMETROW WSZYSTKO MOZNA Z JEDNEGO !!!!
  const findReadingTime = target.parentElement.parentElement.parentElement.children[0].children[4].textContent.indexOf(':');
  const findNumberPages = target.parentElement.parentElement.parentElement.children[0].children[5].textContent.indexOf(':');
  console.log('USUN STATY!');
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
  console.log('USUN KARTE!');
  const cart = event.target.parentElement.parentElement.parentElement;
  const cartList = cart.childNodes[0].childNodes;
  event.stopPropagation();
  store.removeBooks(event.target.parentElement.parentElement.parentElement
    .children[0].children[0].textContent);
  cart.parentNode.removeChild(cart);
  deleteStats(cartList, event.target);
  renderChart(story);
  // render Books Number
  UI.BookCounter();
};

// LISTENER
bookCartSection.addEventListener('click', (e) => {
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