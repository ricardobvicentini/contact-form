'use strict';

const inputs = document.querySelectorAll('.input');
const radioBtns = document.querySelectorAll('.query-selector');
const subBtn = document.querySelector('.wrapper__btn');
const regex = [/^[a-z ,.'-]+$/i, /^\S+@\S+\.\S+$/];
let check = false;

function errorMsg(el) {
  el.style.borderColor = 'var(--cl-primary-red)';
  el.nextElementSibling.classList.remove('hidden');
}

function removeErrorMsg(el) {
  el.nextElementSibling.classList.add('hidden');
  el.style.borderColor = 'var(--cl-border)';
}

subBtn.onclick = (e) => {
  e.preventDefault();
  inputs.forEach((input) => {
    if (!input.value) {
      errorMsg(input);
    } else {
      removeErrorMsg(input);
    }
  });
};

inputs.forEach((input) => {
  input.addEventListener('keyup', () => {
    if (input['name'] === 'fName' || input['name'] === 'lName') {
      if (!input.value.match(regex[0])) {
        errorMsg(input);
        input.nextElementSibling.innerHTML = 'Provide a valid name';
      } else {
        removeErrorMsg(input);
      }
    }
    if (input['name'] === 'email') {
      if (!input.value.match(regex[1])) {
        errorMsg(input);
      } else {
        removeErrorMsg(input);
      }
    }
  });
});

radioBtns.forEach((radioBtn) => {
  radioBtn.onclick = () => {
    radioBtn.classList.toggle('query-bg');
    radioBtn.firstElementChild.classList.toggle('hidden');
    radioBtn.firstElementChild.nextElementSibling.classList.toggle('hidden');
    radioBtn.classList.contains('general')
      ? clearQuery(radioBtn.nextElementSibling)
      : clearQuery(radioBtn.previousElementSibling);
  };
});

function clearQuery(el) {
  el.classList.remove('query-bg');
  el.firstElementChild.classList.remove('hidden');
  el.firstElementChild.nextElementSibling.classList.add('hidden');
}
