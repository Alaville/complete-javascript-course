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
  //section.classList.add('section--hidden');
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

/////////////////// slider

const sliderEl = document.querySelector('.slider');
const allSlides = document.querySelectorAll('.slide');
const dots = document.querySelector('.dots');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

//tämä vain että on helpompi nähdä kuvat
// sliderEl.style.transform = 'scale(0.5)';
// sliderEl.style.overflow = 'visible';

//joonaksen versio
allSlides.forEach(
  (slide, i) => (slide.style.transform = `translateX(${100 * i}%)`)
);
let curSlide = 0;
const maxSlide = allSlides.length;

const goToSLide = function (s) {
  allSlides.forEach(
    (slide, i) => (slide.style.transform = `translateX(${100 * (i - s)}%)`)
  );
};

goToSLide(0);

const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSLide(curSlide);
};

const previousSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }

  goToSLide(curSlide);
};

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', previousSlide);
// oma eka versio
//eka slide näkyviin
/* allSlides.forEach(slide => slide.classList.add('hidden'));
document.querySelector('.slide--1').classList.remove('hidden');

//dots näkyviin
dots.classList.add('dots__dot');
dots.classList.add('dots__dot--active');

let num = 1;

sliderEl.addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('slider__btn--right')) {
    num++;
    if (num === 4) num = 1;

    allSlides.forEach(slide => slide.classList.add('hidden'));
    document.querySelector(`.slide--${num}`).classList.remove('hidden');
  } else if (e.target.classList.contains('slider__btn--left')) {
    num--;
    if (num === 0) num = 3;

    allSlides.forEach(slide => slide.classList.add('hidden'));
    document.querySelector(`.slide--${num}`).classList.remove('hidden');
  } else if (e.target.classList.contains('dots')) {
    console.log('dot pressed');
  }
});
 */
