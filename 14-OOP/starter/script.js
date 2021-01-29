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

/* const Car = function (make, speed) {
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
 */

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

class Student extends Person {
  constructor(fullName, birthyear, course) {
    super(fullName, birthyear);
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}.`);
  }
}

const jake = new Student('jake smith', 2010, 'Arts');
const fanni = new Person('Fanni A', 2006);

jake.introduce();
jake.calcAge();
console.log(jake.fullName);
jake.greet();
fanni.calcAge(); */

// Object.create inheritance
/* const Person = {
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },

  calcAge() {
    console.log(`Age is ${2037 - this.birthYear}.`);
  },
};

const james = Object.create(Person);

james.init('james', 2002);
//console.log(james);

const Student = Object.create(Person);
Student.init = function (firstName, birthYear, course) {
  Person.init.call(this, firstName, birthYear);
  this.course = course;
};

const mike = Object.create(Student);

mike.init('mike', 1999, 'biology');
console.log(mike);
mike.calcAge();
james.calcAge();
 */
//TULOSSA
// 1. Public fields
// 2. Private fields
// 3. Public methods
// 4. Private methods

/* class Account {
  //1. Public fields
  locale = navigator.language;

  // 2. Private fields
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
    // this._movements = [];
    // this.locale = navigator.language;

    console.log(`Thank you for opening a new account, ${this.owner}!`);
  }

  ////////// PUBLIC INTERFACE (for our objects)
  // 3. public methods

  changePin(newPin) {
    this.#pin = newPin;
  }

  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
    return this;
  }

  withdrawal(val) {
    this.deposit(-val);
    return this;
  }

  requestLoan(val) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved!`);
      return this;
    }
  }

  _approveLoan(val) {
    return true;
  }

  //4. private methods ei toimi vielä

  // #approveLoan(val) {
  //   return true;
  // }
}

const acc1 = new Account('Ville', 'EUR', 1234);

acc1.withdrawal(200);
acc1.deposit(400);
acc1.requestLoan(999);

console.log(acc1);
console.log(acc1.getMovements());

// DONT WORK BECAUSE PRIVATE
//console.log(acc1.#movements);
//console.log(acc1.#pin);
//acc1.#pin = 5577;

acc1.changePin(5577);
console.log(acc1);

acc1
  .deposit(123)
  .deposit(778)
  .deposit(45)
  .withdrawal(90)
  .requestLoan(23000)
  .withdrawal(3000);

console.log(acc1.getMovements()); */

class Car {
  constructor(brand, speed) {
    this.brand = brand;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.brand} goes ${this.speed} km/h. ✌`);
    return this;
  }

  break() {
    this.speed -= 5;
    console.log(`${this.brand} goes ${this.speed} km/h. ✌`);
    return this;
  }

  get speedUS() {
    return `${Math.trunc(this.speed / 1.6)} mi/h`;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

class EV extends Car {
  #charge;

  constructor(brand, speed, charge) {
    super(brand, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    console.log(chargeTo);
    return this;
  }

  getCharge() {
    return this.#charge;
  }
}

const tesla = new EV('tesla', 120, 23);

console.log(tesla);

console.log(tesla.getCharge());
tesla.chargeBattery(122);

console.log(tesla);

tesla.accelerate().accelerate().chargeBattery(300).break();

console.log(tesla.speedUS);
