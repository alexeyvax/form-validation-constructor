import debounce from '../function/debounce';
import typesValidation from '../function/typesValidation';
import findWarning from '../function/findWarning';
import checkValue from '../function/checkValue';
import checkAttrGroup from '../function/checkAttrGroup';
import sortGroups from '../function/sortGroups';
import checkValueGroup from '../function/checkValueGroup';
import Store from './Store';

/**
* @class Validation
 * 
 * The main class for validation form
 */
class Validation {
	/**
	 * Creates an instance of Validation.
	 * 
	 * @param form {HTMLFormElement}
	 */
	constructor(form) {
		this.form = form;
		this.listInputElement = form.querySelectorAll(`
			input[type=text],
			input[type=number],
			input[type=email],
			input[type=password],
			input[type=file],
			input[type=search],
			input[type=tel],
			input[type=url],
			input[type=checkbox],
			input[type=radio]
		`);
		
		this.store = new Store();
		this.storeErrors = new Map();
		this.dataSimpleInput = Object.create(null);
		this.dataGroupElements = [];
		/** Is this first press to send form? */
		this.isFormRegisterHandler = false;
		
		this.boundFormInputHandler = debounce(
			event => this.validation(event), 100, true);
		this.boundFormChangeHandler = debounce(
			event => this.validation(event), 100, true);
		
		this.registerHandlers();
	}
	
	/**
	 * Registed handlers
	 */
	registerHandlers() {
		this.init();
		this.form.addEventListener('submit', event => this.validation(event));
	}
	
	formRegisterHandlers() {
		if (!this.isFormRegisterHandler) {
			this.form.addEventListener('input', this.boundFormInputHandler);
			this.form.addEventListener('change', this.boundFormChangeHandler);
			this.isFormRegisterHandler = true;
		}
	}
	
	formUnRegisterHandlers() {
		this.form.removeEventListener('input', this.boundFormInputHandler);
		this.form.removeEventListener('change', this.boundFormChangeHandler);
		this.isFormRegisterHandler = false;
	}
	
	/**
	 * Passes through the list of forms of gathering data about each
	 */
	init() {
		const listGroups = [];
		
		Array.prototype.forEach.call(
			this.listInputElement,
			(inputElement, index) => {
				const dataset = inputElement.dataset['options'];
				
				if (!dataset) {
					return;
				}
				const datasetToArray = dataset.split(' ');
				
				if ((inputElement.type === 'radio')
					|| (inputElement.type === 'checkbox')) {
					const isGroup = datasetToArray.some(checkAttrGroup);
					
					if (isGroup) {
						listGroups.push(inputElement);
						return;
					}
				}
				
				this.dataSimpleInput[index] = {
					inputElement,
					name: inputElement.name,
					config: findWarning(inputElement, datasetToArray),
				};
			}
		);
		this.dataGroupElements = sortGroups(listGroups);
	}
	
	/**
	 * Checks forms
	 * 
	 * @param event {Event}
	 */
	validation(event) {
		event.preventDefault();
		/** check the ordinary fields */
		this.dataSimpleInput[0] && checkValue(this.dataSimpleInput, this.storeErrors);
		/** checking the group fields */
		this.dataGroupElements[0] && checkValueGroup(this.dataGroupElements, this.storeErrors);
		
		this.store.getMessage(this.storeErrors);
		const errors = this.storeErrors.entries();
		// console.log(this.storeErrors);
		for (let [key, value] of errors) {
			if (value !== '') {
				this.formRegisterHandlers();
				return;
			}
		}
		if (event.type === 'submit') {
			this.formUnRegisterHandlers();
			this.form.submit();
		}
	}
}

export default Validation;
