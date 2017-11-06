import store from '../classes/Store';
import warnings from '../warnings';
import { DataInput } from './../interfaces';
import typesValidation from './typesValidation';

/* Determines error on ordinary field */
const getMessageError = (
  config: string[],
  inputElement: HTMLInputElement,
) => {
  let message = '';
  const lang = store.getCurrentLanguage().toLowerCase();

  config.some((item: string) => {
    const checker = typesValidation[item];
    if (!checker) {
      return false;
    }

    if (!checker.validate(inputElement)) {
      message = warnings[lang][item];
      return true;
    }
    return false;
  });
  return message;
};

/* Determines error on ordinary field */
const checkValue = (dataInput: DataInput[]): void|Map<HTMLInputElement, string> => {
  if (!dataInput.length) {
    return store.getErrors();
  }

  dataInput.forEach(({ inputElement, config }: DataInput) => {
    const message = getMessageError(config, inputElement);
    store.setErrors(inputElement, message);
  });
};

export default checkValue;
