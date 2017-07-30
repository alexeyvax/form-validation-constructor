# form-validation-constructor

The simple library-constructor which use validation form on the client side.
Constructor based on a "strategy" pattern and It could add your personal check form.

form-validation-constructor complement native browser's validation
or replace it with custom checks.

On the section [how to add a custom check](#add-custom-ckeck), you could see an example which
add your own inspection to the list of checks.

[Russian version README](https://github.com/alexeyvax/form-validation-constructor/blob/master/README_RU.md)

## Pay attention please 

This isn't final version constructor.

It may not work correctly.

This project is currently being developed.

## Show example

![Example1](https://github.com/alexeyvax/form-validation-constructor/blob/master/gif-example/example1.gif)

```javascript

// You`ll could clone repository and enter on console

npm install

// after

npm start

```

and open on your browser file **index.html**


## Install with npm

You`ll could install library with npm

```javascript
npm install --save form-validation-constructor
```

You could connect to your project after install
The best place to the connect your root file, which connected all scripts
example:

```javascript
// index.js or main.js
// to connect
import formValidationConstructor from 'form-validation-constructor';

// to run
formValidationConstructor();
```

or

**download script** form-validation-constructor

version [form-validation-constructor.js](https://github.com/alexeyvax/form-validation-constructor/blob/master/download/form-validation-constructor.js)
<br />
version [form-validation-constructor.min.js](https://github.com/alexeyvax/form-validation-constructor/blob/master/download/form-validation-constructor.min.js)

and connect script

```javascript
// index.html
<script src="your-path/form-validation-constructor.min.js"></script>
```

## Instructions for use

At first, you will could add form on your page

```javascript
// index.html
<form name="form" action="/" method="post"></form>
```

now you need to add **data** attribute **data-validation="true"**

```javascript
<form name="form" action="/" method="post" data-validation="true"></form>
```

Form added to the list of scanned, after you will need add input fields in the form, example: 
We have simple form with three fields: name, email, and confirmation of the agreement.

```javascript
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
```

You will need enter name in the first field, which contain only letters, without special characters. 
You will need add checks on attribute **data-options="isNonEmpty onlyLetters"**.

The second field **input type="email"** 
We use check on emptiness and on the correctness of the entered email address.

The third field is a checkbox with the agreement. You will need add check on attribute 
**data-options="isRequired"** and then field will be required to fill. 
Important factor, attribute **"isRequired"** works only input fields with types **checkbox** or **radio**.

**An important addition** the data attribute **data-options** you could add any checks and 
separate them by space, example:

```javascript
data-options="isNonEmpty onlyLetters email"
```

If you make a **mistake** you will see warning with description about error in the console

![Example error 1](https://github.com/alexeyvax/form-validation-constructor/blob/master/gif-example/example-error.png)

If the form have got optional field, just don`t use attribute **data-options**

### Set language for tooltips

Tooltips are currently available in English and Russian languages.
Language tooltips fit is the language which 
is passed when the script is initialized, example: 

```javascript
formValidationConstructor({ lang: 'en' });
```

or the installed language in the attribute **lang** on the tag **html**

```javascript
<html lang="en">
```

If the language isn't initialized or isn't set in the **lang** attribute,
Then the default language is English **'en'**'.

### <a name="add-custom-ckeck"></a> How to add a custom check

You will could add personal check to existing checks.
You will could add your personal check on the first argument

example:

```javascript
// list of personal checks {Object}
const myPersonalChecks = {
  // the name of your check
  isTestCheck: {
    // set english for tooltips
    lang: 'en',
    // types of fields which will be applied verification (listed in the array {Array})
    typeField: [
      'text',
      'number',
    ],
    // the name of your check
    checkName: 'isTestCheck',
    // check function, checked element receives input {HTMLInputElement}
    // return true or false {Boolean}
    validate(input) {
      return input.value !== '';
    },
    // error output text on your language 
    // name has two parts **instructions** and **en** 
    // the language which the attribute **lang** on the tag **html**, you can specify multiple 
    'instructions-ru': 'это поле не может быть пустым.',
    'instructions-en': 'This field can not be empty.',
  },
};

// enter first argument
formValidationConstructor(myPersonalChecks);
```

and now you will could add check to the element

```javascript
<input type="text" name="name" id="name" data-options="isTestCheck" placeholder="Name *" />
```

### Create a group for items with a checkbox type

All items with the checkbox type that will be in the same group,
you need to add the data attribute **data-groupname = ""** 
with the group name and data attribute **data-options = "isEmptyGroup"**
To verify that at least one checkbox is selected.

example:
```javascript
<input type="checkbox" name="checkbox-first" data-groupname="one" data-options="isEmptyGroup" />
<input type="checkbox" name="checkbox-second" data-groupname="one" data-options="isEmptyGroup" />
<input type="checkbox" name="checkbox-third" data-groupname="one" data-options="isEmptyGroup" />
```

## The list of existing checks

* **isNonEmpty** - field check for emptiness (analogue input **required** all fields except **ckeckbox** and **radio**)
* **isValidNumber** - check of the number
* **isEmailCorrect** - check the validity of the entered email address
* **isValidTel** - check on the validity of the entered phone number
* **isValidUrl** - check on the validity of the entered url address
* **onlyLetters** - check on the entered letters without special characters
* **minMax** - check compliance with the number of not less than min and not more than max (works if given and **min** and **max** at the input **type = "number"**)
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
