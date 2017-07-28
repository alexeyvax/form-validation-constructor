import * as constants from '../constants/index';

/**
 * Checks distributed depending on the type of field
 * 
 * config {Object}
 */
const config = {
  /** inpyt type="text" */
  text: [
    constants.IS_NON_EMPTY,
    constants.ONLY_LETTERS,
  ],
  /** inpyt type="number" */
  number: [
    constants.IS_NON_EMPTY,
    constants.IS_VALID_NUMBER,
    constants.MIN_MAX,
    constants.MIN,
    constants.MAX,
  ],
  /** inpyt type="email" */
  email: [
    constants.IS_NON_EMPTY,
    constants.IS_EMAIL_CORRECT,
  ],
  /** inpyt type="password" */
  password: [
    constants.IS_NON_EMPTY,
  ],
  /** inpyt type="file" */
  file: [
    constants.IS_NON_EMPTY,
  ],
  /** inpyt type="search" */
  search: [
    constants.IS_NON_EMPTY,
    constants.ONLY_LETTERS,
  ],
  /** inpyt type="tel" */
  tel: [
    constants.IS_NON_EMPTY,
    constants.IS_VALID_TEL,
  ],
  /** inpyt type="url" */
  url: [
    constants.IS_NON_EMPTY,
    constants.IS_VALID_URL,
  ],
  /** inpyt type="checkbox" */
  checkbox: [
    constants.IS_REQUIRED,
    constants.IS_EMPTY_GROUP,
  ],
  /** inpyt type="radio" */
  radio: [
    constants.IS_REQUIRED,
    constants.IS_EMPTY_GROUP,
  ],
};

export default config;
