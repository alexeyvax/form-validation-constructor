import outputErrors from '../classes/OutputErrors';
import store from '../classes/Store';
import Validation from '../classes/Validation';
import configValidation from '../function/configValidation';
import typesValidation from '../function/typesValidation';
import { Check, CheckItem, Config } from './../interfaces';

/**
 * The passing through of the list forms and creating an instance of the class for each form
 */
const initValidation = (forms: NodeListOf<HTMLFormElement>) =>
  Array.prototype.forEach.call(forms, (item: HTMLFormElement) => new Validation(item));

/* Find all forms on the page */
const validation = (config: Config = {}): void => {
  if (typeof window === 'undefined') {
    outputErrors.outputWarningToConsole(
      'Sorry but this library is designed to work in the browser!',
    );
    return;
  }

  const forms = document.querySelectorAll('form[data-validation=true]') as HTMLFormElement;
  if ('lang' in config) {
    store.setCurrentLanguage(config.lang as string);
  }

  const listOfChecks = config.listOfChecks as Check[];
  if (listOfChecks.length) {
    listOfChecks.map((item: CheckItem) => {
      typesValidation[item.name] = item;
      item.typeField.forEach((i: string) => configValidation[i].push(item.name));
    });
  }
  initValidation(forms);
};

export default validation;
