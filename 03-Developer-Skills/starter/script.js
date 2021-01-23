// Remember, we're gonna use strict mode in all scripts now!
'use strict';

/* function printForecast(arr) {
  const uusi = [];

  for (let i = 0; i < arr.length; i++) {
    //console.log(`... ${arr[i]} C  in ${i + 1} days`);
    uusi.push(`... ${arr[i]} C  in ${i + 1} days`);
  }

  return uusi.join('');
}

console.log(printForecast([17, 21, 23]));
 */

/* const temperatures = [
  3,
  -2,
  -6,
  9,
  'error',
  13,
  29,
  'error',
  15,
  14,
  9,
  5,
  -34,
];

function calcTempAmplitude(arr1, arr2) {
  const arr = arr1.concat(arr2);
  let suurin = arr[0];
  let pienin = arr[0];

  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] !== 'number') continue;
    if (arr[i] > suurin) suurin = arr[i];
    if (arr[i] < pienin) pienin = arr[i];
  }

  return suurin - pienin;
}

console.log(calcTempAmplitude(temperatures, [2, 76, 1, 4, -7, 3]));
 */

/* function lengthVille() {
  const length = {
    type: 'meters',
    value: Number(prompt('Please write the higth?')),
  };

  console.table(length);
  const box = length.value + 0.3;
  return box;
}

console.log(lengthVille()); */
