import typesValidation from './typesValidation';

/**
 * Field group check
 * 
 * @param groupRadio {Array}
 * @param storeErrors {Map}
 * @returns storeErrors {Map}
 */
function checkValueGroup( groupRadio, storeErrors )
{
	groupRadio.forEach(
		( arr ) =>
		{
			const message = getMessage( arr )
			
			storeErrors.set( arr[0], message );
		}
	);
	
	return storeErrors;
}

/**
 * Get message about error
 * 
 * @param arr {Array}
 * @returns message {String}
 */
function getMessage( arr )
{
	const instructions = `instructions-en`;
	let message = '';
	
	const checkValue = ( item ) =>
	{
		const checker = typesValidation['isEmptyGroup'];
		
		if ( checker )
		{
			const result = checker.validate( arr );
		
			if ( !result )
			{
				const msg = checker[instructions];
				
				message = msg;
				
				return true;
			}
			else
			{
				return false;
			}
		}
		else
		{
			return false;
		}
	};
	
	arr.some( checkValue );
	
	return message;
}

export {
	checkValueGroup as default,
}
