# form-validation-constructor

The simple library-constructor use for validation form on the client side.
Constructor was based on a "strategy" pattern. The Constructor can add your personal check form.

form-validation-constructor complement native browser's validation or replace them his custom checks.

On the section [how to add a custom check](#add-custom-ckeck), you can see an example which
add your own inspection to the list of checks.

[Russian version README](https://github.com/alexeyvax/form-validation-constructor/blob/master/README_RU.md)


## Show example

![Example1](https://github.com/alexeyvax/form-validation-constructor/blob/master/gif-example/example1.gif)

You`ll need clone repository and enter on console

	npm install

after 

	npm start

and open on your browser file **index.html**


## Install

You`ll can install library

	npm install --save form-validation-constructor

After install you need connect to your project
The best place to connect your root file, which connected all scripts
example:

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

At first, add form on your page

	// index.html
	<form name="form" action="/" method="post"></form>

now you must add **data** attribute **data-validation="true"**

	<form name="form" action="/" method="post" data-validation="true"></form>

Form was add to the list of scanned, after you need add input fields in the form, example: 
We had simple form contain three fields: name, email, and confirmation of the agreement.

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

You must enter name in the first field, which contain only letters, without special characters. 
You need add checks on attribute **data-options="isNonEmpty onlyLetters"**.

The second field **input type="email"** 
We use check on emptiness and on the correctness of the entered email address.

The third field is a checkbox with the agreement. You need add check on attribute 
**data-options="isRequired"** and then field will be required to fill. 
Important factor, attribute **"isRequired"** works only input fields with types **checkbox** or **radio**.

**An important addition** the data attribute **data-options** you can add any checks and 
separate them by space, example:

	data-options="isNonEmpty onlyLetters email"

If you make a **mistake** you will see warning with description about error on the console

![Example error 1](https://github.com/alexeyvax/form-validation-constructor/blob/master/gif-example/example-error.png)

If the form have got optional field, just don`t use attribute **data-options**

Tooltips are currently available in English and Russian languages. Language tooltips fit is the language which 
the attribute **lang** on the tag **html**

	<html lang="en">

The default language is English **'en'**.

### <a name="add-custom-ckeck"></a> How to add a custom check

You can add a personal check to existing checks.
You can add your personal check on the first argument

example:

	// list of personal checks {Object}
	const myPersonalChecks = {
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
			// return true or false {Boolean}
			validate: function ( input )
			{
				return input.value !== '';
			},
			// error output text on your language 
			// name has two parts **instructions** and **en** 
			// the language which the attribute **lang** on the tag **html**, you can specify multiple 
			'instructions-ru': 'это поле не может быть пустым.',
			'instructions-en': 'This field can not be empty.'
		}
	};
	
	// enter first argument
	formValidationConstructor( myCustomChecks );

and now you can add check to the element

	<input type="text" name="name" id="name" data-options="isTestCheck" placeholder="Name *" />


## The list of existing checks

* **isNonEmpty** - check field on the empty (analogue input **required** all fields except **ckeckbox** and **radio**)
* **isValidNumber** - check of the number
* **isEmailCorrect** - check the validity of the entered email address
* **isValidTel** - check on the validity of the entered phone number
* **isValidUrl** - check on the validity of the entered url address
* **onlyLetters** - check on the entered letters without special characters
* **minMax** - check compliance with the number of not less than min and not more than max (works if given
			and **min** and **max** at the input **type = "number"**)
* **min** - check compliance of not less than min (input **type="number"**)
* **max** - check compliance of not more than max (input **type = "number"**)
* **isRequired** - check activation required field (**checkbox** or **radio**)
* **group** - check activation elements at least one of the groups (**checkbox** or **radio**)

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
