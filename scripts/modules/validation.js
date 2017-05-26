import Validation from '../classes/Validation';
import typesValidation from '../function/typesValidation';
import configValidation from '../function/configValidation';

/**
 * Find all forms on the page
 */
function validation(config) {
	const forms = document.querySelectorAll('form[data-validation=true]');
	
	if (config) {
		for (let key in config) {
			const types = config[key]['typeField'];
			const name = config[key]['checkName'];
			types.forEach(item => configValidation[item].push(name));
		}
		
		Object.assign(typesValidation, config);
	}
	
	initValidation(forms);
}

/**
 * The passing through of the list forms and creating an instance of the class for each form
 * 
 * @param forms список форм {NodeListOf<HTMLFormElement>}
 */
function initValidation(forms) {
	Array.prototype.forEach.call(
		forms,
		item => new Validation(item)
	);
}

export default validation;
