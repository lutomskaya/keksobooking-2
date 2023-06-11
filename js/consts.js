const TYPE_OPTIONS = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const TYPE_PRICE_OPTIONS = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

const PRICE = {
  MIN: 0,
  MAX: 100000,
};

const TITLE = {
  MIN: 30,
  MAX: 100,
};

const STEP = 1000;

const OFFERS_COUNT = 10;

const COORDINATE_MAP = {
  lat: 35.68952,
  lng: 139.69199,
};

const COUNT_MAP_ZOOM = 12;

const DEBOUNCE_DELAY = 500;

const PriceType = {
  ANY: 'any',
  LOW: 'low',
  MIDDLE: 'middle',
  HIGH: 'high',
};

const PriceRange = {
  MIDDLE: 10000,
  HIGH: 50000,
};

export {TYPE_OPTIONS, PRICE, STEP, TYPE_PRICE_OPTIONS, TITLE, OFFERS_COUNT, COORDINATE_MAP, COUNT_MAP_ZOOM, DEBOUNCE_DELAY, PriceType, PriceRange};
