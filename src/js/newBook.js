export default class Book {
  constructor(dataArray) {
    this.bookData = dataArray;
    this.sectionTitles = ['Author:', 'Status:', 'Language:', 'Hours:', 'Pages:'];
    this.cardsTitle = ['book-card__title', 'book-card__feature'];
    this.bookCardIconClass = ['fa-edit', 'fa-trash', 'fa-check-square'];
  }
}
