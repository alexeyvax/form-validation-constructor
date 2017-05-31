import OutputErrors from './OutputErrors';

/**
 * Store
 * 
 * @class Store
 */
class Store {
	/**
	 * Creates an instance of Store.
	 */
	constructor() {
		this.outputErrors = new OutputErrors();
	}
	
	/**
	 * Get messages
	 * 
	 * @param messages {Map}
	 */
	getMessage(messages) {
		this.outMessage(messages);
	}
	
	/**
	 * Out messages
	 * 
	 * @param messages {Map}
	 */
	outMessage(messages) {
		this.outputErrors.sortMessages(messages);
	}
}

export default Store;
