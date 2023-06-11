// функция генерации случайного числа

function getRandomNumber (a, b)  {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

// функция генерации случайного числа с количеством знаков после запятой

function getRandomFloat(a, b, decimals = 1) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;

  return +result.toFixed(decimals);
}

// Функция получения случайного элемента из массива
const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

// функция перемешивает элементы массива

const shuffle = (arrayCopy) => {
  let j, temp;
  //перебираем массив с последнего элемента
  for (let i = arrayCopy.length - 1; i > 0; i--) {
    //выбираем случайный элемент массива - j
    j = Math.floor(Math.random() * (i + 1));
    // меняем местами с последним элементом
    temp = arrayCopy[j];
    arrayCopy[j] = arrayCopy[i];
    arrayCopy[i] = temp;
  }
  return arrayCopy;
};

// функция создает копию массива

const getNewArray = (array) => {
  //создаем копию
  const arrayCopy = array.slice();
  //перемешиваем
  shuffle(arrayCopy);
  //случайное число
  const randomIndexItem = getRandomNumber(0, arrayCopy.length - 1);
  //возвращаем новый массив без случайного количества элементов
  return arrayCopy.slice(randomIndexItem);
};

function debounce (callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}

export {getRandomNumber, getRandomFloat, getNewArray, getRandomArrayElement, debounce};
