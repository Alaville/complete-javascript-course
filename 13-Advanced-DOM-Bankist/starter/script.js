'use strict';

///////////////////////////////////////

//selecting elements
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
const allButtons = document.getElementsByTagName('button');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');
const section2 = document.getElementById('section--2');
const section3 = document.getElementById('section--3');
// Modal window
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//LEARN MORE BUTTON
btnScrollTo.addEventListener('click', function () {
  section1.scrollIntoView({ behavior: 'smooth' });
});
//PAGE NAVIGATION

// 1. add event listener to common parent element
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  if (
    e.target.classList.contains('nav__link') &&
    !e.target.classList.contains('nav__link--btn')
  ) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//OPERATIONS TAPPED COMPONENT
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  e.preventDefault();
  const click = e.target.closest('button');

  if (click) {
    //remove active classes
    tabs.forEach(tab => tab.classList.remove('operations__tab--active'));

    tabsContent.forEach(content =>
      content.classList.remove('operations__content--active')
    );

    //add active classes
    click.classList.add('operations__tab--active');

    const datatab = click.getAttribute('data-tab');
    //console.log(click.dataset.tab);

    document
      .querySelector(`.operations__content--${datatab}`)
      .classList.add('operations__content--active');
  }
});
//////////////////////////////////////////
// Menu fade animation

const nav = document.querySelector('nav');
const logo = document.querySelector('.nav__logo');
const links = document.querySelectorAll('.nav__links');

const handleHover = (e, opacity) => {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = e.target.closest('.nav').querySelectorAll('.nav__link');
    const logo = e.target.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = opacity;
    });

    logo.style.opacity = opacity;
  }
};

//nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseover', function (e) {
  handleHover(e, 0.5);
});

//nav.removeEventListener('mouseout', handleHover.bind(1));
nav.addEventListener('mouseout', function (e) {
  handleHover(e, 1);
});

// Sticky navigation

/* const initialCoords = section1.getBoundingClientRect();
console.log(initialCoords);

window.addEventListener('scroll', function () {
  if (window.scrollY > initialCoords.top) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
}); */

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');

//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

/* document.getElementById('section--1');
document.getElementsByClassName('btn');

//creating and inserting elements
const message = document.createElement('div');
message.classList.add('cookie-message');
//message.textContent = 'We use cookies for fun'
message.innerHTML =
  'We use cookies for fun. <button class="btn btn--close-cookie">Got it!</button>';

//header.prepend(message);
header.append(message);
//header.append(message.cloneNode(true));
// header.before(message);
// header.after(message);

//deletin elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

//Styles

message.style.backgroundColor = '#37383d';
message.style.width = '120%';

// get style from element
console.log(getComputedStyle(message).backgroundColor);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

//Attributes

const logo = document.querySelector('.nav__logo');

console.log(logo.src);
console.log(logo.alt);
console.log(logo.className);
console.log(logo.getAttribute('alt'));
 */

// const btnScrollTo = document.querySelector('.btn--scroll-to');
// const section1 = document.getElementById('section--1');
// const section2 = document.getElementById('section--2');
// const section3 = document.getElementById('section--3');

// btnScrollTo.addEventListener('click', function () {
//   section1.scrollIntoView({ behavior: 'smooth' });
// const s1coords = section1.getBoundingClientRect();
// console.log(s1coords);

//scrolling
//   window.scroll(
//     s1coords.left + window.pageXOffset,
//     s1coords.top + window.pageYOffset
//   );

// window.scroll({
//   left: s1coords.left + window.pageXOffset,
//   top: s1coords.top + window.pageYOffset,
//   behavior: 'smooth',
// });

/* const h1 = document.querySelector('h1');

const ciao = function (e) {
  console.log('ciao!');
};

h1.addEventListener('mouseenter', ciao);

setTimeout(() => h1.removeEventListener('mouseenter', ciao), 5000); */

//rgb(255,255,255)

// const randomInt = (min, max) =>
//   Math.trunc(Math.random() * (max - min + 1) + min);

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

// console.log(randomColor());

/* const h1 = document.querySelector('h1');

//Going downwards: child elements
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.children);
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

//Going upwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest('.header').style.background = 'var(--gradient-secondary)';
 */
