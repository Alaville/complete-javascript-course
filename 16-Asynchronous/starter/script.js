'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// old school way
// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     const html = `<article class="country">
//   <img class="country__img" src="${data.flag}" />
//   <div class="country__data">
//     <h3 class="country__name">${data.name}</h3>
//     <h4 class="country__region">${data.region}</h4>
//     <p class="country__row"><span>👫</span>${(
//       data.population / 1000000
//     ).toFixed(1)} people</p>
//     <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//     <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//   </div>
// </article>`;

//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };

// getCountryData('canada');
// getCountryData('finland');
// getCountryData('italy');

const renderCountry = function (data, className = '') {
  const html = `<article class="country ${className}">
  <img class="country__img" src="${data.flag}" />
  <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      data.population / 1000000
    ).toFixed(1)} people</p>
    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
    <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
  </div>
</article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

// const getCountryAndNeighbour = function (country) {
//   // AJAX call country 1
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     //RENDER COUNTRY 1
//     renderCountry(data);

//     //getneighbourCountry

//     const [neighbour] = data.borders;
//     console.log(neighbour);
//     if (!neighbour) return;

//     // AJAX call country 2
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//     request2.send();

//     request2.addEventListener('load', function () {
//       const data2 = JSON.parse(this.responseText);
//       console.log(data2);

//       renderCountry(data2, 'neighbour');
//     });
//   });
// };

// getCountryAndNeighbour('brazil');

// const request = fetch('https://restcountries.eu/rest/v2/name/portugal');
// console.log(request);      <-- return promise

const displayErrorMessage = function (msg) {
  countriesContainer.insertAdjacentText('afterbegin', msg);
  countriesContainer.style.opacity = 1;
};

const getJson = function (url, errMessage = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errMessage}(${response.status})`);
    return response.json();
  });
};

//https://restcountries.eu/rest/v2/name/${country}

const getCountryData = function (country) {
  getJson(
    `https://restcountries.eu/rest/v2/name/${country}`,
    'Country not found'
  )
    .then(data => {
      const [ob] = data;
      renderCountry(ob);
      const [neighbour] = ob.borders;

      if (!neighbour) throw new Error('Neighbour not found');

      return getJson(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    })
    .then(data => {
      renderCountry(data, 'neighbour');
    })
    .catch(err => {
      displayErrorMessage(err);
    });
  //.finally()
};

// btn.addEventListener('click', function () {
//   getCountryData('fds');
// });

//'https://geocode.xyz/51.50354,-0.12768?geoit=json'

/* navigator.geolocation.getCurrentPosition(
  function (e) {
    const { latitude, longitude } = e.coords;
    console.log(latitude, longitude);
    whereAmI(latitude, longitude);
  },
  function () {
    console.log('coords not found');
  }
); */

// const whereAmI = function (lat, lng) {
//   fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//     .then(response => {
//       console.log(response);
//       if (!response.ok) {
//         throw new Error(`error getting response ${response.status}`);
//       }

//       return response.json();
//     })
//     .then(data => {
//       console.log(data);
//       //if (!data.succes) throw new Error('error data succesin kohdalla');
//       console.log(`You are in ${data.city}, ${data.country}.`);
//       getCountryData(data.country);
//     })
//     .catch(err => {
//       console.log(`Error occured: ${err}`);
//     });
// };

// whereAmI(52.508, 13.381);
//whereAmI(19.037, 72.873);
//whereAmI(-33.933, 18.474);

// how asyncronous javascript works behind the scene example (event loop)
// console.log('test start');
// setTimeout(() => console.log('0 sec timer'), 0);
// Promise.resolve('resolved promise 1.').then(res => console.log(res));

// Promise.resolve('resolved promise 2').then(res => {
//   for (let i = 0; i < 10000000; i++) {}
//   console.log(res);
// });
// console.log('test end');

/* const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('lottoarvonta menossa');
  setTimeout(() => {
    if (Math.random() >= 0.5) {
      resolve('You win!😎');
    } else {
      reject(new Error('you lost your money!🤷‍♂️🤷‍♂️'));
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

//promisifying setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(2)
  .then(() => {
    console.log('waited 2 seconds');
    return wait(1);
  })
  .then(() => console.log('waited 1 second'));
 */

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    //   navigator.geolocation.getCurrentPosition(
    //     function (e) {
    //       resolve(e)
    //     },
    //     function (err) {
    //       reject(err)
    //     }
    //   );
    // });

    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

//getPosition().then(response => console.log(response.coords));

/* const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: long } = pos.coords;

      return fetch(`https://geocode.xyz/${lat},${long}?geoit=json`);
    })

    .then(response => {
      console.log(response);
      if (!response.ok) {
        throw new Error(`error getting response ${response.status}`);
      }

      return response.json();
    })
    .then(data => {
      console.log(data);
      //if (!data.succes) throw new Error('error data succesin kohdalla');
      console.log(`You are in ${data.city}, ${data.country}.`);
      getCountryData(data.country);
    })
    .catch(err => {
      console.log(`Error occured: ${err}`);
    });
};

whereAmI();
 */

// 'img-1.jpg'

const createImage = function (path) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = path;

    img.addEventListener('load', function () {
      document.querySelector('.images').append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found!'));
    });
  });

  // document
  //   .querySelector('.images')
  //   .insertAdjacentHTML('afterbegin', `<img src="${path}" alt="pic">`);
};

createImage('img/img-1.jpg')
  .then(img => console.log('image loaded'))
  .catch(err => console.log(`${err}`));
