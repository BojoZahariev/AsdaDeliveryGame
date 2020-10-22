const game = document.querySelector('#game');
const character = document.querySelector('#character');
const block = document.querySelector('#block');
const score = document.querySelector('#score');
const startBtn = document.querySelector('#startBtn');
let scoreValue = 0;
let scoreTiming;
let checkDeadInterval;

const jump = () => {
  if (character.classList === 'animate') {
    return;
  }
  character.classList.add('animate');
  setTimeout(() => {
    removeJump();
  }, 1500);
};

startBtn.addEventListener('click', () => {
  //small delay for the jump function so it doesn't jump with the start click
  setTimeout(() => {
    document.addEventListener('click', jump);
  }, 500);

  block.classList.add('animateBlock');

  scoreTiming = setInterval(() => {
    scoreValue++;
    score.textContent = scoreValue;
  }, 300);

  checkDeadInterval = setInterval(checkDead, 10);

  addObstacles();
});

const removeJump = () => {
  character.classList.remove('animate');
};

const checkDead = () => {
  let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue('top'));
  let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue('left'));
  if (blockLeft < 160 && blockLeft > 50 && characterTop >= 130) {
    document.querySelector('#smoke').style.display = 'block';
    block.classList.remove('animateBlock');
    block.style.left = `${blockLeft}px`;
    clearInterval(scoreTiming);
    clearInterval(checkDeadInterval);

    scoreValue = 0;
  }
};

const addObstacles = () => {
  let randomTime = randomIntFromInterval(1000, 4000);
  console.log(randomTime);
  let obstacle = document.createElement('div');
  obstacle.classList.add('test');
  obstacle.classList.add('animateBlock');
  game.appendChild(obstacle);

  let blockLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'));
  console.log(blockLeft);
  if (blockLeft < -10) {
    obstacle.remove();
  }

  setTimeout(addObstacles, randomTime);
};

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
