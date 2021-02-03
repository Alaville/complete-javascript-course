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

//////////////////////////////////7
// CLASSES

class App {
  #map;
  #mapEvent;
  #mapZoomLevel = 12;
  workouts = [];
  constructor() {
    this._getPosition();

    form.addEventListener('submit', this._newWorkout.bind(this));

    inputType.addEventListener('change', this._toggleElevationField);

    containerWorkouts.addEventListener('click', this._moveToPopUp.bind(this));
  }

  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('Could not get your position!');
        }
      );
    }
  }

  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    //   console.log(latitude);
    //   console.log(longitude);
    //   console.log(`https://www.google.fi/maps/@${latitude},${longitude}`);

    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    //handling clicks on map
    this.#map.on('click', this._showForm.bind(this));
  }

  _showForm(e) {
    this.#mapEvent = e;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _hideForm() {
    inputCadence.value = inputDistance.value = inputDuration.value = inputElevation.value =
      '';
    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    e.preventDefault();

    const { lat, lng } = this.#mapEvent.latlng;

    this._createNewWorkout(lat, lng);
    this._hideForm();
  }

  _createNewWorkout(lat, lng) {
    //check if input data is valid
    if (
      !+inputDistance.value ||
      !+inputDuration.value ||
      +inputDistance.value < 0 ||
      +inputDuration.value < 0
    ) {
      alert('false input');
      return;
    }

    // create new workout
    const workout =
      inputType.value === 'running'
        ? new Running(
            inputType.value,
            +inputDistance.value,
            +inputDuration.value,
            [lat, lng],
            +inputCadence.value
          )
        : new Cycling(
            inputType.value,
            +inputDistance.value,
            +inputDuration.value,
            [lat, lng],
            +inputElevation.value
          );

    // add new workout to array
    this.workouts.push(workout);
    console.log(workout);

    //modify workout date
    this.modifyDate(workout);

    //render workout on container
    this.renderWorkout(workout);

    //render marker on a map
    this.renderMarker(workout);
  }

  modifyDate(workout) {
    workout.month = months[workout.date.getMonth()];
    workout.day = workout.date.getDate();
    workout.modWorkOutName =
      workout.name[0].toUpperCase() + workout.name.slice(1);
  }

  renderMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          minWidth: 100,
          maxWidth: 250,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.name}-popup`,
        })
      )
      .setPopupContent(
        `${workout.name === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${
          workout.modWorkOutName
        } on ${workout.month} ${workout.day}th`
      )
      .openPopup();
  }

  renderWorkout(workout) {
    form.insertAdjacentHTML(
      'afterend',
      `<li class="workout workout--${workout.name}" data-id="${workout.id}">
    <h2 class="workout__title">${workout.modWorkOutName} on ${workout.month} ${
        workout.day
      }</h2>
    <div class="workout__details">
      <span class="workout__icon">${
        workout.name === 'running' ? '🏃‍♂️' : '🚴‍♀️'
      }</span>
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
      <span class="workout__value">${
        workout.name === 'running' ? workout.speed : workout.pace
      }</span>
      <span class="workout__unit">${
        workout.name === 'running' ? 'min/km' : 'km/h'
      }</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">${
        workout.name === 'running' ? '🦶🏼' : '⛰'
      }</span>
      <span class="workout__value">${
        workout.name === 'running' ? workout.cadence : workout.elevationGain
      }</span>
      <span class="workout__unit">${
        workout.name === 'running' ? 'spm' : 'm'
      }</span>
    </div>
  </li>`
    );
  }

  _moveToPopUp(e) {
    const click = e.target.closest('li');

    if (!click) return;

    const id = click.dataset.id;
    const ob = this.workouts.find(workout => workout.id === +id);

    this.#map.setView(ob.coords, this.#mapZoomLevel, {
      animate: true,
      pan: { duration: 1 },
    });
  }
}

class Workout {
  id = new Date().getTime();
  date = new Date();
  constructor(distance, duration, coords) {
    this.distance = distance;
    this.duration = duration;
    this.coords = coords;
  }
}

class Cycling extends Workout {
  constructor(name, distance, duration, coords, elevationGain) {
    super(distance, duration, coords);
    this.elevationGain = elevationGain;
    this.name = name;

    this.calcPace();
  }

  calcPace() {
    this.pace = (this.distance / (this.duration / 60)).toFixed(1);
    return this.pace;
  }
}

class Running extends Workout {
  name;
  constructor(name, distance, duration, coords, cadence) {
    super(distance, duration, coords);
    this.cadence = cadence;
    this.name = name;

    this.calcSpeed();
  }

  calcSpeed() {
    this.speed = (this.duration / this.distance).toFixed(1);
    return this.speed;
  }
}

const app = new App();
