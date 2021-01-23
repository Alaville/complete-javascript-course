'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const account5 = {
  owner: 'Fanni Alavuotunki',
  movements: [430, 1000, 700, 50],
  interestRate: 1,
  pin: 3006,
};

const accounts = [account1, account2, account3, account4, account5];

/* const balanceAllCountsMOvements = accounts
  .flatMap(account => account.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(balanceAllCountsMOvements); */

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

const createUserNames = accounts => {
  accounts.forEach(account => {
    account.username = account.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUserNames(accounts);
console.log(accounts);

const createBalance = accounts => {
  accounts.forEach(account => {
    account.balance = account.movements.reduce((acc, value) => acc + value, 0);
  });
};

createBalance(accounts);

const displayMovements = (account, sorted = false) => {
  containerMovements.innerHTML = '';

  const movs = sorted
    ? account.movements.slice().sort((a, b) => a - b)
    : account.movements;

  movs.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${mov}</div>
  </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

displayMovements(account1);

const displayBalance = account => {
  const balance = account.movements.reduce((acc, value) => acc + value);
  labelBalance.textContent = balance;
};

displayBalance(account1);

//DISPLAY SUMMARY

const displaySummary = account => {
  const deposit = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = deposit;
  const withdrawals = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = Math.abs(withdrawals);

  const interest = account.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * account.interestRate) / 100)
    .reduce((acc, value) => acc + value, 0);

  labelSumInterest.textContent = Math.trunc(interest);
};

displaySummary(account1);

let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  const username = inputLoginUsername.value;
  const pin = Number(inputLoginPin.value);

  currentAccount = accounts.find(account => account.username === username);

  if (currentAccount.pin === pin) {
    displayMovements(currentAccount);
    displayBalance(currentAccount);
    displaySummary(currentAccount);
    containerApp.style.opacity = 100;

    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(' ')[0]
    }!✌😎`;
  }

  inputLoginUsername.value = '';
  inputLoginPin.value = '';
  inputLoginPin.blur();
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const transferTo = inputTransferTo.value;
  const amount = Number(inputTransferAmount.value);

  const user = accounts.find(account => account.username === transferTo);

  if (amount > 0 && amount <= currentAccount.balance) {
    user.movements.push(amount);
    currentAccount.movements.push(-amount);
  }
  displayMovements(currentAccount);
  displayBalance(currentAccount);
  displaySummary(currentAccount);

  inputTransferTo.value = inputTransferAmount.value = '';
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const loan = Number(inputLoanAmount.value);

  if (loan > 0 && currentAccount.movements.some(mov => mov >= loan * 0.1)) {
    currentAccount.movements.push(loan);
  }

  displayMovements(currentAccount);
  displayBalance(currentAccount);
  displaySummary(currentAccount);

  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  const user = inputCloseUsername.value;
  const pin = Number(inputClosePin.value);

  if (currentAccount.username === user && currentAccount.pin === pin) {
    console.log('täsmää');
    containerApp.style.opacity = 0;
    labelWelcome.textContent = 'Log in to get started';
    const index = accounts.indexOf(currentAccount);
    console.log(index);
    accounts.splice(index, 1);
  }
  console.log(accounts);
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();

  displayMovements(currentAccount, !sorted);
  console.log(currentAccount);

  sorted = !sorted;
});

//LUODAAN KÄYTTÄJÄNIMET
/* function createUserNames(accounts) {
  accounts.forEach(function (account) {
    account.username = account.owner
      .toLowerCase()
      .split(' ')
      .map(nimi => nimi[0])
      .join('');
  });
}

createUserNames(accounts);

//NOSTOT JA TALLETUKSET NÄKYVIIN

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}</div>
      </div>  
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

//TILIN SALDO NÄKYVIIN
const calcDisplayBalance = function (account) {
  account.balance = account.movements.reduce((acc, cur) => acc + cur, 0);
  return (labelBalance.textContent = `${account.balance} 💶`);
};

//SUMMARY NÄKYVIIN
const displaySummary = function (account) {
  const inValue = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${inValue} 💶`;

  const outValue = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumOut.textContent = `${Math.abs(outValue)} 💶`;

  const interest = account.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * account.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = `${interest} 💶`;
};

//EVENT HANDLERS

//LOG IN
let currentAccount;
let originalMovements;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    account => account.username === inputLoginUsername.value
  );

  //COPY OF MOVEMENTS LIST

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    containerApp.style.opacity = 100;

    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(' ')[0]
    } 😎✌`;

    updateUiNumbers();

    inputLoginPin.value = inputLoginUsername.value = '';
    inputLoginPin.blur();
  }
});









//TRANSFERS
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const transferToWho = accounts.find(
    account => account.username === inputTransferTo.value
  );

  if (
    amount > 0 &&
    amount <= currentAccount.balance &&
    transferToWho &&
    currentAccount.username !== transferToWho?.username
  ) {
    transferToWho.movements.push(amount);
    currentAccount.movements.push(-amount);

    updateUiNumbers();
  }
  inputTransferAmount.value = inputTransferTo.value = '';
});

//LOAN
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  let amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);
  }
  updateUiNumbers();

  inputLoanAmount.value = '';
});

//CLOSE
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  const user = inputCloseUsername.value;
  const pin = Number(inputClosePin.value);

  if (currentAccount.username === user && currentAccount.pin === pin) {
    const indeksi = accounts.findIndex(
      account => account.username === user && account.pin === pin
    );
    accounts.splice(indeksi, 1);
    labelWelcome.textContent = 'Log in to get started';
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

//SORTED BUTTON
let sorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();

  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
 */
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/* function updateUiNumbers() {
  calcDisplayBalance(currentAccount);
  displayMovements(currentAccount.movements);
  displaySummary(currentAccount);
} */
/////////////////////////////////////////////////

//ASCENDIN ORDER
/* movements.sort((a, b) => {
  if (a > b) return 1;
  if (a < b) return -1;
});
movements.sort((a, b) => a - b);

console.log(movements);

//DECENDIN ORDER
movements.sort((a, b) => {
  if (a < b) return 1;
  if (a > b) return -1;
});

movements.sort((a, b) => b - a);
console.log(movements);*/

//SLICE
/* console.log(arr.slice(2));
console.log(arr.slice(0, 2));
console.log(arr.slice(-1));
console.log(arr.slice(-2)); */

//SPLICE
//console.log(arr.splice(2));
//console.log(arr);
//console.log(arr.splice(-1));
//console.log(arr.splice(1, 2));
//console.log(arr);

//REVERSE
/* console.log(arr.reverse());
console.log(arr); */

//CONCAT
/* console.log(arr.concat(arr2));
console.log([...arr, ...arr2]);
 */

//JOIN
/* console.log(arr.join('\n'));
console.log(arr2.join(', ')); */

/* for (const movement of movements) {
  if (movement > 0) {
    console.log(`You deposit ${movement} euros.`);
  } else {
    console.log(`You withdrew ${Math.abs(movement)} euros`);
  }
} */

/* movements.forEach(function (movement, index, arr) {
  if (movement > 0) {
    console.log(`Movement: ${index + 1} you deposit ${movement} euros.`);
  } else {
    console.log(
      `Movement: ${index + 1} you withdrew ${Math.abs(movement)} euros`
    );
  }
}); */

//CODING CHALLENGE ONE
/* const dogsJulia = [3, 5, 2, 12, 7];
const dogsKate = [4, 1, 15, 8, 3];

console.log(dogsJulia);
const checkDogs = function (julias, kates) {
  const modifiedJulias = julias.slice(1, julias.length - 2);
  console.log(julias);

  const juliasAndKatesFinal = [...modifiedJulias, ...kates];

  console.log(juliasAndKatesFinal);

  juliasAndKatesFinal.forEach(function (age, i) {
    if (age >= 3) {
      console.log(
        `Dog number ${i + 1} is an adult, and it is ${age} years old.`
      );
    } else {
      console.log(`Dog number ${i + 1} is a puppy 🐶`);
    }
  });
};

checkDogs(dogsJulia, dogsKate); */

//MAP METHOD
//const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//const eurToUsd = 1.1;

/* const movementsToUsD = movements.map(function(mov){
      return mov * eurToUsd;
}); */

/* const movementsToUsD = movements.map(mov => mov * eurToUsd);

console.log(movements);
console.log(movementsToUsD);

*/

/* movements.map(function (mov, i) {
  console.log(
    `Movement ${i + 1}: ${mov} euros is ${mov * eurToUsd} us dollars.`
  );
});

movements.map((mov, i) =>
  console.log(
    `Movement ${i + 1}: ${mov} euros is ${mov * eurToUsd} us dollars.`
  )
); 
 */

// FINDING MAX VALUE WITH REDUCE METHOD
/* const max = movements.reduce((acc, mov) => {
  if (acc > mov) {
    return acc;
  } else {
    return mov;
  }
}, movements[0]);

console.log(max); */

// CODING CHALLENGE #2
/* const calcHumanAges = function (ages) {
  const humanAges = ages.map(age => {
    if (age <= 2) {
      return age * 2;
    } else {
      return 16 + age * 4;
    }
  });
  console.log(humanAges);

  const adultDogs = humanAges.filter(age => age >= 18);
  console.log(adultDogs);

  const avg = adultDogs.reduce(function (acc, age, i, arr) {
    return acc + age / arr.length;
  }, 0);

  console.log(avg);
};

calcHumanAges([5, 2, 4, 1, 15, 8, 3]);
calcHumanAges([16, 6, 10, 5, 6, 1, 4]);
 */

// SAMA LAADUKKAASTI

/* const calcHumanAges = ages => {
  const humanAgesAvg = ages
    .map(age => (age <= 2 ? age * 2 : 16 + age * 4))
    .filter(age => age > 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

  console.log(humanAgesAvg);
};

calcHumanAges([5, 2, 4, 1, 15, 8, 3]);
calcHumanAges([16, 6, 10, 5, 6, 1, 4]);
 */

//FIND ETSII ENSIMMÄISEN EHDOT TÄYTTÄVÄN ARVON JA PALAUTTAA SEN
/* console.log(movements);

const firstWithdrawal = movements.find(mov => mov < 0);
console.log(firstWithdrawal);

console.log(accounts);

const user = accounts.find(account => account.pin === 2222);
console.log(user); */

//CREATE A LIST
/* const randomDiceRolls = Array.from({ length: 15 }, () =>
  Math.trunc(Math.random() * 6 + 1)
);
console.log(randomDiceRolls); */

/* labelBalance.addEventListener('click', function () {
  const movementUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent)
  );
  console.log(movementUI);
}); */

/* const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
]; */

//JOONAKSEN VERSIO
/* dogs.forEach(dog => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)));
console.log(dogs);

const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(dogSarah);

console.log(
  `Sarah dog is eating too ${
    dogSarah.curFood > dogSarah.recFood ? 'much' : 'little'
  }`
);

const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recFood)
  .map(dog => dog.owners)
  .flat();
const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recFood)
  .flatMap(dog => dog.owners);
//.flat();

console.log(ownersEatTooMuch);
console.log(ownersEatTooLittle);

console.log(`${ownersEatTooMuch.join(' and ')}'s dogs are eating too much.`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little.`);

