import warnings from '../warnings/index';
import { INSTRUCTION_EN, INSTRUCTION_RU } from '../constants/index';

/**
 * Contains embedded objects that contain check methods and a description of errors
 * 
 * types {Object}
 */
const types = {
  /**
  * Check field on the empty
  * 
  * @param input {HTMLInputElement}
  * @returns true or false {boolean}
  */
  isNonEmpty: {
    validate: input => input.value !== '',
    [INSTRUCTION_EN]: warnings.en.isNonEmpty,
    [INSTRUCTION_RU]: warnings.ru.isNonEmpty,
  },
  /**
  * Check on the entered letters without special characters
  * 
  * @param input {HTMLInputElement}
  * @returns true or false {boolean}
  */
  onlyLetters: {
    validate: input => !/[^a-zа-яё ]/gi.test(input.value),
    [INSTRUCTION_EN]: warnings.en.onlyLetters,
    [INSTRUCTION_RU]: warnings.ru.onlyLetters,
  },
  /**
  * Check of the number
  * 
  * @param input {HTMLInputElement}
  * @returns true or false {boolean}
  */
  isValidNumber: {
    validate: input => !isNaN(input.value),
    [INSTRUCTION_EN]: warnings.en.isValidNumber,
    [INSTRUCTION_RU]: warnings.ru.isValidNumber,
  },
  /**
  * Check for compliance with the number of not less than min and not more than max 
  * (works if given and min and max at the input type = "number")
  * 
  * @param input {HTMLInputElement}
  * @returns true or false {boolean}
  */
  minMax: {
    validate(input) {
      const min = Number(input.min);
      const max = Number(input.max);
      const value = Number(input.value);
      return (min > value) || (value > max);
    },
    [INSTRUCTION_EN]: warnings.en.minMax,
    [INSTRUCTION_RU]: warnings.ru.minMax,
  },
  /**
  * Check for compliance of not less than min (for input type="number")
  * 
  * @param input {HTMLInputElement}
  * @returns true or false {boolean}
  */
  min: {
    validate(input) {
      const min = Number(input.min);
      const value = Number(input.value);
      return min > value;
    },
    [INSTRUCTION_EN]: warnings.en.min,
    [INSTRUCTION_RU]: warnings.ru.min,
  },
  /**
  * Check for compliance of not more than max (for input type = "number")
  * 
  * @param input {HTMLInputElement}
  * @returns true or false {boolean}
  */
  max: {
    validate(input) {
      const max = Number(input.max);
      const value = Number(input.value);
      return value > max;
    },
    [INSTRUCTION_EN]: warnings.en.max,
    [INSTRUCTION_RU]: warnings.ru.max,
  },
  /**
  * Check the validity of the entered email address
  * 
  * @param input {HTMLInputElement}
  * @returns true or false {boolean}
  */
  isEmailCorrect: {
    validate: input => /^.+@.+$/.test(input.value),
    [INSTRUCTION_EN]: warnings.en.isEmailCorrect,
    [INSTRUCTION_RU]: warnings.ru.isEmailCorrect,
  },
  /**
  * Check on the validity of the entered phone number
  * 
  * @param input {HTMLInputElement}
  * @returns true or false {boolean}
  */
  isValidTel: {
    validate: input => !/[^0-9 .()*+-]/g.test(input.value),
    [INSTRUCTION_EN]: warnings.en.isValidTel,
    [INSTRUCTION_RU]: warnings.ru.isValidTel,
  },
  /**
  * Check on the validity of the entered url address
  * 
  * @param input {HTMLInputElement}
  * @returns true or false {boolean}
  */
  isValidUrl: {
    validate: input => /^(https?|s?ftp|file):\/\/[a-zа-яё_-]+[\a-zа-яё\.]{2,6}\??([a-zа-яё_-]+)\#?([a-zа-яё_-]+)/g.test(input.value),
    [INSTRUCTION_EN]: warnings.en.isValidUrl,
    [INSTRUCTION_RU]: warnings.ru.isValidUrl,
  },
  /**
  * Check activation of the required field (for checkbox or radio)
  * 
  * @param input {HTMLInputElement}
  * @returns true or false {boolean}
  */
  isRequired: {
    validate: input => input.checked,
    [INSTRUCTION_EN]: warnings.en.isRequired,
    [INSTRUCTION_RU]: warnings.ru.isRequired,
  },
  /**
  * Check the activation of elements of at least one of the groups (for checkbox or radio)
  * 
  * @param array {Array}
  * @returns rezult {boolean}
  */
  isEmptyGroup: {
    validate: array => array.some(item => item.checked),
    [INSTRUCTION_EN]: warnings.en.isEmptyGroup,
    [INSTRUCTION_RU]: warnings.ru.isEmptyGroup,
  }
};

export default types;
