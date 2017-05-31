import debounce from '../function/debounce';
import typesValidation from '../function/typesValidation';
import findWarning from '../function/findWarning';
import checkValue from '../function/checkValue';
import checkAttrGroup from '../function/checkAttrGroup';
import sortGroups from '../function/sortGroups';
import checkValueGroup from '../function/checkValueGroup';
import Store from './Store';
import { EVENT_SUBMIT, EVENT_INPUT, EVENT_CHANGE, RADIO, CHECKBOX } from '../constants/index';

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
		this.form.addEventListener(EVENT_SUBMIT, event => this.validation(event));
	}
	
	formRegisterHandlers() {
		if (!this.isFormRegisterHandler) {
			this.form.addEventListener(EVENT_INPUT, this.boundFormInputHandler);
			this.form.addEventListener(EVENT_CHANGE, this.boundFormChangeHandler);
			this.isFormRegisterHandler = true;
		}
	}
	
	formUnRegisterHandlers() {
		this.form.removeEventListener(EVENT_INPUT, this.boundFormInputHandler);
		this.form.removeEventListener(EVENT_CHANGE, this.boundFormChangeHandler);
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
				const dataset = inputElement.dataset.options;
				
				if (!dataset) {
					return;
				}
				const datasetToArray = dataset.split(' ');
				
				if ((inputElement.type === RADIO)
					|| (inputElement.type === CHECKBOX)) {
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
		checkValue(this.dataSimpleInput, this.storeErrors);
		/** checking the group fields */
		checkValueGroup(this.dataGroupElements, this.storeErrors);
		
		this.store.getMessage(this.storeErrors);
		
		for (let value of this.storeErrors.values()) {
			if (value !== '') {
				this.formRegisterHandlers();
				return;
			}
		}
		if (event.type === EVENT_SUBMIT) {
			this.formUnRegisterHandlers();
			this.form.submit();
		}
	}
}

export default Validation;
