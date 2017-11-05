import store from '../classes/Store';
import { DataInput } from './../interfaces';
import typesValidation from './typesValidation';

/* Determines error on ordinary field */
const getMessageError = (
  config: string[],
  inputElement: HTMLInputElement,
  instructions: string,
) => {
  let message = '';

  config.some((item: string) => {
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

/* Determines error on ordinary field */
const checkValue = (dataInput: DataInput[]): void|Map<HTMLInputElement, string> => {
  const instructions = `instructions-${store.getCurrentLanguage()}`;

  if (!dataInput.length) {
    return store.getErrors();
  }

  dataInput.forEach(({ inputElement, config }: DataInput) => {
    const message = getMessageError(config, inputElement, instructions);
    store.setErrors(inputElement, message);
  });
};

export default checkValue;
