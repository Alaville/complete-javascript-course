"use strict";

/* function uusi(num) {
    const tulos = `Sinulla on ${num} pyörää`;

    return tulos;
}

console.log(uusi(4)); */

/* function describeCountry(country, population, capitalCity) {
    return `${country} has ${population} million people and its capital is ${capitalCity}.`;
}

const eka = describeCountry('Spain', 66, 'Madrid');
const toka = describeCountry('Italy', 60, 'Roma');
const kolmas = describeCountry('France', 76, 'Paris');

console.log(eka);
console.log(toka);
console.log(kolmas);

const funk = function (country, population, capitalCity) {
    return `${country} has ${population} million people and its capital is ${capitalCity}.`;
}

console.log(funk('Canada', 100, 'Ottawa'));

const donk = (country, population, capitalCity) => `${country} has ${population} million people and its capital is ${capitalCity}.`;

console.log(donk('Kenia', 2, 'Nairobi')); */

/* function percentageWorld1(population) {
    const value = (population / 7900) * 100;
    return value;
} */

/* const fin = 6;
const spain = 60;
const usa = 350; */

/* console.log(percentageWorld1(fin));
console.log(percentageWorld1(spain));
console.log(percentageWorld1(usa));

const percentageWorld2 = function (population) {
    const value = (population / 7900) * 100;
    return value;
}

console.log(percentageWorld2(fin));
console.log(percentageWorld2(spain));
console.log(percentageWorld2(usa));

const percentageWorld3 = (population) => (population / 7900) * 100;

console.log(percentageWorld3(fin));
console.log(percentageWorld3(spain));
console.log(percentageWorld3(usa));
 */
/* function describePopulation(country, population) {
    return `${country} has ${population} million people and its about ${percentageWorld1(population)}% of the world.`;
}

console.log(describePopulation('Finland', fin));
console.log(describePopulation('Spain', spain));
console.log(describePopulation('USA', usa));
 */

/* const calcAverage = (score1, score2, score3) => (score1 + score2 + score3) / 3;

const avgKoalas = calcAverage(65, 54, 49);
const avgDolphins = calcAverage(44, 23, 71);

function checWinner(avgKoalas, avgDolphins) {

    if (avgKoalas >= (2 * avgDolphins)) {

        console.log(`Koalas win by ${avgKoalas} vs ${avgDolphins}`);

    } else if (avgDolphins >= (2 * avgKoalas)) {

        console.log(`Dolphins win by ${avgDolphins} vs ${avgKoalas}`);

    } else {
        console.log(`No team wins`);
    }
}

console.log(`Koalas average score is ${avgKoalas}.`);
console.log(`Dolphins average score is ${avgDolphins}.`);

checWinner(avgKoalas, avgDolphins);

checWinner(40, 20); */

function calcTip(bill) {
  let tipp;

  if (bill >= 50 && bill <= 300) {
    tipp = bill * 0.15;
  } else {
    tipp = bill * 0.2;
  }
  return tipp;
}

/*console.log(calcTip(100));

// 125 555 44

const bills = [125, 555, 44];

const tipps = new Array(calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[bills.length - 1]));

console.log(tipps);

const total = [bills[0] + tipps[0], bills[1] + tipps[1], bills[2] + tipps[2]];

console.log(total);
 */

/* const fin = 6;
const spain = 60;
const usa = 350;
const norway = 9;

const populations = [fin, spain, usa, norway];

console.log(populations.length === 4);

const percentages = [percentageWorld1(fin), percentageWorld1(spain), percentageWorld1(usa), percentageWorld1(norway)];

console.log(populations);



populations.push(18);
console.log(populations);

if (populations.includes(spain)) {
    console.log('löytyi!');
}

console.log(populations.indexOf(usa)); */

/* const myCountry = {
    country: 'Finland',
    capital: 'Helsinki',
    population: 7,
    neighbours: ['Sweden', 'Norway', 'Russia'],
    language: 'finnish',
    hasDriverLicence = true
} */

//console.log(myCountry);

//Finland has 6 million finnish-speaking people, 3 neighbouring countries and a capital called Helsink

