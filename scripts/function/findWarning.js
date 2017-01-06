import configValidation from './configValidation';

/**
 * Find and out warnings
 * 
 * @param element {HTMLInputElement}
 * @param arr {Array}
 * @returns mediateArray {Array}
 */
function findWarning( element, arr )
{
	const name = element.name;
	const type = element.type;
	const mediateArray = [];
	
	arr.forEach(
		( item ) =>
		{
			if ( configValidation[type].indexOf( item ) !== -1 )
			{
				mediateArray.push( item );
			}
			else
			{
				console.error(
					`Warning: field named "${name}" with type="${type}". data-options can not contain check to "${item}"`
				);
			}
		}
	);
	
	return mediateArray;
}

export {
	findWarning as default,
}
