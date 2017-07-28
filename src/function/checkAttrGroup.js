import { IS_EMPTY_GROUP } from '../constants/index';

/**
 * Determines field in the group or ordinary
 * 
 * @param item {HTMLInputElement}
 * @returns true or false {boolean}
 */
const checkAttrGroup = item => item === IS_EMPTY_GROUP;

export default checkAttrGroup;
