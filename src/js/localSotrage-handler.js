/* eslint-disable no-unused-vars */
// /
// LOCAL STORAGE
// /
export default class Store {
  static getStorageItem(item) {
    let stats;
    if (localStorage.getItem(item) === null) {
      stats = [];
    } else {
      stats = JSON.parse(localStorage.getItem(item));
    }
    return stats;
  }

  static addStats(addStats) {
    const stats = Store.getStorageItem('stats');
    stats.splice(0);
    stats.push(addStats);
    localStorage.setItem('stats', JSON.stringify(stats));
  }

  static addBooks(book) {
    const books = Store.getStorageItem('books');
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static changeReadStatus(title, put) {
    const books = Store.getStorageItem('books');

    books.forEach((book) => {
      if (book.bookData[0].trim() === title.trim()) {
        book.bookData.splice(2, 1, put);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }

  static editStorageStats(title, put) {
    const books = Store.getStorageItem('books');

    books.forEach((book) => {
      if (book.bookData[0].trim() === title.trim()) {
        book.bookData.splice(4, 2, put[0], put[1]);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }

  static renderStorageData(bookItem, statsItem) {
    Store.addBooks(bookItem);
    Store.addStats(statsItem);
  }

  static removeBooks(title) {
    const books = Store.getStorageItem('books');
    books.forEach((book, index) => {
      if (book.bookData[0].trim() === title.trim()) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeStats(cartData, target) {
    const stats = Store.getStorageItem('stats');

    if (cartData[2].children[0].textContent === 'still') {
      stats[0].stillRead.value -= 1;
    } else if (cartData[2].children[0].textContent === 'done') {
      stats[0].read.value -= 1;
    }
    if (cartData[3].children[0].textContent === 'English') {
      stats[0].english.value -= 1;
    } else if (cartData[3].children[0].textContent === 'Polish') {
      stats[0].polish.value -= 1;
    } else if (cartData[3].children[0].textContent === 'Spanish') {
      stats[0].spanish.value -= 1;
    }
    // II CZESC DOT. 2 WYKRESU I STATYSTYK LICZBOWYCH
    stats[0].readingTime.value -= parseInt(cartData[4].children[0].textContent, 10);
    stats[0].numberPages.value -= parseInt(cartData[5].children[0].textContent, 10);
    localStorage.setItem('stats', JSON.stringify(stats));
  }

  static readBookChangeData() {
    const stats = Store.getStorageItem('stats');
    stats[0].stillRead.value -= 1;
    stats[0].read.value += 1;
    localStorage.setItem('stats', JSON.stringify(stats));
  }
}
