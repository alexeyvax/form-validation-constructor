import store from '../classes/Store';
import { IS_EMPTY_GROUP } from '../constants';
import warnings from '../warnings';
import typesValidation from './typesValidation';

/* Get message about error */
const getMessage = (arr: HTMLInputElement[]): string => {
  let message = '';
  if (!arr.length) {
    return message;
  }

  const lang = store.getCurrentLanguage().toLowerCase();
  arr.some(() => {
    const checker = typesValidation[IS_EMPTY_GROUP];
    if (!checker) {
      return false;
    }

    if (!checker.validate(arr)) {
      message = warnings[lang][IS_EMPTY_GROUP];
      return true;
    }
    return false;
  });
  return message;
};

/* Field group check */
const checkValueGroup = (
  groupRadio: HTMLInputElement[][],
): void|Map<HTMLInputElement, string> => {
  if (!groupRadio.length) {
    return store.getErrors();
  }

  groupRadio.forEach((arr: HTMLInputElement[]) => {
    const message = getMessage(arr);
    store.setErrors(arr[0], message);
  });
};

export default checkValueGroup;
