import typesValidation from './typesValidation';
import { IS_EMPTY_GROUP } from '../constants/index';

/**
 * Field group check
 * 
 * @param groupRadio {Array}
 * @param storeErrors {Map}
 * @returns storeErrors {Map}
 */
function checkValueGroup(groupRadio, storeErrors) {
	const instructions = `instructions-${typesValidation.lang}`;
	
	groupRadio.length && groupRadio.forEach(arr => {
		const message = getMessage(arr, instructions);
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
function getMessage(arr, instructions) {
	let message = '';
	
	arr.length && arr.some(item => {
		const checker = typesValidation[IS_EMPTY_GROUP];
		
		if (checker) {
			const result = checker.validate(arr);
		
			if (!result) {
				message = checker[instructions];
				return true;
			}
		}
		return false;
	});
	return message;
}

export default checkValueGroup;
