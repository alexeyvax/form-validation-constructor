import typesValidation from './typesValidation';

/**
 * Determines error on ordinary field
 * 
 * @param dataInput {Object}
 * @param storeErrors {Map}
 * @returns storeErrors {Map}
 */
function checkValue( dataInput, storeErrors )
{
	const length = Object.keys( dataInput ).length;
	
	for ( let i = 0; i < length; i++ )
	{
		const data = dataInput[i];
		const element = data['input'];
		const config = data['config'];
		const instructions = `instructions-${data['lang']}`;
		let message = '';
		
		const getMessage = ( item ) =>
		{
			const checker = typesValidation[item];
			
			if ( checker )
			{
				const result = checker.validate( element );
				
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
		
		if ( config )
		{
			config.some( getMessage );
		}
		
		storeErrors.set( element, message );
	}
	
	return storeErrors;
}

export {
	checkValue as default,
}
