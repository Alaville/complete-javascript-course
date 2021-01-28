'use strict';

const btnsShowModal = document.querySelectorAll('.btn--show-modal');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsShowModal.forEach(btn => {
  btn.addEventListener('click', openModal);
});

overlay.addEventListener('click', closeModal);

btnCloseModal.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  e.preventDefault();

  if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
});

//learn more button smooth scroll

const section1 = document.getElementById('section--1');
const btnScrollTo = document.querySelector('.btn--scroll-to');

btnScrollTo.addEventListener('click', function (e) {
  e.preventDefault();

  section1.scrollIntoView({ behavior: 'smooth' });
});

//////////////////////////////////////page navigation smooth

const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav__links');

nav.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    e.target.classList.contains('nav__link') &&
    !e.target.classList.contains('btn--show-modal')
  ) {
    const href = e.target.getAttribute('href').slice(1);
    document.getElementById(`${href}`).scrollIntoView({ behavior: 'smooth' });
  } else if (e.target.classList.contains('nav__logo')) {
    document.querySelector('.header').scrollIntoView({ behavior: 'smooth' });
  }
});

//////////// operations

const container = document.querySelector('.operations__tab-container');
const contents = document.querySelectorAll('.operations__content');
const btns = document.querySelectorAll('.operations__tab');

container.addEventListener('click', function (e) {
  e.preventDefault();

  const click = e.target.closest('button');

  if (click) {
    btns.forEach(btn => btn.classList.remove('operations__tab--active'));

    click.classList.add('operations__tab--active');

    contents.forEach(content =>
      content.classList.remove('operations__content--active')
    );

    const datatab = click.getAttribute('data-tab');

    document
      .querySelector(`.operations__content--${datatab}`)
      .classList.add('operations__content--active');
  }
});

///////////////////////////////

const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const siblings = e.target.closest('nav').querySelectorAll('.nav__link');

    siblings.forEach(el => {
      if (el !== e.target) {
        el.style.opacity = opacity;
      }
    });
  }
};

nav.addEventListener('mouseover', function (e) {
  e.preventDefault();
  handleHover(e, 0.5);
});

nav.addEventListener('mouseout', function (e) {
  e.preventDefault();
  handleHover(e, 1);
});

//////////////////////////////////

const nacHeight = nav.getBoundingClientRect().height;

const header = document.querySelector('header');

const stickyNav = function (entries) {
  const [a] = entries;

  if (!a.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const observer = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${nacHeight}px`,
});

observer.observe(header);

////////////////////////////// revealing section on scroll
const sections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (entry.isIntersecting) {
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  }
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

sections.forEach(section => {
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});

//////////////////////////////lazy loading images
//const allLazyImages = document.querySelectorAll('img[data-src]');
const allLazyImages = document.querySelectorAll('.features__img');

/* allLazyImages.forEach(image => {
  image.classList.remove('lazy-img');
}); */

const revealImages = function (entries, observer) {
  const [entry] = entries;
  if (entry.isIntersecting) {
    entry.target.src = entry.target.dataset.src;

    entry.target.addEventListener('load', function () {
      entry.target.classList.remove('lazy-img');
    });

    observer.unobserve(entry.target);
  }
};

const imgObserver = new IntersectionObserver(revealImages, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

allLazyImages.forEach(image => imgObserver.observe(image));

/////////////////// SLIDER

const sliderEl = document.querySelector('.slider');
const allSlides = document.querySelectorAll('.slide');
const dotContainer = document.querySelector('.dots');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

let curSlide = 0;
const maxSlide = allSlides.length;
///////////////////////////////////////////////////

/// FUNCTIONS
const createDots = function () {
  allSlides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

const goToSLide = function (s) {
  allSlides.forEach(
    (slide, i) => (slide.style.transform = `translateX(${100 * (i - s)}%)`)
  );
};

const activeDot = num => {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));
  document
    .querySelectorAll('.dots__dot')
    [num].classList.add('dots__dot--active');
};

const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSLide(curSlide);
  activeDot(curSlide);
};

const previousSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }

  goToSLide(curSlide);
  activeDot(curSlide);
};

const init = function () {
  createDots();
  goToSLide(0);
  activeDot(curSlide);
};

init();

//////////////////////////////////////////////////////////
// EVENT HANDLERS

//buttons right and left
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', previousSlide);

// keys right and left
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') {
    nextSlide();
  }
  if (e.key === 'ArrowLeft') {
    previousSlide();
  }
});

// dots
dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const slideNum = e.target.getAttribute('data-slide');
    goToSLide(slideNum);
    activeDot(slideNum);
  }
});

////////////////////////////////////////////
// LIFECYCLE DOM EVENTS

// document.addEventListener('DOMContentLoaded', function (e) {
//   console.log(e);
// });

// window.addEventListener('load', function (e) {
//   console.log('loaded');
//   console.log(e);
// });

// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// });
