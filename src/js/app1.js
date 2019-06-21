// static putObject(el, parent) {

//   parent.appendChild(el);
// };

// static createNewElement(child, parent, className, text, titles) {
//   parent.appendChild(child);
//   this.setProperties(child, className, text, titles);
// }

// static setPropertyObject(className, text, titles) {
//   if (Array.isArray(className)) { // sprawdz czy jest tablica a nie objektem!!!
//     for (let i = 0; i < className.length; i += 1) {
//       element.classList.add(className[i]);
//     }
//   } else {
//     element.classList.add(className);
//   }

//   if (text !== undefined) {
//     element.innerHTML = `${titles} ${text}`;
//   }
// }

// static createElementX(el, parent, className, text, titles) { // dodana nowa wlascwosc arg

//   console.log(`OJCIEC: ${parent}`);
//   // const element = document.createElement(el);


// }

// static createCards(bookData, cardsTitle, bookCardIconClass, sectionTitle) {
//   const that = this;
//   const cart = document.createDocumentFragment();

//   let insertBefore = false;
//   // Elements which i want to CREATE:
//   const divek = document.createElement('div');
//   const list = document.createElement('ul');
//   const article = document.createElement('article');
//   const form = document.createElement('form');
//   const button = document.createElement('button');
//   const listElements = document.createElement('li');
//   const icon = document.createElement('i');
//   const btnWraper = document.createElement('div');

//   const changeCartState = document.createElement('button')
//   // CODE...


//   // Add Class list
//   divek.classList.add('book-card__wraper');
//   // cart.appendChild(divek);

//   // this.createElementX('div', cart, 'book-card__wraper');

//   if (document.querySelector('.book-section__row').childNodes.length > 0) {
//     insertBefore = true;
//   }
//   console.log(divek);
//   (function createWrapCart() {
//     that.createElementX(list,
//       divek,
//       'book-card__list');
//   }());

//   (function createEditorNumberData() {
//     that.createElementX(article,
//       divek,
//       'book-card___change-values',
//       'Add values:');

//     that.createElementX(form,
//       article,
//       'book-card__form');

//     form.setAttribute('name', 'changeValues');

//     that.createInput(form,
//       'page_value',
//       'Page: +',
//       'book-card__edit-value',
//       true);

//     that.createInput(form,
//       'hours_value',
//       'Hours: +',
//       'book-card__edit-value');

//     that.createElementX(button,
//       form,
//       'book-card__form-button',
//       'Change!');

//     button.setAttribute('type', 'submit');
//   }());

//   (function createCartList() {
//     const maxFeature = 6;
//     for (let i = 0; i < maxFeature; i += 1) {
//       that.createElementX(listElements,
//         list,
//         (`${i === 0 ? cardsTitle[0] : cardsTitle[1]}`),
//         bookData[i],
//         i > 0 ? sectionTitle[i - 1] : '');
//     }
//   }());

//   (function createBtnCartSection() {
//     that.createElementX(btnWraper,
//       divek,
//       'book-card__btn-wraper');

//     for (let i = 0; i < bookCardIconClass.length; i += 1) {
//       that.createElementX(changeCartState,
//         btnWraper,
//         'book-card__button');

//       that.createElementX(icon,
//         document.querySelectorAll('.book-card__button')[i],
//         ['fas', `${bookCardIconClass[i]}`]);
//     }
//   }());

//   // console.log(`OTO TO CO CHCE WKLEJAĆ:${divek}`);
//   // cart.appendChild(divek);
//   console.log(cart);
//   if (insertBefore) {
//     document.querySelector('.book-card__wraper').before(cart);
//     console.log('BEFORE');
//   } else {
//     console.log('FIRST TIME');
//     document.querySelector('.book-section__row').appendChild(cart);
//   }
// }

// // 
// // 
// // STAREEEEEEEE
// // 
// // 
// // 

// static createCards(bookData, cardsTitle, bookCardIconClass, sectionTitle) {
//   const that = this;
//   const cart = document.createDocumentFragment();

//   let insertBefore = false;
//   // Elements which i want to CREATE:
//   const divek = document.createElement('div'),
//     list = document.createElement('ul');
//   // CODE...

//   divek.classList.add('book-card__wraper');
//   // cart.appendChild(divek);

