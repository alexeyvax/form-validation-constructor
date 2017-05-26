import typesValidation from './typesValidation';

/**
 * Determines error on ordinary field
 * 
 * @param dataInput {Object}
 * @param storeErrors {Map}
 * @returns storeErrors {Map}
 */
function checkValue(dataInput, storeErrors) {
	const length = Object.keys(dataInput).length;
	console.log(length);
	for (let i = 0; i < length; i++){
		const data = dataInput[i];
		const element = data['input'];
		const config = data['config'];
		const instructions = `instructions-${data['lang']}`;
		let message = '';
		
		const getMessage = item => {
			const checker = typesValidation[item];
			if (checker) {
				const result = checker.validate(element);
				
				if (!result) {
					message = checker[instructions];
					return true;
				}
			}
			return false;
		};
		
		config && config.some(getMessage);
		storeErrors.set(element, message);
	}
	return storeErrors;
}

export default checkValue;
