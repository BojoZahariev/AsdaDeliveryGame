const game = document.querySelector('#game');
const character = document.querySelector('#character');
const block = document.querySelector('#block');
const score = document.querySelector('#score');
const startBtn = document.querySelector('#startBtn');
const playAgainBtn = document.querySelector('#playAgainBtn');
let scoreValue = 0;
let scoreTiming;
let checkDeadInterval;
let gameRunning = true;

const jump = () => {
  if (character.classList === 'animate') {
    return;
  }

  character.classList.add('animate');
  setTimeout(() => {
    removeJump();
  }, 1000);
};

startBtn.addEventListener('click', () => {
  //small delay for the jump function so it doesn't jump with the start click
  setTimeout(() => {
    document.addEventListener('click', jump);
  }, 500);

  scoreTiming = setInterval(() => {
    scoreValue++;
    score.textContent = scoreValue;
  }, 300);

  checkDeadInterval = setInterval(checkDead, 10);

  addObstacles();
});

playAgainBtn.addEventListener('click', () => {
  window.location.reload();
});

const removeJump = () => {
  character.classList.remove('animate');
};

const checkDead = () => {
  let characterBottom = parseInt(window.getComputedStyle(character).getPropertyValue('bottom'));
  document.querySelectorAll('.block').forEach(el => {
    let blockLeft = parseInt(window.getComputedStyle(el).getPropertyValue('left'));
    if (blockLeft < 10) {
      el.remove();
    }

    if (blockLeft < 160 && blockLeft > 50 && characterBottom <= 20) {
      document.querySelector('#smoke').style.display = 'block';

      document.querySelectorAll('.block').forEach(element => {
        element.classList.remove('animateBlock');
      });
      gameRunning = false;
      el.style.left = `${blockLeft}px`;
      clearInterval(scoreTiming);
      clearInterval(checkDeadInterval);

      scoreValue = 0;
    }
  });
};

const addObstacles = () => {
  if (gameRunning) {
    let randomTime = randomIntFromInterval(900, 3000);
    console.log(randomTime);
    let obstacle = document.createElement('img');
    obstacle.src = 'images/tree.png';
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
