/**
 * Determines field in the group or ordinary
 * 
 * @param item {HTMLInputElement}
 * @returns true or false {boolean}
 */
const checkAttrGroup = ( item ) =>
{
	if ( item === 'group' )
	{
		return true;
	}
	else
	{
		return false;
	}
}

export {
	checkAttrGroup as default,
}
