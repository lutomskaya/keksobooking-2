import { activateForm } from './form.js';
import { createOffersCard } from './cards.js';
import { OFFERS_COUNT, COORDINATE_MAP, COUNT_MAP_ZOOM } from './consts.js';
import { activateSlider } from './form-slider.js';

const blockPage = (activate) => {
  if (activate) {
    activateForm(false);
    //activateFiltres(false);
    activateSlider(false);
  } else {
    activateForm(true);
    //activateFiltres(true);
    activateSlider(true);
  }
};

const addressElement = document.querySelector('#address');
const map = L.map('map-canvas');
const markerGroup = L.layerGroup().addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  COORDINATE_MAP,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const closePopup = () => {
  map.closePopup();
};

/* const clearMarkers = () => {
  markerGroup.clearLayers();
}; */

const initMap = (coordinate, count) => {
  map.on('load', () => {
    blockPage(false);
  });
  map.setView(coordinate, count);
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  mainPinMarker.addTo(map);
  addressElement.value = `${COORDINATE_MAP.lat}, ${COORDINATE_MAP.lng}`;
  //mainPinMarker.setLatLng(coordinate).addTo(map);
};

mainPinMarker.on('moveend', (evt) => {
  const {lat, lng} = evt.target.getLatLng();
  addressElement.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
});

const pinIconOffers = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const createMarker = (point) => {
  const {lat, lng} = point.location;
  const markerOffers = L.marker({
    lat,
    lng,
  }, {
    pinIconOffers
  });
  markerOffers.addTo(markerGroup).bindPopup(createOffersCard(point));
};

const addPoints = (paramData) => {
  paramData.slice(0, OFFERS_COUNT).forEach((point) => {
    createMarker(point);
  });
  mainPinMarker.addTo(markerGroup);
};

const resetMap = () => {
  addressElement.value = `${COORDINATE_MAP.lat}, ${COORDINATE_MAP.lng}`;
  mainPinMarker.setLatLng(COORDINATE_MAP);
  map.setView(COORDINATE_MAP, COUNT_MAP_ZOOM);
  closePopup ();
};
//const form = document.querySelector('.ad-form');

/* const initMap = (coordinate, count) => {
  map.on('load', () => {
    blockPage(false);
  });
  map.setView(coordinate, count);
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
  addressElement.value = `${COORDINATE_MAP.lat}, ${COORDINATE_MAP.lng}`;
  marker.setLatLng(coordinate).addTo(map);
};

//двигаем метку получаем адрес
marker.on('moveend', (evt) => {
  const {lat, lng} = evt.target.getLatLng();
  addressElement.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
});

// прикрепляем объявление к метке
const createMarker = (point) => {
  const {lat, lng} = point.location;
  const markerOffers = L.marker({
    lat,
    lng,
  }, {
    pinIconOffers
  });
  markerOffers.addTo(markerGroup).bindPopup(createOffersCard(point));
};

const addPoints = (paramData) => {
  paramData.slice(0, OFFERS_COUNT).forEach((point) => {
    createMarker(point);
  });
  marker.addTo(markerGroup);
};

const resetMap = () => {
  addressElement.value = `${COORDINATE_MAP.lat}, ${COORDINATE_MAP.lng}`;
  marker.setLatLng(COORDINATE_MAP);
  map.setView(COORDINATE_MAP, COUNT_MAP_ZOOM);
}; */

export {initMap, addPoints, resetMap, /*resetMap, */ blockPage};
