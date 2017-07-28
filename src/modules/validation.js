import Validation from '../classes/Validation';
import typesValidation from '../function/typesValidation';
import configValidation from '../function/configValidation';
import { EN } from '../constants/index';

/**
 * The passing through of the list forms and creating an instance of the class for each form
 * 
 * @param forms список форм {NodeListOf<HTMLFormElement>}
 */
function initValidation(forms) {
  Array.prototype.forEach.call(
    forms,
    item => new Validation(item),
  );
}

/* Find all forms on the page */
function validation(config = {}) {
  if (typeof window === 'undefined') {
    console.error('Sorry but this library is designed to work in the browser!');
    return;
  }

  const forms = document.querySelectorAll('form[data-validation=true]');
  if (config.lang) {
    typesValidation.lang = config.lang;
  } else {
    const getHtmlLang = document.documentElement.lang;
    typesValidation.lang = (getHtmlLang) || EN;
  }
  const configToArray = Object.values(config);
  if (configToArray.length) {
    configToArray.map((item) => {
      const types = item.typeField;
      const name = item.checkName;
      return types.forEach(i => configValidation[i].push(name));
    });
    Object.assign(typesValidation, config);
  }
  initValidation(forms);
}

export default validation;