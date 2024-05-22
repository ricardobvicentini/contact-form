'use strict';

const inputs = document.querySelectorAll('.input');
const radioBtns = document.querySelectorAll('.query-selector');
const consentBtn = document.querySelector('.consent-box');
const subBtn = document.querySelector('.wrapper__btn');
const regex = [/^[a-z ,.'-]+$/i, /^\S+@\S+\.\S+$/];
let check = {
  fName: false,
  lName: false,
  email: false,
  query: false,
  consent: false,
};

/*  Functions */
function errorMsg(el) {
  el.style.borderColor = 'var(--cl-primary-red)';
  el.nextElementSibling.classList.remove('hidden');
}

function removeErrorMsg(el) {
  el.nextElementSibling.classList.add('hidden');
  el.style.borderColor = 'var(--cl-border)';
}

function clearQuery(el) {
  el.classList.remove('query-bg');
  el.firstElementChild.classList.remove('hidden');
  el.firstElementChild.nextElementSibling.classList.add('hidden');
}

function toggleBtns(el) {
  el.firstElementChild.classList.toggle('hidden');
  el.firstElementChild.nextElementSibling.classList.toggle('hidden');
}

/* Event listeners */
subBtn.onclick = (e) => {
  e.preventDefault();
  inputs.forEach((input) => {
    if (!input.value) {
      errorMsg(input);
      check[input.name] = false;
    } else {
      removeErrorMsg(input);
      check[input.name] = true;
    }
  });
  console.log(check);
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
    toggleBtns(radioBtn);
    radioBtn.classList.contains('general')
      ? clearQuery(radioBtn.nextElementSibling)
      : clearQuery(radioBtn.previousElementSibling);
  };
});

consentBtn.onclick = () => {
  toggleBtns(consentBtn);
};
