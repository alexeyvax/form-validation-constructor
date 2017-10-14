import Validation from '../classes/Validation';
import typesValidation from '../function/typesValidation';
import configValidation from '../function/configValidation';
import { EN } from '../constants/index';

/**
 * The passing through of the list forms and creating an instance of the class for each form
 * 
 * @param forms список форм {NodeListOf<HTMLFormElement>}
 */
const initValidation = forms =>
  Array.prototype.forEach.call(forms, item => new Validation(item));

/* Find all forms on the page */
const validation = (config = {}) => {
  if (typeof window === 'undefined') {
    console.error('Sorry but this library is designed to work in the browser!');
    return;
  }

  const forms = document.querySelectorAll('form[data-validation=true]');
  if (config.lang) {
    typesValidation.lang = config.lang;
  } else {
    const htmlLang = document.documentElement.lang;
    typesValidation.lang = (htmlLang) || EN;
  }
  const configToArray = Object.values(config);
  if (configToArray.length) {
    configToArray.map(({ typeField, checkName }) =>
      typeField.forEach(i => configValidation[i].push(checkName)));
    Object.assign(typesValidation, config);
  }
  initValidation(forms);
};

export default validation;
