const character = document.querySelector('#character');

const jump = () => {
  if (character.classList === 'animate') {
    return;
  }
  character.classList.add('animate');
  setTimeout(removeJump, 1000); //300ms = length of animation
};

document.addEventListener('click', jump);

const removeJump = () => {
  character.classList.remove('animate');
};

const block = document.querySelector('#block');
const checkDead = () => {
  let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue('top'));
  let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue('left'));
  if (blockLeft < 40 && blockLeft > 20 && characterTop >= 130) {
    alert('Game over');
  }
};

setInterval(checkDead, 10);
