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

/* Select radios and checkbox for both keypress and click events */
function selectQuery(el) {
  el.classList.toggle('query-bg');
  toggleBtns(el);
  if (check[queryBox.id] === false) {
    check[queryBox.id] = true;
    removeErrorMsg(queryBox);
  } else check[queryBox.id] = false;
  el.style.borderColor = 'var(--cl-border)';
  el.classList.contains('general')
    ? clearQuery(el.nextElementSibling)
    : clearQuery(el.previousElementSibling);
}

function selectCheckbox(el) {
  toggleBtns(el);
  if (check[el.id] === false) {
    check[el.id] = true;
    removeErrorMsg(el);
  } else check[el.id] = false;
}

function checkTrue() {
  const valArr = Object.values(check);
  return valArr.every((item) => item === true);
}

function clearAll() {
  inputs.forEach((input) => {
    input.value = '';
    check[input.name] = false;
  });
  radioBtns.forEach((radioBtn) => {
    clearQuery(radioBtn);
  });
  check[queryBox.id] = false;
  check[consentBtn.id] = false;
  toggleBtns(consentBtn);
  modal.onclick = () => {
    modal.classList.remove('slide-down');
  };
}

/* Event listeners */
subBtn.onclick = (e) => {
  e.preventDefault();
  inputs.forEach((input) => {
    if (!input.value) {
      errorMsg(input);
      input.nextElementSibling.innerHTML = 'This field is required';
    }
  });
  if (check[consentBtn.id] === false) {
    errorMsg(consentBtn);
  }
  if (check[query.id] === false) {
    const [general, support] = queryBox.children;
    general.style.borderColor = 'var(--cl-primary-red)';
    support.style.borderColor = 'var(--cl-primary-red)';
    errorMsg(queryBox);
  }
  checkTrue()
    ? modal.classList.add('slide-down')
    : modal.classList.remove('slide-down');
  checkTrue() && clearAll();
  console.log(check);
};

inputs.forEach((input) => {
  input.addEventListener('keyup', () => {
    if (input['name'] === 'fName' || input['name'] === 'lName') {
      if (!input.value.match(regex[0]) && input.value) {
        errorMsg(input);
        input.nextElementSibling.innerHTML = 'Provide a valid name';
        check[input.name] = false;
      } else {
        removeErrorMsg(input);
        check[input.name] = true;
      }
    }
    if (input['name'] === 'email') {
      if (!input.value.match(regex[1]) && input.value) {
        errorMsg(input);
        input.nextElementSibling.innerHTML =
          'Please enter a valid email address';
        check[input.name] = false;
      } else {
        removeErrorMsg(input);
        check[input.name] = true;
      }
    }
    if (input['name'] === 'message') {
      if (!input.value) {
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
    selectQuery(radioBtn);
  };
});

radioBtns.forEach((radioBtn) => {
  radioBtn.onkeypress = () => {
    selectQuery(radioBtn);
  };
});

consentBtn.onclick = () => {
  selectCheckbox(consentBtn);
};

consentBtn.onkeypress = () => {
  selectCheckbox(consentBtn);
};
