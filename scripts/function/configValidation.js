/**
 * Checks distributed depending on the type of field
 * 
 * config {Object}
 */
const config = {
	/** inpyt type="text" */
	text: [
		'isNonEmpty',
		'onlyLetters'
	],
	/** inpyt type="number" */
	number: [
		'isNonEmpty',
		'isValidNumber',
		'minMax',
		'min',
		'max'
	],
	/** inpyt type="email" */
	email: [
		'isNonEmpty',
		'isEmailCorrect'
	],
	/** inpyt type="password" */
	password: [
		'isNonEmpty'
	],
	/** inpyt type="file" */
	file: [
		'isNonEmpty'
	],
	/** inpyt type="search" */
	search: [
		'isNonEmpty',
		'onlyLetters'
	],
	/** inpyt type="tel" */
	tel: [
		'isNonEmpty',
		'isValidTel'
	],
	/** inpyt type="url" */
	url: [
		'isNonEmpty',
		'isValidUrl'
	],
	/** inpyt type="checkbox" */
	checkbox: [
		'isRequired',
		'group'
	],
	/** inpyt type="radio" */
	radio: [
		'isRequired',
		'group'
	]
};

export {
	config as default,
}
