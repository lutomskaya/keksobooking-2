import { sendData } from './api.js';
import { pristine } from './form-validation.js';
import { resetMap } from './map.js';
import { displayMessageError } from './message.js';
import { createSlider } from './form-slider.js';
import { TYPE_PRICE_OPTIONS } from './consts.js';

const form = document.querySelector('.ad-form');
const submitButtonElement = form.querySelector('.ad-form__submit');
const formSlider = document.querySelector('.ad-form__slider');
const resetButtonElement = form.querySelector('.ad-form__reset');
const typeElement = form.querySelector('#type');
const formFieldset = form.querySelectorAll('fieldset');
const addressElement = document.querySelector('#address');

const activateForm = (activate) => {
  if (activate) {
    form.classList.remove('ad-form--disabled');
    formFieldset.forEach((fieldset) => {
      fieldset.removeAttribute('disabled');
    });
  } else {
    form.classList.add('ad-form--disabled');
    formFieldset.forEach((fieldset) => {
      fieldset.setAttribute('disabled', 'true');
    });
  }
};

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = 'Публикую...';
};

const unBlockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = 'Опубликовать';
};

const resetForm = () => {
  form.reset();
  pristine.reset();
  resetMap();
  formSlider.noUiSlider.reset();
};

const resetFormButton = () => {
  resetButtonElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetForm();
    formSlider.noUiSlider.reset();
  });
};

const initForm = () => {
  createSlider(typeElement, pristine.validate, TYPE_PRICE_OPTIONS);
  addressElement.readonly = true;
  resetFormButton();
};

const setUserFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          resetForm();
          unBlockSubmitButton();
        },
        () => {
          displayMessageError();
          unBlockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });
};

export {activateForm, setUserFormSubmit, initForm};
