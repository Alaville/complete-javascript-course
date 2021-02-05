'use strict';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class App {
  workouts = [];
  #mapEvent;
  #map;
  #mapZoomLevel = 13;
  constructor() {
    this._setMapPosition();

    this._getLocalStore();

    //eventlisteners
    inputType.addEventListener('change', this._toggleInputType);
    form.addEventListener('submit', this._newWorkout.bind(this));
    containerWorkouts.addEventListener(
      'click',
      this._moveMapWorkoutPosition.bind(this)
    );
  }

  _moveMapWorkoutPosition(e) {
    const click = e.target.closest('li');

    if (!click) return;

    const workout = this.workouts.find(
      workout => workout.id === +click.dataset.id
    );

    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: { duration: 1 },
    });
  }

  _setMapPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          console.log('Coords not found!');
        }
      );
    }
  }

  _mapPopUp(workout) {
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
      .setPopupContent(`${workout.name} ${workout.date}`)
      .openPopup();
  }

  _loadMap(e) {
    const { latitude, longitude } = e.coords;

    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    this.#map.on('click', this._showForm.bind(this));
  }

  _showForm(e) {
    const { lat, lng } = e.latlng;
    this.#mapEvent = e;
    form.classList.remove('hidden');
  }

  _hideForm() {
    inputCadence.value = inputDistance.value = inputDuration.value = inputElevation.value =
      '';
    form.classList.add('hidden');
  }

  _toggleInputType() {
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    e.preventDefault();
    const { lat, lng } = this.#mapEvent.latlng;
    this._createNewWorkout(lat, lng);
    this._hideForm();
  }

  _createNewWorkout(lat, lng) {
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;

    if (distance < 0 || duration < 0 || isNaN(distance) || isNaN(duration))
      return;

    if (type === 'running') {
      let cadence = +inputCadence.value;
      if (cadence < 0 || isNaN(cadence)) return;
      const workout = new Running(distance, duration, [lat, lng], cadence);
      this.workouts.push(workout);
      this._displayWorkout(workout);
      this._mapPopUp(workout);
    }

    if (type === 'cycling') {
      const elev = +inputElevation.value;
      if (isNaN(elev)) return;
      const workout = new Cycling(distance, duration, [lat, lng], elev);
      this.workouts.push(workout);
      this._displayWorkout(workout);
      this._mapPopUp(workout);
    }

    this._setLocalStore();
  }

  _displayWorkout(workout) {
    form.insertAdjacentHTML(
      'afterend',
      `<li class="workout workout--${workout.name}" data-id="${workout.id}">
      <h2 class="workout__title">${workout.name} on ${workout.date}</h2>
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
          workout.name === 'running' ? workout.pace : workout.speed
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
          workout.name === 'running' ? workout.cadence : workout.elev
        }</span>
        <span class="workout__unit">${
          workout.name === 'running' ? 'spm' : 'm'
        }</span>
      </div>
    </li>`
    );
  }

  _setLocalStore() {
    localStorage.setItem('workouts', JSON.stringify(this.workouts));
  }

  _getLocalStore() {
    const data = JSON.parse(localStorage.getItem('workouts'));

    if (!data) return;

    this.workouts = data;

    this.workouts.forEach(w => this._displayWorkout(w));
  }

  reset() {
    localStorage.removeItem('workouts');
    location.reload();
  }
}

class Workout {
  id = new Date().getTime();
  constructor(distance, duration, coords) {
    this.distance = distance;
    this.duration = duration;
    this.coords = coords;
    this._modDate(new Date());
  }

  _modDate(date) {
    this.date = `${months[date.getMonth()]} ${date.getDate()}th`;
  }
}

class Running extends Workout {
  name = 'running';
  constructor(distance, duration, coords, cadence) {
    super(distance, duration, coords);
    this.cadence = cadence;
    this._calcPace();
  }

  _calcPace() {
    this.pace = (this.duration / this.distance).toFixed(1);
  }
}

class Cycling extends Workout {
  name = 'cycling';
  constructor(distance, duration, coords, elev) {
    super(distance, duration, coords);
    this.elev = elev;
    this._calcSpeed();
  }

  _calcSpeed() {
    this.speed = (this.distance / (this.duration / 60)).toFixed(1);
  }
}

const app = new App();
