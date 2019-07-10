/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import LS from './localSotrage-handler';
import HistoryData from './storyStats';
import Book from './newBook';
import { readingStats, speedReadingStats, renderChart } from './charts';
import CreateCarts from './cart-creator';

export const story = new HistoryData();
const Stor = new LS();
const Store = Stor.constructor;
// const Book = new Books();
const creator = new CreateCarts();
const creatorCarts = creator.constructor;

export class UI {
  static displayBooks() {
    const books = Store.getStorageItem('books');
    const stats = Store.getStorageItem('stats');
    books.forEach((book) => {
      creatorCarts.createCarts({
        cartState: book.bookData[2],
        bookData: book.bookData,
        cartsTitle: book.cardsTitle,
        bookCartIconClass: book.bookCardIconClass,
        sectionTitle: book.sectionTitles,
      });
    });

    if (stats.length !== 0) {
      story.initStats(stats);
      renderChart(story);
    }
    UI.bookCounter();
  }

  static bookCounter() {
    document.querySelector('.book-section__title > h2 > span').textContent = `(${story.stats.read.value + story.stats.stillRead.value})`;
  }

  static hideFormSection() {
    setTimeout(() => {
      document.querySelector('.book-features').classList.remove('book-features--active');
    }, 1000);
  }

  static addToStory(featuresBook) {
    for (let i = 2; i < featuresBook.length - 2; i += 1) {
      story.addReadingInfoToStory(featuresBook[i]);
    }
    story.addNumberStatsToStory(featuresBook);
  }

  static removeFromStory(featuresBook) {
    for (let i = 2; i < featuresBook.length - 2; i += 1) {
      story.removeReadingInfoFromStory(featuresBook[i]);
    }
    story.removeNumberStatsFromStory(featuresBook);
  }

  static updateCartNumberData(numberElement, addingNumber) {
    return parseInt(numberElement.textContent, 10) + parseInt(addingNumber, 10);
  }

  static updateInterface() {
    UI.hideFormSection();
    UI.bookCounter();
  }
}
