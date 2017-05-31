import typesValidation from './typesValidation';

/**
 * Determines error on ordinary field
 * 
 * @param dataInput {Object}
 * @param storeErrors {Map}
 * @returns storeErrors {Map}
 */
function checkValue(dataInput, storeErrors) {
	const toArray = Object.keys(dataInput);
	const instructions = `instructions-${typesValidation.lang}`;
	
	toArray.length && toArray.forEach(elem => {
		const data = dataInput[elem];
		const element = data.inputElement;
		const config = data.config;
		let message = '';
		
		config.length && config.some(item => {
			const checker = typesValidation[item];
			if (checker) {
				const result = checker.validate(element);
				if (!result) {
					message = checker[instructions];
					return true;
				}
			}
			return false;
		});
		storeErrors.set(element, message);
	});
	return storeErrors;
}

export default checkValue;