console.log(dogs.some(dog => dog.curFood === dog.recFood));

const okAmount = dogs.filter(
  dog => dog.curFood >= dog.recFood * 0.9 && dog.curFood <= dog.recFood * 1.1
);
console.log(okAmount);

const newDogs = dogs.slice().sort((a, b) => a.recFood - b.recFood);

console.log(newDogs);
console.log(dogs); */
/*
dogs.forEach(function (dog) {
  //RECOMMENDED FOOD TEHTÄVÄ 1.
  dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28);

  //TEHTÄVÄ 2. SARAH KOIRA
  

  dog.owners.forEach(function (name) {
    if (name === 'Sarah') {
      if (dog.curFood < dog.recommendedFood * 0.9) {
        console.log(
          `${name} dog weights ${dog.weight} and it is eating too little! 😎`
        );
      } else if (dog.curFood > dog.recommendedFood * 1.1) {
        console.log(
          `${name} dog weights ${dog.weight} and it is eating too much! ✌`
        );
      } else {
        console.log(
          `${name} dog weights ${dog.weight} and it is eating OK! 🐶😜`
        );
      }
    }
  });

  //LIST OF OWNERS TEHTÄVÄ 3.
  if (dog.curFood < dog.recommendedFood * 0.9)
    ownersEatTooLittle.push(...dog.owners);
  if (dog.curFood > dog.recommendedFood * 1.1)
    ownersEatTooMuch.push(...dog.owners);
});
//TEHTÄVÄ 4.
console.log(ownersEatTooLittle);
console.log(
  `Dog owners whose dog eat too little are ${ownersEatTooLittle.join(' and ')}.`
);
console.log(ownersEatTooMuch);
console.log(
  `Dog owners whose dog eat too much are ${ownersEatTooMuch.join(', ')}.`
);

console.log('_________________________');

//TEHTÄVÄ 5
console.log(dogs.some(dog => dog.curFood === dog.recommendedFood));

//TEHTÄVÄ 6
console.log(
  dogs.some(
    dog =>
      dog.curFood >= dog.recommendedFood * 0.9 &&
      dog.curFood <= dog.recommendedFood * 1.1
  )
);

//TEHTÄVÄ 7
/* const arr7 = Array.from(
  dogs,
  dog =>
    dog.curFood >= dog.recommendedFood * 0.9 &&
    dog.curFood <= dog.recommendedFood * 1.1
);
console.log(arr7); */

