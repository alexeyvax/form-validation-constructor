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
			// console.log(message);
			if (message) {
				if (!this.storeCreateElements.has(element)) {
					this.errorNotificationElement = {
						newElement: this.createErrorElement(element, message),
						message: message,
					};
					this.storeCreateElements.set(element, this.errorNotificationElement);
					// console.log('if');
				} else if (this.storeCreateElements.get(element)['message'] !== message) {
					const notifyElement = this.storeCreateElements.get(element);
					notifyElement['newElement'].textContent = message;
					notifyElement['message'] = message;
					notifyElement['newElement'].classList.add('show');
					// console.log('else if');
				}
			} else {
				if (this.storeCreateElements.has(element)) {
					// console.log('else');
					const notifyElement = this.storeCreateElements.get(element);
					notifyElement['newElement'].textContent = '';
					notifyElement['message'] = '';
					notifyElement['newElement'].classList.remove('show');
					
					// TODO решено сделать так, чтобы при инициализации создавался span и 
					// чтобы он не удалялся, а удалялся textContent в нём
					// Попробовать обойтись без дополнительного Map и setTimeout
				}
			}
			// try {
			// 	throw new Error('oops');
			// } catch (err) {
			// 	console.error(err.message);
			// }
		});
		// console.log(this.storeCreateElements);
		// console.log(messages);
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
