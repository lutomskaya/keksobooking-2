import { TYPE_PRICE_OPTIONS, PRICE, TITLE } from './consts.js';

const form = document.querySelector('.ad-form');

const titleElement = form.querySelector('#title');
const priceElement = form.querySelector('#price');
const typeElement = form.querySelector('#type');
const roomElement = form.querySelector('#room_number');
const capacityElement = form.querySelector('#capacity');
const timeElement = form.querySelector('.ad-form__element--time');
const timeInElement = form.querySelector('#timein');
const timeOutElement = form.querySelector('#timeout');

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});

const validateTitle = (value) => value.length >= TITLE.MIN && value.length <= TITLE.MAX;
pristine.addValidator(titleElement, validateTitle, `Длина заголовка должна быть от ${TITLE.MIN} до ${TITLE.MAX} символов`);

const validateMaxPrice = (value) => value >= 0 && value <= PRICE.MAX;
pristine.addValidator(priceElement, validateMaxPrice, `Цена не может быть более ${PRICE.MAX} руб.`);

timeElement.addEventListener('change', (evt) => {
  timeInElement.value = evt.target.value;
  timeOutElement.value = evt.target.value;
});

const validateMinPrice = (value) => {
  const cost = parseInt(value, 10);
  const minPrice = TYPE_PRICE_OPTIONS[typeElement.value] || 0;

  return cost && (cost >= minPrice);
};

const getValidateMinPriceErrorMessage = () => {
  const typeValue = typeElement.value;
  return  `Выберете цену от ${TYPE_PRICE_OPTIONS[typeValue]} до ${PRICE.MAX}`;
};

pristine.addValidator(priceElement, validateMinPrice, getValidateMinPriceErrorMessage);
typeElement.addEventListener('change', () => {
  priceElement.placeholder = TYPE_PRICE_OPTIONS[typeElement.value];
  pristine.validate(priceElement);
});

const validateCountQuests = (value) => {
  const capacityValue = capacityElement.value;

  switch (value) {
    case '1':
      return capacityValue === '1';
    case '2':
      return capacityValue === '1' || capacityValue === '2';
    case '3':
      return capacityValue === '1' || capacityValue === '2' || capacityValue === '3';
    case '100':
      return capacityValue === '0';
  }
};

const getRoomErrorMessage = (value) => {
  switch (value) {
    case '1':
      return 'Для 1 гостя';
    case '2':
      return 'Возможно не более 2х гостей';
    case '3':
      return 'Возможно не более 3х гостей';
    case '100':
      return 'Не для гостей';
  }
};

pristine.addValidator(roomElement, validateCountQuests, getRoomErrorMessage);
capacityElement.addEventListener('change', () => {
  pristine.validate(roomElement);
});


export {pristine};
