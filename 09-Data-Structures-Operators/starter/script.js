'use strict';

/* const openingHours = {
  thu: {
    open: 12,
    close: 22,
  },
  fri: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0, // Open 24 hours
    close: 24,
  },
}; */

/* const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  openingHours,

  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery: function ({
    starterIndex = 0,
    mainIndex = 'ei löytynyt menusta',
    time = '20',
    address = 'nowhere',
  }) {
    console.log(
      `Order received!! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}. `
    );
  },

  orderPasta: function (en1, en2, en3) {
    console.log(`Here is your delicious pasta with ${en1}, ${en2} and ${en3}.`);
  },

  orderPizza: function (main, ...others) {
    console.log(main);
    console.log(others);
  },
}; */

/* const days = Object.keys(openingHours);
console.log(days);

let str = `We are open ${days.length} days in a week, which are: `;

for (const day of Object.keys(openingHours)) {
  str += `${day}, `;
}
console.log(str);
 */
/* const entries = Object.entries(openingHours);
console.log(entries);

for (const [day, { open, close }] of entries) {
  console.log(`On ${day} we are open at ${open} and close at ${close}`);
} */

//console.log(restaurant.openingHours?.fri?.open);

/* const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

for (const day of days) {
  const open = restaurant.openingHours[day]?.open ?? 'closed';

  console.log(`On ${day} we open at ${open}.`);
} */

//console.log(restaurant.open?.(0, 0) ?? 'Method doesnt exist!');

//const users = [{ name: 'Ville', email: 'ville26@hotmail.com' }];
//const users = [];
//console.log(users[0]?.name ?? 'Only one user!!');

/* const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (const [i, el] of menu.entries()) {
  console.log(`${i + 1}: ${el}`);
}

const arr = [2, 3, 4];
 */
/* restaurant.orderDelivery({
  time: '22.30',
  address: 'Calle de Caribaldi 12',
  mainIndex: 2,
  starterIndex: 2,
}); */

/* const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;

console.log(hours);

const {
  sat: { open, close } = 'ei löytynyt',
  fri: { open: a, close: b } = [],
  mon = 'ei löytynyt',
} = hours;

console.log(open);
console.log(close);
console.log(mon);
console.log(a, b); */

/* restaurant.orderDelivery({
  starterIndex: 3,
  mainIndex: 0,
  time: '19:25',
  address: 'Kalliontie 74',
});

const { starterMenu: menu } = restaurant;

const [, , a] = menu;

console.log(a); */

/* const newStarterMenu = [
  'Pasta Bolognese',
  ...restaurant.starterMenu,
  'Creek Salad',
]; */

/* console.log(newStarterMenu);

const allMenus = [...restaurant.starterMenu, ...restaurant.mainMenu];

console.log(...allMenus);

//Iterables: arrays, strings, maps, sets. NOT objects!!!

const str = 'Willy Downhouse';

const letters = [...str];

console.log(...letters); */

//restaurant.orderPasta('olives', 'clamps', 'mushrooms');

/* const ingredients = [
  prompt("Let's make pasta! Ingeredient 1?"),
  prompt('Ingeredient 2?'),
  prompt('Ingredient 3?'),
];

console.log(ingredients);

console.log(...ingredients);
restaurant.orderPasta(...ingredients); */

/* const newRestaurant = {
  ...restaurant,
  owner: 'Tony Montana',
  employees: ['juan', 'maria', 'carla'],
}; */

/* const wholeMenu = [...restaurant.mainMenu, ...restaurant.starterMenu];

const [a, ...others] = wholeMenu;

console.log(a, others);

const { sat, ...notAWeekend } = restaurant.openingHours;

console.log(sat, notAWeekend); */

/* const add = function (...list) {
  let sum = 0;
  for (let i = 0; i < list.length; i++) sum += list[i];
  console.log(sum);
}; */

