import typesValidation from './typesValidation';
import { IS_EMPTY_GROUP, INSTRUCTION_EN } from '../constants/index';

/**
 * Field group check
 * 
 * @param groupRadio {Array}
 * @param storeErrors {Map}
 * @returns storeErrors {Map}
 */
function checkValueGroup(groupRadio, storeErrors) {
	groupRadio.forEach(arr => {
		const message = getMessage(arr)
		storeErrors.set(arr[0], message);
	});
	return storeErrors;
}

/**
 * Get message about error
 * 
 * @param arr {Array}
 * @returns message {String}
 */
function getMessage(arr) {
	let message = '';
	
	const checkValue = item => {
		const checker = typesValidation[IS_EMPTY_GROUP];
		
		if (checker) {
			const result = checker.validate(arr);
		
			if (!result) {
				message = checker[INSTRUCTION_EN];
				return true;
			}
		}
		return false;
	};
	
	arr && arr.some(checkValue);
	return message;
}

export default checkValueGroup;
