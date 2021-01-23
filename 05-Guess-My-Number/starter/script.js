'use strict';

// Arvotaan numero 1-20
let number = Math.trunc(Math.random() * 20) + 1;

// Määritellään muuttujat
let score = 20;
let highscore = 0;

//Funktiot
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

const displayScore = function (score) {
  document.querySelector('.score').textContent = score;
};

// Check napin painaminen
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  //When no input in check box
  if (!guess) {
    displayMessage('No number, try again! 😎');

    // Guess is not the right number
  } else if (guess !== number) {
    if (score > 1) {
      displayMessage(guess < number ? 'Too low! 🙄' : 'Too high! 🙄');
      score--;
      displayScore(score);
    } else if (score === 1) {
      displayMessage('You lost the game! 🙄');
      displayScore(0);
    }

    //When player wins
  } else if (guess === number) {
    displayMessage('Right number!! Yay!!! 😃😃😃😃😎😎');
    document.querySelector('.number').textContent = number;

    //bacground color to green when player wins
    document.querySelector('body').style.backgroundColor = '#60b347';
    //number box wider when player win
    document.querySelector('.number').style.width = '30rem';

    //highscore
    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
  }
});

//Again nappi
document.querySelector('.again').addEventListener('click', function () {
  number = Math.trunc(Math.random() * 20) + 1;
  score = 20;

  displayScore(score);
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  displayMessage('Start guessing...');

  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});
