import { Warnings } from './../interfaces';

const warnings: Warnings = {
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
  de: {
    isNonEmpty: 'Dieses Feld darf nicht leer sein.',
    onlyLetters: 'Wert kann nur ein Buchstabe von "a" nach "z" sein.',
    isValidNumber: 'Wert kann nur eine Zahl sein, zum Beispiel 1, 3.14 oder 2010',
    minMax: 'Wert kann nur mindestens min und nicht mehr als max',
    min: 'Wert kann nur mindestens min sein',
    max: 'Wert kann nur nicht mehr als max',
    isEmailCorrect: 'korrekte Emailadresse eingeben',
    isValidTel: 'geben Sie das richtige Telefon ein',
    isValidUrl: 'Gib die richtige URL ein',
    isRequired: 'um fortzufahren, aktivieren Sie das erforderliche Feld',
    isEmptyGroup: 'Sie müssen mindestens einen Artikel auswählen',
  },
};

export default warnings;
