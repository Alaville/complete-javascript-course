'use strict';

/* const Person = function (fullName, birthYear) {
  this.fullName = fullName;
  this.birthYear = birthYear;
};

const ville = new Person('Ville', 1984);
console.log(ville);

console.log(ville instanceof Person);

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

ville.calcAge();

Person.prototype.species = 'Homo Sapiens';

console.log(ville.species);
console.log(ville);

console.log(ville.hasOwnProperty('fullName'));
console.log(ville.hasOwnProperty('species'));

console.log(ville.__proto__.__proto__.isPrototypeOf(Person));

console.log(new Array());

const arr = [2, 2, 4, 6, 6, 6, 8, 3];

Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique(arr)); */

/* const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  console.log(this.make + ' is going at ' + (this.speed + 10) + 'km/h');
};

Car.prototype.break = function () {
  console.log(this.make + ' is going at ' + (this.speed - 5) + 'km/h');
};

const bmw = new Car('bmw', 120);
const mersu = new Car('mercedez benz', 95);

bmw.accelerate();
bmw.break();
console.log('____________________________');
mersu.accelerate();
mersu.break();
 */

//console.log(ville);  ei toimi, classes are NOT hoisted

/* class Person {
  constructor(fullName, birthyear) {
    this.fullName = fullName;
    this.birthyear = birthyear;
  }

  //INSTANCE METHODS
  calcAge() {
    console.log(2037 - this.birthyear);
  }

  greet() {
    console.log('Ciao!');
  }

  get firstName() {
    return this.fullName.split(' ')[0];
  }

  set fullName(name) {
    if (name.includes(' ')) {
      this._fullName = name;
    } else {
      alert(`${name} is not a full name`);
    }
  }

  get fullName() {
    return this._fullName;
  }

  //STATIC METHOD
  static hey() {
    console.log('hei ✌');
  }
}
 */
// Person.prototype.greet = function () {
//     console.log('Ciao!');
// };

/* const ville = new Person('Ville Alatalo', 1984);
console.log(ville);
Person.hey() */
/* ville.calcAge();

ville.greet();
console.log(ville.firstName); */

/* const account = {
  owner: 'ville',
  movements: [23, 300, 478],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

console.log(account.latest);

account.latest = 4000;

console.log(account.movements);
 */

/* class Car {
  constructor(brand, speed) {
    this.brand = brand;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.brand} goes ${this.speed} km/h. ✌`);
  }

  break() {
    this.speed -= 5;
    console.log(`${this.brand} goes ${this.speed} km/h. ✌`);
  }

  get speedUS() {
    return `${Math.trunc(this.speed / 1.6)} mi/h`;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const ford = new Car('Ford', 120);

ford.accelerate();
ford.accelerate();

ford.break();

console.log(ford.speedUS);

ford.speedUS = 100;

console.log(ford); */

/* const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};

//Linkin prototypes

Student.prototype = Object.create(Person.prototype);

Student.prototype.introduction = function () {
  console.log(`My name is ${this.firstName} and i am studying ${this.course}.`);
};

const mike = new Student('mike', 2019, 'Computer science');

console.log(mike);
mike.introduction();
mike.calcAge();
 */

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(this.make + ' is going at ' + this.speed + 'km/h');
};

Car.prototype.break = function () {
  this.speed -= 5;
  console.log(this.make + ' is going at ' + this.speed + 'km/h');
};

const Ev = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

Ev.prototype = Object.create(Car.prototype);

Ev.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

Ev.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}.`
  );
};

const tesla = new Ev('tesla', 120, 23);
console.log(tesla);
tesla.accelerate();
tesla.chargeBattery(90);
console.log(tesla);
tesla.break();
tesla.accelerate();