/* let arr = [];
dogs.forEach(function (dog) {
  if (
    dog.curFood >= dog.recommendedFood * 0.9 &&
    dog.curFood <= dog.recommendedFood * 1.1
  )
    arr.push(dog);
});
console.log(arr);

//TEHTÄVÄ 8

const newDogs = dogs.slice();
console.log(newDogs);

newDogs.sort((dog1, dog2) => dog1.weight - dog2.weight);

console.log(newDogs);

console.log('__________________________________________');
 */

//1.
/* const fill = (length, value) => Array.from({ length: length }, () => value);

console.log(fill(4, 'a'));

//2.
const arr = [1, 2, 3];
const reverse = arr => {
  const reversed = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    reversed.push(arr[i]);
  }
  return reversed;
};

console.log(reverse(arr));
console.log(arr);

//3.
const data = [0, 1, false, 2, undefined, '', 3, null];

const compact = arr => {
  const compacted = [];
  for (const el of arr) {
    if (Boolean(el) !== false) {
      compacted.push(el);
    }
  }
  return compacted;
};

console.log(compact(data));

//4.
const data2 = [
  ['a', 1],
  ['b', 2],
];

const fromPairs = arr =>
  arr.reduce((acc, value) => {
    if (Array.isArray(value)) {
      acc[value[0]] = value[1];
    }
    return acc;
  }, {});

console.log(fromPairs(data2)); */
//5.

/* const data3 = [1, 2, 3, 1, 2];

const without = (arr, ...args) => {

  for (let i = 0; i < args.length; i++) {
    arr = arr.filter(el => el !== args[i]);
  }
  return arr;
};

console.log(without(data3, 1, 2)); // [3]
 */
//6.
/* const data = [1, 2, 1, 2, 3];

const unique = arr => {
  return Array.from(new Set(arr));
};

console.log(unique(data)); // [1, 2, 3] */
//7.

/* const isEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    return false;
  }

  const compared = arr1.map((el, index) => arr2[index] === el);

  return !compared.includes(false);
};

console.log(isEqual(arr1, arr2)); // true
console.log(isEqual(arr1, arr3)); // false
console.log(isEqual(arr1, arr4)); // false */

/* const data = [1, 2, [3, 4, [5]]];

const flatten = arr =>
  arr.reduce(
    (acc, value) => acc.concat(Array.isArray(value) ? flatten(value) : value),
    []
  );
console.log(flatten(data)); // [1, 2, 3, 4, 5] */

//const flatten = (array) => array.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatten(val) : val), []);
