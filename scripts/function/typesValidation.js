/**
 * Contains embedded objects that contain check methods and a description of errors
 * 
 * types {Object} 
 */

const types = {
	/**
	 * Check field on the empty
	 * 
	 * @param input {HTMLInputElement}
	 * @returns true or false {boolean}
	 */
	isNonEmpty: {
		validate: function ( input )
		{
			return input.value !== '';
		},
		'instructions-ru': 'это поле не может быть пустым.',
		'instructions-en': 'This field can not be empty.'
	},
	/**
	 * Check on the entered letters without special characters
	 * 
	 * @param input {HTMLInputElement}
	 * @returns true or false {boolean}
	 */
	onlyLetters: {
		validate: function ( input )
		{
			return !/[^a-zа-яё ]/gi.test( input.value );
		},
		'instructions-ru': 'значением может быть только буквы от "а" до "я".',
		'instructions-en': 'value can only be the letters "a" to "z".'
	},
	/**
	 * Check of the number
	 * 
	 * @param input {HTMLInputElement}
	 * @returns true or false {boolean}
	 */
	isValidNumber: {
		validate: function ( input )
		{
			return !isNaN( input.value );
		},
		'instructions-ru': 'значением может быть только число­, например 1, 3.14 или 2010',
		'instructions-en': 'value can only be a number, such as 1, 3.14 or 2010'
	},
	/**
	 * Check for compliance with the number of not less than min and not more than max 
	 * (works if given and min and max at the input type = "number")
	 * 
	 * @param input {HTMLInputElement}
	 * @returns true or false {boolean}
	 */
	minMax: {
		validate: function ( input )
		{
			const min = Number( input.min );
			const max = Number( input.max );
			const value = Number( input.value );
			
			if ( min > value 
				|| value > max )
			{
				return false;
			}
			
			return true;
		},
		'instructions-ru': 'значением может быть только число не меньше min и не больше max',
		'instructions-en': 'value can only be a number no less and no more than min max'
	},
	/**
	 * Check for compliance of not less than min (for input type="number")
	 * 
	 * @param input {HTMLInputElement}
	 * @returns true or false {boolean}
	 */
	min: {
		validate: function ( input )
		{
			const min = Number( input.min );
			const value = Number( input.value );
			
			if ( min > value )
			{
				return false;
			}
			
			return true;
		},
		'instructions-ru': 'значением может быть только число не меньше min',
		'instructions-en': 'value can only be a number not less than min'
	},
	/**
	 * Check for compliance of not more than max (for input type = "number")
	 * 
	 * @param input {HTMLInputElement}
	 * @returns true or false {boolean}
	 */
	max: {
		validate: function ( input )
		{
			const max = Number( input.max );
			const value = Number( input.value );
			
			if ( value > max )
			{
				return false;
			}
			
			return true;
		},
		'instructions-ru': 'значением может быть только число не больше max',
		'instructions-en': 'value can only be a number not more than max'
	},
	/**
	 * Check the validity of the entered email address
	 * 
	 * @param input {HTMLInputElement}
	 * @returns true or false {boolean}
	 */
	isEmailCorrect: {
		validate: function ( input )
		{
			return /^.+@.+$/.test( input.value );
		},
		'instructions-ru': 'введите корректный email',
		'instructions-en': 'enter a valid email'
	},
	/**
	 * Check on the validity of the entered phone number
	 * 
	 * @param input {HTMLInputElement}
	 * @returns true or false {boolean}
	 */
	isValidTel: {
		validate: function ( input )
		{
			return !/[^0-9 .()*+-]/g.test( input.value );
		},
		'instructions-ru': 'введите корректный телефон',
		'instructions-en': 'enter a valid phone'
	},
	/**
	 * Check on the validity of the entered url address
	 * 
	 * @param input {HTMLInputElement}
	 * @returns true or false {boolean}
	 */
	isValidUrl: {
		validate: function ( input )
		{
			return /^(https?|s?ftp|file):\/\/[a-zа-яё_-]+[\a-zа-яё\.]{2,6}\??([a-zа-яё_-]+)\#?([a-zа-яё_-]+)/g.test( input.value );
		},
		'instructions-ru': 'введите корректный url',
		'instructions-en': 'enter a valid url'
	},
	/**
	 * Check activation of the required field (for checkbox or radio)
	 * 
	 * @param input {HTMLInputElement}
	 * @returns true or false {boolean}
	 */
	isRequired: {
		validate: function ( input )
		{
			return input.checked;
		},
		'instructions-ru': 'для продолжения активируйте обязательное поле',
		'instructions-en': 'for to continue activate a mandatory field'
	},
	/**
	 * Check the activation of elements of at least one of the groups (for checkbox or radio)
	 * 
	 * @param array {Array}
	 * @returns rezult {boolean}
	 */
	isEmptyGroup: {
		validate: function( array )
		{
			const rezult = array.some(
				( item ) =>
				{
					if ( item.checked )
					{
						return true;
					}
					else
					{
						return false;
					}
				}
			);
			
			return rezult;
		},
		'instructions-ru': 'необходимо выбрать хоть один пункт',
		'instructions-en': 'you need to select at least one item'
	}
};

export {
	types as default,
}
