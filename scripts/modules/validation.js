import Validation from '../classes/Validation';
import typesValidation from '../function/typesValidation';
import configValidation from '../function/configValidation';

/**
 * Find all forms on the page
 */
function validation( config )
{
	const forms = document.querySelectorAll( 'form[data-validation=true]' );
	
	for ( let key in config )
	{
		const type = config[key]['typeField'];
		const name = config[key]['checkName'];
		
		configValidation[type].push( name );
	}
	
	Object.assign( typesValidation, config );
	
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
