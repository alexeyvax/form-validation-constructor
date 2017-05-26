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
		const firstElement = messages.keys().next().value;
		const currentForm = firstElement.closest('form');
		
		messages.forEach((value, key, map) => {
			const element = key;
			const message = value;
			
			if (message) {
				if (!this.storeCreateElements.has(element)) {
					this.errorNotificationElement = {
						newElement: this.createErrorElement(element, message),
						message: message,
					};
					
					this.storeCreateElements.set(element, this.errorNotificationElement);
				} else if (this.storeCreateElements.get(element)['message'] !== message) {
					this.storeCreateElements.get(element)['newElement'].textContent = message;
					this.storeCreateElements.get(element)['message'] = message;
				}
			} else {
				if (this.storeCreateElements.has(element)) {
					const notifyElement = this.storeCreateElements.get(element)['newElement'];
					notifyElement.classList.add('hide');
					
					setTimeout(() => {
						element.parentElement.removeChild(notifyElement);
						this.storeCreateElements.delete(element);
					}, 100);
				}
			}
		});
		
		if (this.storeCreateElements.size === 0) {
			currentForm.submit();
		}
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
		span.classList.add('notify');
		setTimeout(() => span.classList.add('show'), 0);
		span.textContent = message;
		element.parentElement.insertBefore(span, element);
		return span;
	}
}

export default OutputErrors;