/* add(2, 3, 4, 5, 6);
add(69, 2, 1, 4, -6, 4);
add(1, 2); */

/* const x = [13, 45, 12];

console.log(x);
console.log(...x);

add(...x); */

//restaurant.orderPizza('olives', 'mushrooms', 'eggs', 'shrimps', 'tuna');

/* const doesRestHaveGuestnUmObject =
  restaurant.guestNumber || 'there is no guestnum field';

console.log(doesRestHaveGuestnUmObject);
 */
/* console.log('' || 'toka' || 15);
console.log(undefined && 15);
console.log(23 && 'ville' && 'pena');

console.log(1 > 2 || undefined); */

/* const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },

  printGoals: function (...players) {
    for (let i = 0; i < players.length; i++) {
      console.log(players[i], i);
    }
  },
};
 */
/* const ordersSet = new Set([
  'Pizza',
  'pasta',
  'pizza',
  true,
  5,
  'pasta',
  true,
  5,
]);

const question = new Map([
  ['question', 'Whats the best programmin language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct 🤣'],
  [false, 'Try again 😎'],
]);

console.log(question); */

/* const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

console.log(question.get('question'));

for (const [key, value] of question) {
  if (typeof key === 'number') {
    console.log(key, value);
  }
}

const answer = Number(prompt('your answer:'));
console.log(answer);
console.log(question.get(answer === question.get('correct'))); */

/* const map = new Map();



map
  .set('name', 'timpan mesta')
  .set(true, 'We are open')
  .set(false, 'We are closed')
  .set('open', 12)
  .set('close', 23);

console.log(map);

const time = 11;
console.log(map.get(time >= map.get('open') && time <= map.get('close'))); */

/* time >= map.get('open') && time <= map.get('close')
  ? console.log(map.get(true))
  : console.log(map.get(false)); */

/* console.log(ordersSet);

console.log(new Set('ville'));

console.log(ordersSet.has('pizza'));
console.log(ordersSet.has(false));
ordersSet.add('lemon');
ordersSet.delete('pasta');
console.log(ordersSet);

for (const x of ordersSet) {
  console.log(x);
}

const arr = [2, 3, 4, 4, 7, 7, 8, 9];

const arr2 = new Set(arr);

console.log(arr2);
console.log(arr2.size);
console.log([...arr2]);

const word = [...new Set('ville')];
console.log(word);
console.log(word.length);
console.log(new Set('ville').size); */
//CODING CHALLENGE 2.

/* for (const [i, player] of game.scored.entries()) {
  console.log(`Goal ${i + 1}: ${player}`);
}

Odd of victory Bayern Munich: 1.33
Odd of draw: 3.25
Odd of victory Borrussia Dortmund: 6.5 

for (const [team, odd] of Object.entries(game.odds)) {
  const str = team === 'x' ? 'draw' : `victory ${game[team]}`;
  console.log(`Odd of ${str}: ${odd}`);
}

const scorers = {};

for (const player of game.scored) {
  scorers[player] ? scorers[player]++ : (scorers[player] = 1);
}
console.log(scorers);*/

/*let sum = 0;
let diveder = Object.values(game.odds);

for (const odd of Object.values(game.odds)) {
  sum += odd;
}
let avg = sum / diveder.length;
console.log(`Average of odds is ${avg}.`);*/

/* const [players1, players2] = game.players;

const [gk, ...fieldPlayers] = players1;
//console.log(gk);
//console.log(fieldPlayers)

const [gk2, ...fieldPlayers2] = players2;
//console.log(gk2);
//console.log(fieldPlayers2);

const allPlayers = [...players1, ...players2];
//console.log(allPlayers);

const players1Final = ['Thiago', 'Coutinho', 'Perisic', ...players1];
//console.log(players1Final);

console.log(game.odds);

const { team1, x: draw, team2 } = game.odds;
console.log(team1, draw, team2);

//const {odds: {team1, x:draw, team2}} = game;

const arr = [3, 4, 5];

game.printGoals(...game.scored);

console.log(game.odds.team1 < game.odds.team2 && game.team1); */

