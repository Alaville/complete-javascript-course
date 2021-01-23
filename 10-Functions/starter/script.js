'use strict';

/* const bookings = [];

const createBooking = function (flightNum, numPassengers = 0, price = 199) {
  //ES 5 way of set default value
  //numPassengers = numPassengers || 0;
  //price = price || 199;

  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};


 */

/* const flight = 'AY375';
const ville = {
  name: 'Ville Alatalo',
  passport: 345532179,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'AY777';
  passenger.name = 'Mr.' + passenger.name;

  if (passenger.passport === 345532179) {
    alert('Checked in!');
  } else {
    alert('Wrong passport!');
  }
};

checkIn(flight, ville);
console.log(flight, ville);

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 10000);
};

newPassport(ville);
checkIn(flight, ville);
console.log(ville);
 */

/* const oneWord = function (str) {
  //return str.trim().toLowerCase();
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Modified String: ${fn(str)}`);
};

transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord); */

/* const greeting = function (greet) {
  return function (name) {
    console.log(`${greet} ${name}`);
  };
};

const greet = greeting('Ciao!');

greet('Ville');
greet('Fanni'); */

/* const greeting = greet => name => console.log(`${greet} ${name}`);

greeting('Hola')('Miranda!'); */

/* const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a flight on ${this.airline} and flightnumber is ${this.iataCode}${flightNum}.`
    );

    this.bookings.push({
      flight: `${this.iataCode}${flightNum}`,
      name: `${name}`,
    });
  },
};

lufthansa.book('123', 'Ville Alatalo');
lufthansa.book(755, 'Fanni Alavuotunki');

console.log(lufthansa.bookings);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const finnair = {
  airline: 'Finnair',
  iataCode: 'FIN',
  bookings: [],
};

//Kopioi metodin lutfhansa objektilta
const book = lufthansa.book;

//Käytä toisen objektin metodia call tai bind metodilla
//CALL method
book.call(eurowings, '345', 'Milla Alavuotunki');
book.call(eurowings, 112, 'Masa Köyri');
console.log(eurowings.bookings);

book.call(finnair, 666, 'Kai Nieminen');

//BIND method, kaikille yhtiöille oma book metodi
const bookFIN = book.bind(finnair);
const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);

//Bind metodi tietylle lennolle
const bookFIN122 = book.bind(finnair, 122);

bookFIN122('Matti Meikälainen');
bookFIN122('Aleksi Alavuotunki');

console.log(finnair.bookings);

//with event listeners

lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  this.planes++;
  console.log(this.planes);
};

document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

//document.querySelector('.poll').addEventListener('click');

//Partial application
const addTax = (rate, value) => value + value * rate;

console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23);

console.log(addVAT(100));
 */

/* const poll = {
  question: 'What is your favorite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  answers: [0, 0, 0, 0],

  registerNewAnswer() {
    const answer = Number(
      prompt(`${this.question} \n${this.options.join('\n')}`)
    );

    if (answer >= 0 && answer < this.options.length) {
      this.answers[answer]++;
    } else {
      console.log('Not a valid answer!');
    }

    this.displayResults('string');
    this.displayResults('array');
  },

  displayResults(type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    } else if (type === 'string') {
      let str = 'Poll results are ';

      for (let i = 0; i < this.answers.length; i++) {
        str += ` ${this.answers[i]},`;
      }
      console.log(str);
    }
  },
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

poll.displayResults.call({ answers: [5, 2, 3] }, 'string');
poll.displayResults.call({ answers: [5, 2, 3, 9, 32, 77, 12, 1] }); */

//kerran käytettävät funktiot
/* (function () {
  for (let i = 0; i < 4; i++) {
    console.log(i);
  }
})();

//Arrow funktio
(() => console.log('tällanenki toimii'))();

{
  const isPrivate = 'Ville';

  console.log(isPrivate);
} */

//console.log(isPrivate); ei toimi täällä

/* const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(passengerCount);
  };
};

const funk = secureBooking();
funk();
funk(); */

/* let f;

const a = function () {
  const b = 15;
  f = function () {
    console.log(b * 2);
  };
};

const h = function () {
  const c = 300;
  f = function () {
    console.log(c * 2);
  };
};

a();
f();

h();
f();

console.log(f);

const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(
      `There are 3 groups and each group has ${perGroup} passengers.`
    );
  }, wait * 1000);

  console.log(`Will satrt boarding in ${wait} seconds.`);
};

boardPassengers(50, 5);


 */

/* (function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
 */
/* document.querySelector('body').addEventListener('click', function () {
  header.style.color = 'blue';
}); */
