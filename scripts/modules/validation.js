import Validation from '../classes/Validation';

/**
 * Find all forms on the page
 */
function validation()
{
	const forms = document.querySelectorAll( 'form[data-validation=true]' );
	
	initValidation( forms );
}

/**
 * The passing through of the list forms and creating an instance of the class for each form
 * 
 * @param forms список форм {NodeListOf<HTMLFormElement>}
 */
function initValidation( forms )
{
	Array.prototype.forEach.call(
		forms,
		( item ) =>
		{
			new Validation( item );
		}
	);
}

export {
	validation as default,
}
