import { TYPE_OPTIONS } from './consts.js';

// шаблон #card, забираем то что будем копировать
const offersTemplate = document.querySelector('#card').content.querySelector('.popup');

// создание карточки объявления

const createOffersCard = (offers) => {
  const cardElement = offersTemplate.cloneNode(true);
  const titleElement = cardElement.querySelector('.popup__title');
  const addressElement = cardElement.querySelector('.popup__text--address');
  const priceElement = cardElement.querySelector('.popup__text--price');
  const typeElement = cardElement.querySelector('.popup__type');
  const roomsGuestsElement = cardElement.querySelector('.popup__text--capacity');
  const checkinOutElement = cardElement.querySelector('.popup__text--time');
  const descriptionElement = cardElement.querySelector('.popup__description');
  const avatarElement = cardElement.querySelector('.popup__avatar');

  if(!offers.offer.title) {
    offers.offer.title.remove();
  } else {
    titleElement.textContent = offers.offer.title;
  }

  if(!offers.offer.address) {
    offers.offer.address.remove();
  } else {
    addressElement.textContent = offers.offer.address;
  }

  if(!offers.offer.price) {
    offers.offer.price.remove();
  } else {
    priceElement.textContent = `${offers.offer.price} ₽/ночь`;
  }

  if(!offers.offer.type) {
    offers.offer.type.remove();
  } else {
    typeElement.textContent = TYPE_OPTIONS[offers.offer.type];
  }

  if(!offers.author.avatar) {
    offers.author.avatar.remove();
  } else {
    avatarElement.src = offers.author.avatar;
  }

  roomsGuestsElement.textContent = `${offers.offer.rooms  } комнаты для ${offers.offer.guests  } гостей`;
  checkinOutElement.textContent = `Заезд после ${offers.offer.checkin  }, выезд до ${offers.offer.checkout  }`;
  typeElement.textContent = TYPE_OPTIONS[offers.offer.type];

  if (!offers.offer.description) {
    descriptionElement.remove();
  } else {
    descriptionElement.textContent = offers.offer.description;
  }

  const featuresContainerElement = cardElement.querySelector('.popup__features');
  if (!offers.offer.features || offers.offer.features.length === 0) {
    featuresContainerElement.remove();
  } else {
    featuresContainerElement.innerHTML = '';
    const fragment = document.createDocumentFragment();
    offers.offer.features.forEach((feature) => {
      const featureElement = document.createElement('li');
      featureElement.classList.add('popup__feature');
      featureElement.classList.add(`popup__feature--${feature}`);
      fragment.appendChild(featureElement);
    });
    featuresContainerElement.appendChild(fragment);
  }

  const photosContainerElement = cardElement.querySelector('.popup__photos');
  if (!offers.offer.photos || offers.offer.photos.length === 0) {
    photosContainerElement.remove();
  } else {
    const photoElement = cardElement.querySelector('.popup__photo');
    const photoFragment = document.createDocumentFragment();
    offers.offer.photos.forEach ((photoSrc) => {
      const photoItem = photoElement.cloneNode(true);
      photoItem.src = photoSrc;
      photoFragment.appendChild(photoItem);
    });
    photosContainerElement.innerHTML = '';
    photosContainerElement.appendChild(photoFragment);
  }

  return cardElement;
};

export {createOffersCard};
