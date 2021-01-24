'use strict';

const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');

const openModal = () => {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => {
  btn.addEventListener('click', openModal);
});

overlay.addEventListener('click', closeModal);
btnCloseModal.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//Smooth scroll to features

const section1 = document.getElementById('section--1');
const btnScrollTo = document.querySelector('.btn--scroll-to');

btnScrollTo.addEventListener('click', function (e) {
  e.preventDefault();
  section1.scrollIntoView({ behavior: 'smooth' });
});

//smooth scrolling

const navLinksEl = document.querySelectorAll('.nav__links');

navLinksEl.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    if (
      e.target.classList.contains('nav__link') &&
      !e.target.classList.contains('nav__link--btn')
    ) {
      const href = e.target.getAttribute('href').slice(1);

      document.getElementById(`${href}`).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

//operation tab container

const tabsContainer = document.querySelector('.operations__tab-container');
const opContent = document.querySelectorAll('.operations__content');
const tabs = document.querySelectorAll('.operations__tab');

tabsContainer.addEventListener('click', function (e) {
  e.preventDefault();
  const click = e.target.closest('button');

  if (click) {
    tabs.forEach(tab => tab.classList.remove('operations__tab--active'));

    opContent.forEach(content =>
      content.classList.remove('operations__content--active')
    );

    click.classList.add('operations__tab--active');

    const datatab = click.getAttribute('data-tab');

    document
      .querySelector(`.operations__content--${datatab}`)
      .classList.add('operations__content--active');
  }
});
