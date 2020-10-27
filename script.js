const game = document.querySelector('#game');
const character = document.querySelector('#character');
const van = document.querySelector('#van');
const block = document.querySelector('#block');
const score = document.querySelector('#score');
const startBtn = document.querySelector('#startBtn');
const playAgainBtn = document.querySelector('#playAgainBtn');
const background = document.querySelector('#background');
const gameOverTitle = document.querySelector('#gameOverTitle');
const santa = document.querySelector('#santa');
let scoreValue = 0;
let scoreTiming;
let checkDeadInterval;
let gameRunning = true;
let slowStart = true;

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
