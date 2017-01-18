# form-validation-constructor

The simple library-constructor for validation form on the client side.

Constructor is based on a "strategy" pattern. That makes it possible to
substitution checks necessary to fit the input fields.

form-validation-constructor to complement native browser's validation its custom checks and to replace them.

In the section [how to add a custom check](#add-custom-ckeck), you can see an example
add your own inspection to check items.

[Russian version README](https://github.com/alexeyvax/form-validation-constructor/blob/master/README_RU.md)


## Show example

![Example](https://github.com/alexeyvax/form-validation-constructor/blob/master/example/example1.gif)

You need clone repository and enter to console

	npm install

after 

	npm start

and open in your browser file index.html


## Install

library installed you can download it

	npm install --save form-validation-constructor

After download you need to connect
It is best to connect your root file, which connect all scripts
for example:

	// index.js or main.js
	// to connect
	import formValidationConstructor from 'form-validation-constructor';
	
	// to run
	formValidationConstructor();

or 

**download script** form-validation-constructor

[version form-validation-constructor.js](https://github.com/alexeyvax/form-validation-constructor/blob/master/download/form-validation-constructor.js)
<br />
[version form-validation-constructor.min.js](https://github.com/alexeyvax/form-validation-constructor/blob/master/download/form-validation-constructor.min.js)

and connect script

	// index.html
	<script src="your-way/form-validation-constructor.min.js"></script>


## Instructions for use

To begin, add a form on the page

	// index.html
	<form name="form" action="/" method="post"></form>

To check the form, you must indicate her **data** attribute **data-validation="true"**

	<form name="form" action="/" method="post" data-validation="true"></form>

Now the form is added to the list of scanned, after you need to add in the form input fields, for example, 
we have a simple form consisting of three fields: name, email, and confirmation of the agreement.

Write as follows:

	<form name="form" action="/" method="post" data-validation="true">
		// name
		<label for="name">Name user</label>
		<input type="text" name="name" id="name" data-options="isNonEmpty onlyLetters" placeholder="Name *" />
		// email
		<label for="email">Email address</label>
		<input type="email" name="email" id="email" data-options="isNonEmpty isEmailCorrect" placeholder="Email *" />
		// agreement
		<label for="agreement">I agree to the processing of...</label>
		<input type="checkbox" name="agreement" id="agreement" data-options="isRequired" />
	</form>

In the first field you must enter a name, which contains only letters, without special characters. 
To do this, add an attribute **data-options="isNonEmpty onlyLetters"** needed checks.

In the second field **input type="email"** we use a check on emptiness and on the correctness of the entered email address.

The third field is a checkbox with the consent of, to the check you need to add attribute 
**data-options="isRequired"** and then the field will be required to fill. 
Important factor, attribute **"isRequired"** only works for input fields with types **checkbox** or **radio**.

**An important addition** in the data attribute **data-options** you can add any number of relevant
checks by listing them separated by spaces, for example:

	data-options="isNonEmpty onlyLetters"

If you make a **mistake** or not to the type of field check, then a warning will be printed to the console
describing the error.

If the form is optional fields, then just do not use them attribute **data-options**

Tooltips are currently available in English and Russian languages. Language tooltips to fit is the language which 
the attribute **lang** in the tag **html**

	<html lang="en">

The default language is English 'en'.

### <a name="add-custom-ckeck"></a> How to add a custom check

The idea is you can add a custom check to its existing, writing it as follows
and pass the first argument when the script is embedded 

example:

	// list of custom checks {Object}
	const myCustomChecks = {
		// the name of your check
		'isTestCheck': {
			// types of fields which will be applied verification (listed in the array {Array})
			'typeField': [
				'text',
				'number'
			],
			// the name of your check
			'checkName': 'isTestCheck',
			// check function, checked element receives input {HTMLInputElement}
			// returned true or false {Boolean}
			validate: function ( input )
			{
				return input.value !== '';
			},
			// error output text in your language 
			// name has two parts **instructions** и **en** 
			// the language which the attribute **lang** in the tag **html**, you can specify multiple 
			'instructions-ru': 'это поле не может быть пустым.',
			'instructions-en': 'This field can not be empty.'
		}
	};
	
	// when the script is run pass argument
	formValidationConstructor( myCustomChecks );

and now you can add a check to the element

	<input type="text" name="name" id="name" data-options="isTestCheck" placeholder="Name *" />


## The list of existing checks

* **isNonEmpty** - check field on the empty (analogue input **required** for all fields except **ckeckbox** and **radio**)
* **isValidNumber** - check of the number
* **isEmailCorrect** - check the validity of the entered email address
* **isValidTel** - check on the validity of the entered phone number
* **isValidUrl** - check on the validity of the entered url address
* **onlyLetters** - check on the entered letters without special characters
* **minMax** - check for compliance with the number of not less than min and not more than max (works if given
			and **min** and **max** at the input **type = "number"**)
* **min** - check for compliance of not less than min (for input **type="number"**)
* **max** - check for compliance of not more than max (for input **type = "number"**)
* **isRequired** - check activation of the required field (for **checkbox** or **radio**)
* **group** - check the activation of elements of at least one of the groups (for **checkbox** or **radio**)

## A complete table of the checks

| **type of field** | **existing checks** |
| ----------------- | ------------------- |
| text              | isNonEmpty          |
|                   | onlyLetters         |
| number            | isNonEmpty          |
|                   | isValidNumber       |
|                   | minMax              |
|                   | min                 |
|                   | max                 |
| email             | isNonEmpty          |
|                   | isEmailCorrect      |
| password          | isNonEmpty          |
| file              | isNonEmpty          |
| search            | isNonEmpty          |
|                   | onlyLetters         |
| tel               | isNonEmpty          |
|                   | isValidTel          |
| url               | isNonEmpty          |
|                   | isValidUrl          |
| checkbox          | isRequired          |
|                   | group               |
| radio             | isRequired          |
|                   | group               |

## License

[MIT](https://github.com/alexeyvax/form-validation-constructor/blob/master/LICENSE.md)
