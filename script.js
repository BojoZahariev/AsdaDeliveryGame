const game = document.querySelector('#game');
const character = document.querySelector('#character');
const van = document.querySelector('#van');
const wheel1 = document.querySelector('#wheel1');
const wheel2 = document.querySelector('#wheel2');
const block = document.querySelector('#block');
const score = document.querySelector('#score');
const startBtn = document.querySelector('#startBtn');
const playAgainBtn = document.querySelector('#playAgainBtn');
const background = document.querySelector('#background');
const gameOverTitle = document.querySelector('#gameOverTitle');
const santa = document.querySelector('#santa');
const form = document.querySelector('#form');
let scoreValue = 0;
let scoreTiming;
let checkDeadInterval;
let gameRunning = true;
let slowStart = true;

//FIREBASE
// Reference to your entire Firebase database
var database = firebase.database();

// Get a reference to the recommendations object of your Firebase.
// Note: this doesn't exist yet. But when we write to our Firebase using
// this reference, it will create this object for us!
var players = database.ref().child('players');

// Push our first recommendation to the end of the list and assign it a
// unique ID automatically.

form.addEventListener('submit', e => {
  e.preventDefault();

  players.push({
    name: document.querySelector('#name').value,
    score: scoreValue
  });

  form.reset();
  form.style.display = 'none';
});

const jump = () => {
  if (character.classList === 'animate' || !gameRunning) {
    return;
  }

  character.classList.add('animate');
  setTimeout(() => {
    removeJump();
  }, 1000);
};

startBtn.addEventListener('click', () => {
  van.classList.add('animatedVan');

  //small delay for the jump function so it doesn't jump with the start click
  setTimeout(() => {
    document.addEventListener('click', jump);
    startBtn.style.display = 'none';
    background.classList.add('sliding');

    checkDeadInterval = setInterval(checkDead, 10);

    addObstacles();
  }, 1000);
});

playAgainBtn.addEventListener('click', () => {
  window.location.reload();
});

const removeJump = () => {
  character.classList.remove('animate');
};

//checks for collision
const checkDead = () => {
  let characterBottom = parseInt(window.getComputedStyle(character).getPropertyValue('bottom'));
  document.querySelectorAll('.block').forEach(el => {
    let blockLeft = parseInt(window.getComputedStyle(el).getPropertyValue('left'));

    //remove the passed obstacles
    if (blockLeft < 0) {
      el.remove();

      //score increase
      scoreValue += 10;
      score.textContent = scoreValue;

      if (scoreValue % 100 === 0) {
        santa.style.display = 'block';
        santa.classList.add('santaAnimated');

        setTimeout(() => {
          santa.classList.remove('santaAnimated');
          santa.style.display = 'none';
        }, 4000);
        //increase difficulty
      } else if (scoreValue > 20) {
        slowStart = false;
      }
    }

    //checks for collision
    if (blockLeft < 190 && blockLeft > 55 && characterBottom <= 20) {
      document.querySelector('#smoke').style.display = 'block';

      document.querySelectorAll('.block').forEach(element => {
        element.classList.remove('animateBlock');
      });
      gameRunning = false;
      el.style.left = `${blockLeft}px`;

      clearInterval(checkDeadInterval);

      background.classList.remove('sliding');
      background.style.display = 'none';
      gameOverTitle.style.display = 'block';
      playAgainBtn.style.display = 'inline-block';
      van.classList.remove('animatedVan');
      van.classList.add('vanCrashed');
      wheel1.classList.add('animatedWheel1');
      wheel2.classList.add('animatedWheel2');
      form.style.display = 'block';
    }
  });
};

const addObstacles = () => {
  if (gameRunning) {
    let randomTime;

    //decreased difficulty at start
    if (slowStart) {
      randomTime = randomIntFromInterval(2500, 3000);

      //normal difficulty
    } else {
      randomTime = randomIntFromInterval(950, 3000);
    }

    let obstacle = document.createElement('img');

    //alternate the obstacles
    if (randomTime >= 2300) {
      obstacle.src = 'images/snowman.png';
    } else if (randomTime >= 1600) {
      obstacle.src = 'images/tree.png';
    } else {
      obstacle.src = 'images/gift.png';
    }

    obstacle.classList.add('block');
    obstacle.classList.add('animateBlock');
    game.appendChild(obstacle);

    setTimeout(addObstacles, randomTime);
  }
};

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
