import debounce from '../function/debounce';
import typesValidation from '../function/typesValidation';
import findWarning from '../function/findWarning';
import checkValue from '../function/checkValue';
import checkAttrGroup from '../function/checkAttrGroup';
import sortGroups from '../function/sortGroups';
import checkValueGroup from '../function/checkValueGroup';
import Store from './Store';

/**
* @class Validation
 * 
 * The main class for validation form
 */
class Validation
{
	/**
	 * Creates an instance of Validation.
	 * 
	 * @param form {HTMLFormElement}
	 */
	constructor( form )
	{
		this.form = form;
		this.listInputElement = form.querySelectorAll( 
			`input[type=text], input[type=number], input[type=email], input[type=password], input[type=file], 
			input[type=search], input[type=tel], input[type=url], input[type=checkbox], input[type=radio]` );
		
		this.store = new Store();
		this.storeErrors = new Map();
		
		this.groupsElements = [];
		this.dataInput = Object.create( null );
		/** Is this first press to send form? */
		this.isFirst = true;
		
		this.registerHandlers();
	}
	
	/**
	 * Registed handlers
	 */
	registerHandlers()
	{
		this.init();
		this.form.addEventListener( 'submit', ( event ) => this.validation( event ) );
	}
	
	/**
	 * Passes through the list of forms of gathering data about each
	 */
	init()
	{
		const lang = document.documentElement.lang;
		const arrayInputElement = [];
		const listGroups = [];
		
		Array.prototype.filter.call(
			this.listInputElement,
			( input ) =>
			{
				const dataset = input.dataset['options'];
				
				if ( dataset )
				{
					if ( input.type === 'radio' 
						|| input.type === 'checkbox' )
					{
						const datasetToArray = dataset.split(' ');
						const config = findWarning( input, datasetToArray );
						const isGroup = datasetToArray.some( checkAttrGroup );
						
						if ( isGroup )
						{
							listGroups.push( input );
							
							return true;
						}
						else
						{
							arrayInputElement.push( input );
							
							return false;
						}
					}
					else
					{
						arrayInputElement.push( input );
						
						return false;
					}
				}
			}
		);
		
		this.groupsElements = sortGroups( listGroups );
		
		arrayInputElement.forEach(
			( input, index ) =>
			{
				const dataset = input.dataset['options'];
				let config;
				
				if ( dataset )
				{
					const datasetToArray = dataset.split(' ');
					
					config = findWarning( input, datasetToArray );
				}
				
				this.dataInput[index] = {
					input: input,
					name: input.name,
					config: config,
					lang: lang
				}
			}
		);
	}
	
	/**
	 * Checks forms
	 * 
	 * @param event {Event}
	 */
	validation( event )
	{
		event.preventDefault();
		
		/** check the ordinary fields */
		let storeErrors = checkValue( this.dataInput, this.storeErrors );
		
		/** checking the group fields */
		storeErrors = checkValueGroup( this.groupsElements, this.storeErrors );
		
		this.store.getMessage( storeErrors );
		
		if ( this.isFirst )
		{
			this.form.addEventListener( 'input', debounce(( event ) => this.validation( event ), 100, true));
			this.form.addEventListener( 'change', debounce(( event ) => this.validation( event ), 100, true));
			this.isFirst = false;
		}
	}
}

export {
	Validation as default,
}