/* const a = `${myCountry.country} has ${myCountry.population} million ${myCountry.language}-speaking people, ${myCountry.neighbours.length} neighbouring countries and a capital called ${myCountry.capital}.`;

console.log(a);

myCountry.population = 9;

console.log(myCountry);

myCountry['population'] = 5;

console.log(myCountry); */

/* const ville = {
    firstName: 'Ville',
    lastName: 'Alatalo',
    birthYear: 1984,
    friends: ['Fanni', 'KAri', 'Pena'],
    hasDriverLicence: true, */

/* calcAge: function () {
    return 2020 - this.birthYear;
} */

/* calcAge: function () {
    this.age = 2020 - this.birthYear;
    return this.age;
},

summary: function () {
    return `${this.firstName} ${this.lastName} is ${this.calcAge()} years old and he has ${this.hasDriverLicence ? 'a' : 'no'} drivers licence `;

}

};


console.log(ville.calcAge());
//console.log(ville['calcAge']());

console.log(ville.age);
console.log(ville.age);
console.log(ville.age);

console.log(ville.summary());
*/

/* const mark = {
    fullName: 'Mark Miller',
    weight: 78,
    height: 1.69,

    calcBMI: function () {
        this.bmi = this.weight / (this.height * this.height);
        return this.bmi;
    }
}

const john = {
    fullName: 'John Wayne',
    weight: 92,
    height: 1.95,

    calcBMI: function () {
        this.bmi = this.weight / (this.height * this.height);
        return this.bmi;
    }

} */

//console.log(mark.calcBMI());
//console.log(john.calcBMI());

/* if (mark.calcBMI() > john.calcBMI()) {
    console.log(`${mark.fullName} BMI ${mark.bmi} is higher than ${john.fullName} BMI ${john.bmi} `);
} else {
    console.log(`${john.fullName} BMI ${john.bmi} is higher than ${mark.fullName} BMI ${mark.bmi} `);
} */

/* const myCountry = {
    country: 'Finland',
    capital: 'Helsinki',
    population: 7,
    neighbours: ['Sweden', 'Norway', 'Russia'],
    language: 'finnish',

    describe: function () {
        return `${this.country} has ${this.population} million ${this.language}-speaking people ${this.neighbours.length} neighbouring countries and a capital called ${this.capital}.`
    },

    checkIsIsland: function () {
        this.isIsland = this.neighbours.length === 0 ? true : false;
        return this.isIsland;
    }


}

console.log(myCountry.describe());

console.log(myCountry.checkIsIsland());

console.log(myCountry.isIsland);
 */

/* const villeArray = [
    'Ville',
    36,
    'Alatalo',
    true,
    4.56,
    'vittu mitä paskaa'
]; */

/* const uusiArray = [];

for (let i = 0; i < villeArray.length; i++) {

    console.log(villeArray[i], typeof villeArray[i]);

    //uusiArray[i] = typeof villeArray[i];
    uusiArray.push(typeof villeArray[i]);
}

for (let i = 0; i < uusiArray.length; i++) {
    console.log(uusiArray[i]);
}

console.log(uusiArray);


const lista = [3, 6, 9];

let sum = 0;

for (let i = 0; i < lista.length; i++) {
    sum = sum + lista[i];
}

console.log(sum); */

/* for (let i = villeArray.length - 1; i >= 0; i--) {
    console.log(villeArray[i]);
}

for (let i = 1; i < 4; i++) {
    console.log(`Lets start exercise ${i}`);

    for (let a = 1; a < 11; a++) {
        console.log(`workout rep ${a}`);
    }
}
 */

/* const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];

const tipps = [];
const totals = [];

for (let i = 0; i < bills.length; i++) {
    tipps.push(calcTip(bills[i]));
    totals.push(calcTip(bills[i]) + bills[i]);
}

console.log(tipps);
console.log(totals); */

////////////////////////////////////////

/* function calcAverage(arr) {

    let sum = 0;

    for (let i = 0; i < arr.length; i++) {
        sum = sum + arr[i];
    }
    let avg = sum / arr.length;
    return avg;


}

console.log(calcAverage(tipps));

console.log(calcAverage(bills));

console.log(calcAverage(totals)); */

/* const lista = [2, 3, 4];

let sum = 0;

for (let i = 0; i < lista.length; i++) {
    sum = sum + lista[i];
}

console.log(sum);

let avg = sum / lista.length;

console.log(avg);
 */