/* const gameEvents = new Map([
  [17, '⚽ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽ GOAL'],
  [80, '⚽ GOAL'],
  [92, '🔶 Yellow card'],
]);

const events = [...new Set(gameEvents.values())];
console.log(events);

gameEvents.delete(64);

//An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
let div = 0;

for (const key of gameEvents.keys()) {
  if (key <= 90) div++;
}

const avg = 90 / div;
console.log(`An event happened on average every ${avg} minutes.`);

for (const [min, event] of gameEvents) {
  const half = min <= 45 ? 'FIRST' : 'SECOND';
  console.log(`[${half} HALF] ${min}: ${event}`);
}
 */
// Array stä Setti

/* const arr = [2, 2, 2, 4, 4, 5];

const arrAsSet = new Set(arr);

console.log(arr);
console.log(arrAsSet);
console.log([...arrAsSet]); */

/* function isMiddleSeat(seat) {
  return seat.slice(-1) === 'b' || seat.slice(-1) === 'e'
    ? 'middle seat'
    : 'not a middle seat';
}

console.log(isMiddleSeat('23b'));

const str = 'tervetuloa';

console.log(str.slice(-3));
console.log(str.slice(1, 5));

console.log(str.indexOf('r'));
console.log(str.lastIndexOf('e'));

console.log(str.toLocaleUpperCase());

const passenger = 'viLLe';

const passengerToLower = passenger.toLowerCase();

const passnegerCorrect =
  passengerToLower[0].toUpperCase() + passengerToLower.slice(1);

console.log(passnegerCorrect);

const email = '  VilLe.26@HOTmail.com   \n';

const fixedEmail = email.toLowerCase().trim();
console.log(email);
console.log(fixedEmail);

const priceGB = '197,45£';
const priceUS = priceGB.replace('£', '$').replace(',', '.');

console.log(priceUS);
const announcement = 'Please come to the door 24! door 24 sir!';

console.log(announcement.replace(/door/g, 'gate'));

function capitalizeName(name) {
  const arr = name.split(' ');
  const ne = [];
  for (const n of arr) {
    const nameLower = n.toLowerCase();

    const final = nameLower[0].toUpperCase() + nameLower.slice(1);

    ne.push(final);
  }
  return ne.join(' ');
}

console.log(...'dddd');

console.log(capitalizeName('jessica aNN smith DAVIS'));

console.log(capitalizeName('ville alatalo'));

console.log(capitalizeName('villE alATALo'));
 */

/*
undercore_case
  first_name
Some_Variable  
   calculate_AGE
delayed_departure
*/

/* document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

const buttonEl = document.querySelector('button');
const textAreaEl = document.querySelector('textarea');
//let x = document.querySelector('textarea').value;

buttonEl.addEventListener('click', function () {
  let inputToArray = document.querySelector('textarea').value.split('\n');

  for (let i = 0; i < inputToArray.length; i++) {
    //console.log(word);
    const [first, second] = inputToArray[i].toLowerCase().trim().split('_');

    const firstToLower = first.toLowerCase();
    const secondToLower = second.toLowerCase();

    const secondtoCamel =
      secondToLower[0].toUpperCase() + secondToLower.slice(1);

    const final = firstToLower + secondtoCamel;

    console.log(final.padEnd(20, ' ') + '✅'.repeat(i + 1));
  }
}); */

/* function underscoreToCamel(text) {
  const trimmed = text.trim();
  const [first, second] = trimmed.split('_');

  const firsttoLower = first.toLowerCase();
  const secondtoLower = second.toLowerCase();

  const secondtoCamel = secondtoLower[0].toUpperCase() + secondtoLower.slice(1);

  const final = firsttoLower + secondtoCamel;
  return final;
} */

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
};
