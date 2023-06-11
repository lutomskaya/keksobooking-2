import { PRICE, STEP } from './consts.js';

const formSlider = document.querySelector('.ad-form__slider');
const priceElement = document.querySelector('#price');

const createSlider = (type, check, count)  => {
  noUiSlider.create(formSlider, {
    range: {
      min: PRICE.MIN,
      max: PRICE.MAX,
    },
    start: count[type.value],
    step: STEP,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });

  type.addEventListener('change', (evt) => {
    const event = evt.target.value;
    if (count[event]) {
      formSlider.noUiSlider.updateOptions({
        range: {
          min: Number(count[event]),
          max: PRICE.MAX,
        },
        step: STEP,
      });
    }
  });

  formSlider.noUiSlider.on('slide' , () => {
    priceElement.value = formSlider.noUiSlider.get();
    check(priceElement);
  });

  priceElement.addEventListener ('change', () => {
    formSlider.noUiSlider.set(priceElement.value);
  });
};

const activateSlider = (activate) => {
  if (activate) {
    formSlider.removeAttribute('disabled');
  } else {
    formSlider.setAttribute('disabled', '');
  }
};

export {createSlider, activateSlider};
