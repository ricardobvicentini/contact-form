'use strict';

const inputs = document.querySelectorAll('.input');
const radioBtns = document.querySelectorAll('.query-selector');
const queryBox = document.querySelector('.query-box');
const consentBtn = document.querySelector('.consent-box');
const subBtn = document.querySelector('.wrapper__btn');
const modal = document.querySelector('.msg-modal');
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
  el.style.borderColor = 'var(--cl-border)';
  el.nextElementSibling.classList.add('hidden');
}

function clearQuery(el) {
  el.classList.remove('query-bg');
  el.style.borderColor = 'var(--cl-border)';
  el.firstElementChild.classList.remove('hidden');
  el.firstElementChild.nextElementSibling.classList.add('hidden');
}

function toggleBtns(el) {
  el.firstElementChild.classList.toggle('hidden');
  el.firstElementChild.nextElementSibling.classList.toggle('hidden');
}

function checkTrue() {
  const valArr = Object.values(check);
  return valArr.every((item) => item === true);
}

function clearAll() {
  inputs.forEach((input) => {
    input.value = '';
  });
  radioBtns.forEach((radioBtn) => {
    clearQuery(radioBtn);
  });
  toggleBtns(consentBtn);
  setInterval(() => {
    modal.classList.remove('slide-down');
  }, 3000);
}

/* Event listeners */
subBtn.onclick = (e) => {
  e.preventDefault();
  inputs.forEach((input) => {
    if (!input.value) errorMsg(input);
  });
  if (check[consentBtn.id] === false) {
    errorMsg(consentBtn);
  }
  if (check[query.id] === false) {
    errorMsg(queryBox);
    const [general, support] = queryBox.children;
    general.style.borderColor = 'var(--cl-primary-red)';
    support.style.borderColor = 'var(--cl-primary-red)';
  }
  /* checkTrue() && modal.classList.add('slide-down'); */
  if (checkTrue()) {
    modal.classList.add('slide-down');
    clearAll();
  }
};

inputs.forEach((input) => {
  input.addEventListener('keyup', () => {
    if (input['name'] === 'fName' || input['name'] === 'lName') {
      if (!input.value.match(regex[0])) {
        errorMsg(input);
        input.nextElementSibling.innerHTML = 'Provide a valid name';
        check[input.name] = false;
      } else {
        removeErrorMsg(input);
        check[input.name] = true;
      }
    }
    if (input['name'] === 'email') {
      if (!input.value.match(regex[1])) {
        errorMsg(input);
        check[input.name] = false;
      } else {
        removeErrorMsg(input);
        check[input.name] = true;
      }
    }
    if (input['name'] === 'message') {
      if (!input.value === '') {
        check[input.name] = false;
      } else {
        removeErrorMsg(input);
        check[input.name] = true;
      }
    }
  });
});

radioBtns.forEach((radioBtn) => {
  radioBtn.onclick = () => {
    radioBtn.classList.toggle('query-bg');
    toggleBtns(radioBtn);
    removeErrorMsg(queryBox);
    check[queryBox.id] = true;
    radioBtn.style.borderColor = 'var(--cl-border)';
    radioBtn.classList.contains('general')
      ? clearQuery(radioBtn.nextElementSibling)
      : clearQuery(radioBtn.previousElementSibling);
  };
});

consentBtn.onclick = () => {
  toggleBtns(consentBtn);
  if (check[consentBtn.id] === false) {
    check[consentBtn.id] = true;
    removeErrorMsg(consentBtn);
  } else check[consentBtn.id] = false;
};
