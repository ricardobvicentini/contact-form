'use strict';

const inputs = document.querySelectorAll('.input');
const emailInput = document.getElementById('email');
const subBtn = document.querySelector('.wrapper__btn');
/* const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i; */
const regex = /^\S+@\S+\.\S+$/;

subBtn.onclick = (e) => {
  e.preventDefault();
  inputs.forEach((input) => {
    if (!input.value) {
      input.nextElementSibling.classList.remove('hidden');
      input.style.borderColor = 'var(--cl-primary-red)';
    } else {
      input.nextElementSibling.classList.add('hidden');
      input.style.borderColor = 'var(--cl-border)';
    }
  });
};

emailInput.addEventListener('change', (e) => {
  if (!e.target.value.match(regex)) {
    e.target.nextElementSibling.classList.remove('hidden');
    e.target.style.borderColor = 'var(--cl-primary-red)';
  } else {
    e.target.nextElementSibling.classList.add('hidden');
    e.target.style.borderColor = 'var(--cl-border)';
  }
});
