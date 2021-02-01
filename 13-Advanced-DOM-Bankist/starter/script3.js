'use strict';

//elements
const modalEl = document.querySelector('.modal');
const overlayEl = document.querySelector('.overlay');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1El = document.getElementById('section--1');
const navEl = document.querySelector('.nav');
const headerEl = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
/////////////////////////////////////
//MODAL

const openModal = function () {
  modalEl.classList.remove('hidden');
  overlayEl.classList.remove('hidden');
};

const closeModal = function () {
  modalEl.classList.add('hidden');
  overlayEl.classList.add('hidden');
};

///////// EVENT LISTENERS
btnsOpenModal.forEach(btn => {
  btn.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);

overlayEl.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeModal();
  }
});

////////////////////////////////////////
// LEARN MORE BUTTON SCROLL

btnScrollTo.addEventListener('click', function () {
  section1El.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////
// SMOOTH NAVIGATION

navEl.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    e.target.classList.contains('nav__link') &&
    !e.target.classList.contains('nav__link--btn')
  ) {
    const href = e.target.getAttribute('href').slice(1);
    document.getElementById(`${href}`).scrollIntoView({ behavior: 'smooth' });
  } else if (e.target.classList.contains('nav__logo')) {
    headerEl.scrollIntoView({ behavior: 'smooth' });
  }
});

////////////////////////////////////
// HOOVERI

const navLinksEl = document.querySelectorAll('.nav__link');

const hover = (e, opacity) => {
  if (e.target.classList.contains('nav__link')) {
    navLinksEl.forEach(link => {
      if (link !== e.target) {
        link.style.opacity = opacity;
      }
    });
  }
};

navEl.addEventListener('mouseover', function (e) {
  hover(e, 0.5);
});

navEl.addEventListener('mouseout', function (e) {
  hover(e, 1);
});

//////////////////////////////////////
// OPERATIONS

const tabContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const contents = document.querySelectorAll('.operations__content');

tabContainer.addEventListener('click', function (e) {
  e.preventDefault();
  const click = e.target.closest('button');

  if (click) {
    const num = click.dataset.tab;

    tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
    click.classList.add('operations__tab--active');

    contents.forEach(content =>
      content.classList.remove('operations__content--active')
    );

    document
      .querySelector(`.operations__content--${num}`)
      .classList.add('operations__content--active');
  }
});

///////////////////////////////////////////
// STICKY NAV

const height = navEl.getBoundingClientRect().height;

const stickyNav = entries => {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    navEl.classList.add('sticky');
  } else {
    navEl.classList.remove('sticky');
  }
};

const observer = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${height}px`,
});

observer.observe(headerEl);

//////////////////////////////////////////////////
// REVEAL SECTIONS WHEN SCROLLING

const revealSection = (entries, observer) => {
  const [entry] = entries;

  if (entry.isIntersecting) {
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  }
};

const secObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(section => {
  //section.classList.add('section--hidden');
  secObserver.observe(section);
});

//////////////////////////////////////////////////
// REVEAL PICTURES

const allLazyImages = document.querySelectorAll('.features__img');

const revealImages = (entries, observer) => {
  const [entry] = entries;

  if (entry.isIntersecting) {
    entry.target.src = entry.target.dataset.src;
    entry.target.classList.remove('lazy-img');

    observer.unobserve(entry.target);
  }
};

const imgObserver = new IntersectionObserver(revealImages, {
  root: null,
  threshold: 0,
  rootMargin: '300px',
});

allLazyImages.forEach(img => {
  imgObserver.observe(img);
});

////////////////////////////////////////////77
// SLIDER

const sliderEl = document.querySelector('.slider');
const allSlides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

//sliderEl.style.transform = 'scale(0.7)';

let curSlide = 0;
let maxSlide = allSlides.length;

const createDots = function () {
  allSlides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

const activeDot = function (num) {
  document.querySelectorAll('.dots__dot').forEach(dot => {
    dot.classList.remove('dots__dot--active');
  });
  document
    .querySelectorAll('.dots__dot')
    [num].classList.add('dots__dot--active');
};

const goToSlide = function (s) {
  allSlides.forEach((slide, i) => {
    slide.style.transform = `translateX(${100 * (i - s)}%)`;
  });
};

const nextSlide = function () {
  if (curSlide === maxSlide - 1) curSlide = 0;
  else curSlide++;
  goToSlide(curSlide);
  activeDot(curSlide);
};

const previousSlide = function () {
  if (curSlide === 0) curSlide = maxSlide - 1;
  else curSlide--;
  goToSlide(curSlide);
  activeDot(curSlide);
};

const init = function () {
  createDots();
  goToSlide(curSlide);
  activeDot(curSlide);
};

init();

//////////////////////
// EVENT LISTENERS
btnRight.addEventListener('click', nextSlide);

btnLeft.addEventListener('click', previousSlide);

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const num = e.target.dataset.slide;
    goToSlide(num);
    activeDot(num);
  }
});
