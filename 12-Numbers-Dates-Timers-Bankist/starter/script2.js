'use strict';

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2021-01-11T23:36:17.929Z',
    '2021-01-13T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',

    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//FUNCTIONS

//formatted currency
const formattedCurrency = (value, currency, locale) => {
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

//create usernames
const createUsernamesAndBalance = accounts => {
  accounts.forEach(account => {
    account.username = account.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUsernamesAndBalance(accounts);

//modify date
const modifyDate = date => {
  const x = new Date(date);
  const day = String(x.getDate()).padStart(2, 0);
  const month = String(x.getMonth() + 1).padStart(2, 0);
  const year = String(x.getFullYear()).padStart(2, 0);

  return `${day}/${month}/${year}`;
};

const countDays = (date1, date2) =>
  Math.abs(date1 - date2) / (1000 * 60 * 60 * 24);

//display movements
const displayMovements = (acc, sorted = false) => {
  containerMovements.innerHTML = '';

  const movs = sorted
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const modifiedMov = Math.floor(mov).toFixed(2);

    const date = modifyDate(acc.movementsDates[i]);

    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__date">${date}</div>
    <div class="movements__value">${modifiedMov}€</div>
  </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

//display balance
const displayBalance = acc => {
  acc.balance = acc.movements.reduce((acc, value) => acc + value);
  labelBalance.textContent = `${acc.balance} 💶`;
};

//display summary
const displaySummary = acc => {
  const income = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, value) => acc + value);
  labelSumIn.textContent = `${income.toFixed(2)}`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, value) => acc + value);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * acc.interestRate) / 100)
    .reduce((acc, value) => acc + value);
  labelSumInterest.textContent = `${interest.toFixed(2)}`;
};

//update UI
const updateUI = acc => {
  displayMovements(acc);
  displayBalance(acc);
  displaySummary(acc);
};

let timer;
const displayTimer = () => {
  const tick = () => {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    labelTimer.textContent = `${min}:${sec}`;

    if (time === 0) {
      containerApp.style.opacity = 0;
      labelWelcome.textContent = 'Log in to get started';
      clearInterval(timer);
    }
    time--;
  };

  let time = 120;
  tick();
  timer = setInterval(tick, 1000);
};
