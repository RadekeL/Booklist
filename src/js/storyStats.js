/* eslint-disable no-unused-vars */
export default class AccumulatedData {
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
    // console.log(object.stats);
    // const obj = object.stats;
    switch (bookData) {
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
    // return obj;
  }

  addNumberStatsToStory(currentObject) {
    this.stats.readingTime.value += Number(currentObject[4]);
    this.stats.numberPages.value += Number(currentObject[5]);
  }

  removeReadingInfoFromStory(bookData) {
    switch (bookData.children[0].textContent) {
      case 'done':
        this.stats.read.value -= 1;
        break;
      case 'still':
        this.stats.stillRead.value -= 1;
        break;
      case 'Polish':
        this.stats.polish.value -= 1;
        break;
      case 'English':
        this.stats.english.value -= 1;
        break;
      case 'Spanish':
        this.stats.spanish.value -= 1;
        break;
      default:
    }
  }

  removeNumberStatsFromStory(currentObject) {
    this.stats.readingTime.value -= Number(currentObject[4].children[0].textContent);
    this.stats.numberPages.value -= Number(currentObject[5].children[0].textContent);
  }

  // MOÆE PODZIAØA JAKA§ ITERACJA
  initStats(object) {
    this.stats.read.value += object[0].read.value;
    this.stats.stillRead.value += object[0].stillRead.value;
    this.stats.polish.value += object[0].polish.value;
    this.stats.english.value += object[0].english.value;
    this.stats.spanish.value += object[0].spanish.value;
    this.stats.readingTime.value += object[0].readingTime.value;
    this.stats.numberPages.value += object[0].numberPages.value;
  }
}
