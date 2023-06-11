import { initMap,  addPoints, blockPage} from './map.js';
import { setUserFormSubmit, initForm} from './form.js';
import { getData } from './api.js';
import { COORDINATE_MAP, COUNT_MAP_ZOOM, /* DEBOUNCE_DELAY, OFFERS_COUNT */ } from './consts.js';
import { displayMessageSuccess, displayMessageError} from './message.js';
//import { debounce } from './util.js';
initForm();
blockPage(true);
initMap(COORDINATE_MAP, COUNT_MAP_ZOOM);
getData(addPoints, displayMessageError);
setUserFormSubmit(displayMessageSuccess);

