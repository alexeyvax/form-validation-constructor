import { IS_EMPTY_GROUP } from '../constants';

/* Determines field in the group or ordinary */
const checkAttrGroup = (item: string): boolean => item === IS_EMPTY_GROUP;

export default checkAttrGroup;
