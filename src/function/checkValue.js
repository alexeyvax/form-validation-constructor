import typesValidation from './typesValidation';

/**
 * Determines error on ordinary field
 * 
 * @param config {Object}
 * @param inputElement {HTMPInputElement}
 * @param instructions {String}
 * @returns storeErrors {Map}
 */

const getMessageError = (config, inputElement, instructions) => {
  let message = '';
  config.some((item) => {
    const checker = typesValidation[item];
    if (!checker) {
      return false;
    }

    const result = checker.validate(inputElement);
    if (!result) {
      message = checker[instructions];
      return true;
    }
    return false;
  });
  return message;
};

/**
 * Determines error on ordinary field
 * 
 * @param dataInput {Object}
 * @param storeErrors {Map}
 * @returns storeErrors {Map}
 */
const checkValue = (dataInput, storeErrors) => {
  const toArray = Object.values(dataInput);
  const instructions = `instructions-${typesValidation.lang}`;

  if (!toArray.length) {
    return storeErrors;
  }

  toArray.forEach(({ inputElement, config }) => {
    const message = getMessageError(config, inputElement, instructions);
    storeErrors.set(inputElement, message);
  });
  return storeErrors;
};

export default checkValue;
