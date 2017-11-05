import store from '../classes/Store';
import { IS_EMPTY_GROUP } from '../constants';
import typesValidation from './typesValidation';

/* Get message about error */
const getMessage = (
  arr: HTMLInputElement[],
  instructions: string,
): string => {
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

/* Field group check */
const checkValueGroup = (
  groupRadio: HTMLInputElement[][],
): void|Map<HTMLInputElement, string> => {
  const instructions = `instructions-${store.getCurrentLanguage()}`;

  if (!groupRadio.length) {
    return store.getErrors();
  }

  groupRadio.forEach((arr: HTMLInputElement[]) => {
    const message = getMessage(arr, instructions);
    store.setErrors(arr[0], message);
  });
};

export default checkValueGroup;
