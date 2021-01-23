'use strict';

/* function calcAge(birthyear) {
  const age = 2020 - birthyear;

  function printAge() {
    const a = `${myName} was born ${birthyear} an i am ${age} years old.`;
    console.log(a);
  }
  printAge();

  return age;
}

const myName = 'Ville';
console.log(calcAge(1984));

console.log(b);

var b = 23;
 */

const ville = {
  firstName: 'Ville',
  lastName: 'Alatalo',
  birthyear: 1984,
  friends: ['gary', 'john'],
  calcAge() {
    console.log(2020 - this.birthyear);
  },
};

//ville.friends.push('matt');

const marriedVille = Object.assign({}, ville);

marriedVille.friends.push('anna');

marriedVille.lastName = 'Vuotunki';
marriedVille.birthyear = 123;

console.log(ville, marriedVille);
