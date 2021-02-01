'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

form.classList.remove('hidden');

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      //   console.log(latitude);
      //   console.log(longitude);
      //   console.log(`https://www.google.fi/maps/@${latitude},${longitude}`);

      const coords = [latitude, longitude];

      const map = L.map('map').setView(coords, 12);

      L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      //L.marker(coords).addTo(map).bindPopup('You are here!😎✌').openPopup();

      map.on('click', function (e) {
        const { lat, lng } = e.latlng;
        //form.classList.remove('hidden');

        L.marker([lat, lng])
          .addTo(map)
          .bindPopup(
            L.popup({
              minWidth: 100,
              maxWidth: 250,
              autoClose: false,
              closeOnClick: false,
              className: 'running-popup',
            })
          )
          .setPopupContent('Workout')
          .openPopup();
        //////////////////////////////////////////
        let type = inputType.value;
        let distance = +inputDistance.value;
        let duration = +inputDuration.value;
        let cadence = +inputCadence.value;

        console.log(type);
        console.log(distance);
        console.log(duration);
        console.log(cadence);

        if (type === 'cycling') {
          workouts.push(
            new Cycling(type, distance, duration, [lat, lng], cadence)
          );
        }
        if (type === 'running') {
          workouts.push(
            new Running(type, distance, duration, [lat, lng], cadence)
          );
        }
        console.log(workouts);
      });
    },
    function () {
      alert('Could not get your position!');
    }
  );
}

document.querySelector('.logo').addEventListener('click', function (e) {
  e.preventDefault();

  console.log(workouts);

  workouts.forEach((workout, i) => {
    workout.type === 'running'
      ? containerWorkouts.insertAdjacentHTML(
          'beforeend',
          `<li class="workout workout--${workout.type}" data-id="1234567890">
        <h2 class="workout__title">Running on April 14</h2>
        <div class="workout__details">
          <span class="workout__icon">🏃‍♂️</span>
          <span class="workout__value">${workout.distance}</span>
          <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⏱</span>
          <span class="workout__value">${workout.duration}</span>
          <span class="workout__unit">min</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${(
            workout.duration / workout.distance
          ).toFixed(1)}</span>
          <span class="workout__unit">min/km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">🦶🏼</span>
          <span class="workout__value">${workout.cadence}</span>
          <span class="workout__unit">spm</span>
        </div>
      </li>`
        )
      : containerWorkouts.insertAdjacentHTML(
          'beforeend',
          `<li class="workout workout--cycling" data-id="1234567891">
      <h2 class="workout__title">Cycling on April 5</h2>
      <div class="workout__details">
        <span class="workout__icon">🚴‍♀️</span>
        <span class="workout__value">${workout.distance}</span>
        <span class="workout__unit">km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⏱</span>
        <span class="workout__value">${workout.duration}</span>
        <span class="workout__unit">min</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⚡️</span>
        <span class="workout__value">${(
          workout.distance /
          (workout.duration / 60)
        ).toFixed(1)}</span>
        <span class="workout__unit">km/h</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⛰</span>
        <span class="workout__value">${workout.cadence}</span>
        <span class="workout__unit">m</span>
      </div>
    </li>`
        );
  });
});

//////////////////////////////////7
// CLASSES

const workouts = [];

class Workout {
  constructor(type, distance, duration, coords) {
    this.type = type;
    this.distance = distance;
    this.duration = duration;
    this.coords = coords;
  }
}

class Cycling extends Workout {
  constructor(type, distance, duration, coords, cadence) {
    super(type, distance, duration, coords);
    this.cadence = cadence;
  }
}

class Running extends Workout {
  constructor(type, distance, duration, coords, cadence) {
    super(type, distance, duration, coords);
    this.cadence = cadence;
  }
}