//   // this.createElementX('div', cart, 'book-card__wraper');

//   if (document.querySelector('.book-section__row').childNodes.length > 0) {
//     insertBefore = true;
//   }
//   console.log(divek);
//   // TA METODA PRZESZKADZA W PLYNNYM DODAWANIU ELEMENTÓW
//   // POPRAW STRUKTURE METOD CREATE ELEMENTX TAK ABY NIE BYLO OD RAZU APPENDCHILD
//   // WSZYSTKO POCZATKOWO PRZYPISUJEMY DO FRAGMENTU KODU A POWSTAŁY KOD WSTAWIAMMY
//   // *
//   // *
//   // *
//   // INNE SPOSOBY OPTYMALIZACJI:
//   // 1. PRZYPISZ ELEMENTY DOM (NAJCZESCIEJ UZYWANE DO ZMIENNEJ)
//   // 2. ZAPAMIĘTANIE LENGTH W TRAKCIE LITERACJI
//   // 3. UNIKANIE TWORZENIA ELEMENTÓW W PĘTLACH
//   // 4. POPRAWIENIE BUBBLING EVENTS
//   // 5. SPRAW ABY PRZYCISKI DZIAŁĄŁY ODPOWIEDNIO NA KARCIE
//   //  6. LOCAL STORAGE
//   //  7. STYLE
//   (function createWrapCart() {
//     that.createElementX('ul',
//       divek,
//       'book-card__list');
//   }());

//   (function createEditorNumberData() {
//     that.createElementX('article',
//       divek,
//       'book-card___change-values',
//       'Add values:');

//     that.createElementX('form',
//       document.querySelector('.book-card___change-values'),
//       'book-card__form');
//     document.querySelector('.book-card__form').setAttribute('name', 'changeValues');

//     that.createInput(document.querySelector('.book-card__form'),
//       'page_value',
//       'Page: +',
//       'book-card__edit-value',
//       true);

//     that.createInput(document.querySelector('.book-card__form'),
//       'hours_value',
//       'Hours: +',
//       'book-card__edit-value');

//     that.createElementX('button',
//       document.querySelector('.book-card__form'),
//       'book-card__form-button',
//       'Change!');
//     document.querySelector('.book-card__form-button').setAttribute('type', 'submit');
//   }());

//   (function createCartList() {
//     const maxFeature = 6;
//     for (let i = 0; i < maxFeature; i += 1) {
//       that.createElementX('li',
//         document.querySelector('.book-card__list'),
//         (`${i === 0 ? cardsTitle[0] : cardsTitle[1]}`),
//         bookData[i],
//         i > 0 ? sectionTitle[i - 1] : '');
//     }
//   }());

//   (function createBtnCartSection() {
//     that.createElementX('div',
//       document.querySelector('.book-card__wraper'),
//       'book-card__btn-wraper');

//     for (let i = 0; i < bookCardIconClass.length; i += 1) {
//       that.createElementX('button',
//         document.querySelector('.book-card__btn-wraper'),
//         'book-card__button');

//       that.createElementX('i',
//         document.querySelectorAll('.book-card__button')[i],
//         ['fas', `${bookCardIconClass[i]}`]);
//     }
//   }());

//   // console.log(`OTO TO CO CHCE WKLEJAĆ:${divek}`);
//   // cart.appendChild(divek);
//   console.log(cart);
//   if (insertBefore) {
//     document.querySelector('.book-card__wraper').before(cart);
//     console.log('BEFORE');
//   } else {
//     console.log('FIRST TIME');
//     document.querySelector('.book-section__row').appendChild(cart);
//   }
// }


// // create elements

// static createElementX(el, parent, className, text, titles) { // dodana nowa wlascwosc arg
//     console.log(`TWORZE: ${el}`);
//     console.log(`OJCIEC: ${parent}`);
//     const element = document.createElement(el);
//     parent.appendChild(element);
//     if (Array.isArray(className)) { // sprawdz czy jest tablica a nie objektem!!!
//       for (let i = 0; i < className.length; i += 1) {
//         element.classList.add(className[i]);
//       }
//     } else {
//       element.classList.add(className);
//     }

//     if (text !== undefined) {
//       element.innerHTML = `${titles} ${text}`;
//     }
//   }



