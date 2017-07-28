const warnings = {
  en: {
    isNonEmpty: 'This field can not be empty.',
    onlyLetters: 'value can only be the letters "a" to "z".',
    isValidNumber: 'value can only be a number, such as 1, 3.14 or 2010',
    minMax: 'value can only be a number no less and no more than min max',
    min: 'value can only be a number not less than min',
    max: 'value can only be a number not more than max',
    isEmailCorrect: 'enter a valid email',
    isValidTel: 'enter a valid phone',
    isValidUrl: 'enter a valid url',
    isRequired: 'for to continue activate a mandatory field',
    isEmptyGroup: 'you need to select at least one item',
  },
  ru: {
    isNonEmpty: 'это поле не может быть пустым.',
    onlyLetters: 'значением может быть только буквы от "а" до "я".',
    isValidNumber: 'значением может быть только число­, например 1, 3.14 или 2010',
    minMax: 'значением может быть только число не меньше min и не больше max',
    min: 'значением может быть только число не меньше min',
    max: 'значением может быть только число не больше max',
    isEmailCorrect: 'введите корректный email',
    isValidTel: 'введите корректный телефон',
    isValidUrl: 'введите корректный url',
    isRequired: 'для продолжения активируйте обязательное поле',
    isEmptyGroup: 'необходимо выбрать хоть один пункт',
  },
};

export default warnings;
