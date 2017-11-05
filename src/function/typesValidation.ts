import { INSTRUCTION_EN, INSTRUCTION_RU } from '../constants';
import warnings from '../warnings';
import { TypesValidation } from './../interfaces';

/* Contains embedded objects that contain check methods and a description of errors */
const types: TypesValidation = {
  /* Check field on the empty */
  isNonEmpty: {
    validate: (input: HTMLInputElement): boolean => input.value !== '',
    [INSTRUCTION_EN]: warnings.en.isNonEmpty,
    [INSTRUCTION_RU]: warnings.ru.isNonEmpty,
  },
  /* Check on the entered letters without special characters */
  onlyLetters: {
    validate: (input: HTMLInputElement): boolean => !/[^a-zа-яё ]/gi.test(input.value),
    [INSTRUCTION_EN]: warnings.en.onlyLetters,
    [INSTRUCTION_RU]: warnings.ru.onlyLetters,
  },
  /* Check of the number */
  isValidNumber: {
    validate: (input: HTMLInputElement): boolean => !isNaN(Number(input.value)),
    [INSTRUCTION_EN]: warnings.en.isValidNumber,
    [INSTRUCTION_RU]: warnings.ru.isValidNumber,
  },
  /* Check for compliance with the number of not less than min and not more than max
  * (works if given and min and max at the input type = "number") */
  minMax: {
    validate: (input: HTMLInputElement): boolean => {
      const min = Number(input.min);
      const max = Number(input.max);
      const value = Number(input.value);
      return (min > value) || (value > max);
    },
    [INSTRUCTION_EN]: warnings.en.minMax,
    [INSTRUCTION_RU]: warnings.ru.minMax,
  },
  /* Check for compliance of not less than min (for input type="number") */
  min: {
    validate: (input: HTMLInputElement): boolean => {
      const min = Number(input.min);
      const value = Number(input.value);
      return min > value;
    },
    [INSTRUCTION_EN]: warnings.en.min,
    [INSTRUCTION_RU]: warnings.ru.min,
  },
  /* Check for compliance of not more than max (for input type = "number") */
  max: {
    validate: (input: HTMLInputElement): boolean => {
      const max = Number(input.max);
      const value = Number(input.value);
      return value > max;
    },
    [INSTRUCTION_EN]: warnings.en.max,
    [INSTRUCTION_RU]: warnings.ru.max,
  },
  /* Check the validity of the entered email address */
  isEmailCorrect: {
    validate: (input: HTMLInputElement): boolean => /^.+@.+$/.test(input.value),
    [INSTRUCTION_EN]: warnings.en.isEmailCorrect,
    [INSTRUCTION_RU]: warnings.ru.isEmailCorrect,
  },
  /* Check on the validity of the entered phone number */
  isValidTel: {
    validate: (input: HTMLInputElement): boolean => !/[^0-9 .()*+-]/g.test(input.value),
    [INSTRUCTION_EN]: warnings.en.isValidTel,
    [INSTRUCTION_RU]: warnings.ru.isValidTel,
  },
  /* Check on the validity of the entered url address */
  isValidUrl: {
    validate: (input: HTMLInputElement): boolean =>
      /^(https?|s?ftp|file):\/\/[a-zа-яё_-]+[\a-zа-яё\.]{2,6}\??([a-zа-яё_-]+)\#?([a-zа-яё_-]+)/g.test(input.value),
    [INSTRUCTION_EN]: warnings.en.isValidUrl,
    [INSTRUCTION_RU]: warnings.ru.isValidUrl,
  },
  /* Check activation of the required field (for checkbox or radio) */
  isRequired: {
    validate: (input: HTMLInputElement): boolean => input.checked,
    [INSTRUCTION_EN]: warnings.en.isRequired,
    [INSTRUCTION_RU]: warnings.ru.isRequired,
  },
  /* Check the activation of elements of at least one of the groups (for checkbox or radio) */
  isEmptyGroup: {
    validate: (input: HTMLInputElement[]): boolean =>
      input.some((item: HTMLInputElement) => item.checked),
    [INSTRUCTION_EN]: warnings.en.isEmptyGroup,
    [INSTRUCTION_RU]: warnings.ru.isEmptyGroup,
  },
};

export default types;
