import typesValidation from './typesValidation';
import { IS_EMPTY_GROUP } from '../constants/index';

/**
 * Get message about error
 * 
 * @param arr {Array}
 * @returns message {String}
 */
const getMessage = (arr, instructions) => {
  let message = '';

  if (!arr.length) {
    return message;
  }

  arr.some(() => {
    const checker = typesValidation[IS_EMPTY_GROUP];
    if (!checker) {
      return false;
    }

    const result = checker.validate(arr);
    if (!result) {
      message = checker[instructions];
      return true;
    }
    return false;
  });
  return message;
};

/**
 * Field group check
 * 
 * @param groupRadio {Array}
 * @param storeErrors {Map}
 * @returns storeErrors {Map}
 */
const checkValueGroup = (groupRadio, storeErrors) => {
  const instructions = `instructions-${typesValidation.lang}`;

  if (!groupRadio.length) {
    return storeErrors;
  }

  groupRadio.forEach((arr) => {
    const message = getMessage(arr, instructions);
    storeErrors.set(arr[0], message);
  });
  return storeErrors;
};

export default checkValueGroup;
