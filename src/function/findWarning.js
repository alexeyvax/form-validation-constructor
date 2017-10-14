import configValidation from './configValidation';

/**
 * Find and out warnings
 * 
 * @param element {HTMLInputElement}
 * @param arr {Array}
 * @returns mediateArray {Array}
 */
const findWarning = ({ name, type }, arr) => {
  const mediateArray = [];

  if (!arr.length) {
    return mediateArray;
  }

  arr.forEach((item) => {
    if (configValidation[type].includes(item)) {
      return mediateArray.push(item);
    }

    return console.error(`Warning: field named "${name}" with type="${type}". 
      data-options can not contain check to "${item}"`);
  });
  return mediateArray;
};

export default findWarning;
