# form-validation-constructor

The simple library-constructor for validation form on the client side.

Constructor is based on a "strategy" pattern. That makes it possible to
substitution checks necessary to fit the input fields.

form-validation-constructor is not a complete replacement native browser's validation, but rather to complement
existing checks. For example, the Safari browser does not support **required** attribute, constructor 
will help in checking and it will work as intended.

[Russian version README](https://github.com/alexeyvax/form-validation-constructor/blob/master/README_RU.md)

## Show example

You need clone repository and enter to console

	npm install

and after 

	npm start


## Install

library installed you can download it

	npm install --save form-validation-constructor

After download you need to connect
It is best to connect your root file, which connect all scripts
for example:

	// index.js or main.js
	// to connect
	import validationForm from 'form-validation-constructor';
	
	// to run
	validationForm();

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

The idea is you can write your checks in the file *"typesValidation.js"* 
and *"configValidation.js"* file to specify the name of the check corresponding to the field type.

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


