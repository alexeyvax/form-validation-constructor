import { addedClasses, removedClasses } from '../function/toggleClasses';
import { CLASS_SHOW, CLASS_NOTIFY } from '../constants/index';

/**
 * Out errors
 * 
 * @class OutputErrors
 */
class OutputErrors {
	/**
	 * Creates an instance of OutputErrors.
	 */
	constructor() {
		/** Store created tooltips */
		this.storeCreateElements = new Map();
		/** Object with input field and message about error */
		this.errorNotificationElement = Object.create(null);
	}
	
	/**
	 * Sort messages and follow actions them
	 * 
	 * @param messages {Map}
	 */
	sortMessages(messages) {
		messages.forEach((message, element, map) => {
			if (message) {
				if (!this.storeCreateElements.has(element)) {
					this.errorNotificationElement = {
						newElement: this.createErrorElement(element, message),
						message: message,
					};
					this.storeCreateElements.set(element, this.errorNotificationElement);
				} else if (this.storeCreateElements.get(element)['message'] !== message) {
					const notifyElement = this.storeCreateElements.get(element);
					notifyElement['newElement'].textContent = message;
					notifyElement['message'] = message;
					addedClasses(notifyElement['newElement'], CLASS_SHOW);
				}
			} else {
				if (this.storeCreateElements.has(element)) {
					const notifyElement = this.storeCreateElements.get(element);
					notifyElement['newElement'].textContent = '';
					notifyElement['message'] = '';
					removedClasses(notifyElement['newElement'], CLASS_SHOW);
				}
			}
		});
	}
	
	/**
	 * Create tooltip with error
	 * 
	 * @param element {HTMLInputElement}
	 * @param message {String}
	 * @returns span {HTMLSpanElement}
	 */
	createErrorElement(element, message) {
		const span = document.createElement('span');
		addedClasses(span, CLASS_NOTIFY);
		setTimeout(() => addedClasses(span, CLASS_SHOW));
		span.textContent = message;
		element.parentElement.insertBefore(span, element);
		return span;
	}
}

export default OutputErrors;
