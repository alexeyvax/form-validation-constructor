import outputErrors from '../classes/OutputErrors';
import store from '../classes/Store';
import Validation from '../classes/Validation';
import { EN } from '../constants';
import parseListOfChecks from '../function/parseListOfChecks';
import { Config } from './../interfaces';

const validation = (config: Config = {}): void => {
  if (typeof window === 'undefined') {
    outputErrors.outputWarningToConsole(
      'Sorry but this library is designed to work in the browser!',
    );
    return;
  }

  if ('lang' in config) {
    store.setCurrentLanguage(config.lang as string);
  } else {
    store.setCurrentLanguage(document.documentElement.lang || EN);
  }

  if ('listOfChecks' in config) {
    parseListOfChecks(config);
  }

  Array.prototype.forEach.call(
    document.querySelectorAll('form[data-validation=true]'),
    (item: HTMLFormElement) => new Validation(item));
};

export default validation;
