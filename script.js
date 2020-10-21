const character = document.querySelector('#character');
const block = document.querySelector('#block');
const score = document.querySelector('#score');
let scoreValue = 0;

const jump = () => {
  if (character.classList === 'animate') {
    return;
  }
  character.classList.add('animate');
  setTimeout(() => {
    removeJump();
  }, 1500);
};

document.addEventListener('click', jump);

const removeJump = () => {
  character.classList.remove('animate');
};

const checkDead = () => {
  let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue('top'));
  let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue('left'));
  if (blockLeft < 160 && blockLeft > 50 && characterTop >= 130) {
    alert('Game over');
    scoreValue = 0;
  } else if (blockLeft < 10 && blockLeft > 6) {
  }
};

setInterval(checkDead, 10);

setInterval(() => {
  scoreValue++;
  score.textContent = scoreValue;
}, 300);
