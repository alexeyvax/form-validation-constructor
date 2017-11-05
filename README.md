# form-validation-constructor

The simple library-constructor which validate form on the client side.
Constructor is based on a "strategy" pattern and It can add your personal form check.

form-validation-constructor complemented browser's validation
or replaced it with custom checks.

On the section [how to add a custom check](#add-custom-ckeck), you can see an example which
add your own check to the list of checks.

[Russian version README](https://github.com/alexeyvax/form-validation-constructor/blob/master/README_RU.md)

## Pay attention please

This isn't final version of constructor.

It may not work correctly.

This project is currently being developed.

## Show example

![Example1](https://github.com/alexeyvax/form-validation-constructor/blob/master/gif-example/example.gif)

```javascript

// You can clone repository and enter on console

npm install

// after

npm start

```

and open file **index.html** in your browser


## Install with npm

You can install library with npm

```javascript
npm install --save form-validation-constructor
```

after installation you can connect it to your project
The best place to the connect is your root file, which combine all scripts
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

version [form-validation-constructor.min.js](https://github.com/alexeyvax/form-validation-constructor/blob/master/download/form-validation-constructor.min.js)

and connect script

```javascript
// index.html
<script src="your-path/form-validation-constructor.min.js"></script>
```

## Instructions for use

Let's make form validation!
At first, you need add form on your page

```javascript
// index.html
<form name="form" action="/" method="post"></form>
```

now you need to add **data** attribute **data-validation="true"** to your form

```javascript
<form name="form" action="/" method="post" data-validation="true"></form>
```

Form have added to the list of scanned. After you need add input fields to the form, example:
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

Enter name to the first field, which contain only letters, without special characters,
and add checks to attribute **data-options="isNonEmpty onlyLetters"**.

The second field is **input type="email"**
We use check on emptiness and on the correctness of the entered email address.

The third field is a checkbox with the agreement. Add check to attribute
**data-options="isRequired"** and then field get required status.
Important factor, attribute **"isRequired"** works only input fields with types **checkbox** or **radio**.

**An important addition** you can add any checks to the data attribute **data-options**
and separate them by space , example:

```javascript
data-options="isNonEmpty onlyLetters email"
```

Also if you make a **mistake** you can see warning with description about error on the console

![Example error 1](https://github.com/alexeyvax/form-validation-constructor/blob/master/gif-example/example-error.png)

If the form have got optional field, just don`t use attribute **data-options**

### Styles

If you want use ready-made styles you might add this string to your tag <head>
example:

```javascript
<link rel="stylesheet" type="text/css" href="./node_modules/form-validation-constructor/public/style.css">
```

location tooltips on the page you can make yourself, just add something like this:

```
.tooltip {
  bottom: 10px;
  left: 230px;
}
```

but if you want use your styles you might write it using classes such us .tooltip and .message
see structure tooltip:

```
<div class="tooltip">
  <span class="message">message about error</span>
</div>
```

### Set language for tooltips

Tooltips are currently available in English and Russian languages.
Language tooltips have language which
is passed when the script is initialized, example:

```javascript
formValidationConstructor({ lang: 'en' });
```

or if you have installed language in the attribute **lang** in the tag **html**

```javascript
<html lang="en">
```

If the language isn't initialized or isn't set in the **lang** attribute,
Then the default language is English **'en'**'.

### <a name="add-custom-ckeck"></a> How to add a custom check

If you want add your personal check to existing checks,
you can add it when your script is initialisation

example:

```javascript
const config = {
  // set english for tooltips
  lang: 'en',
  // the list of your checks
  listOfChecks: [ // (listed in the array {Array})
    {
      // the name of your check
      name: 'isTestCheck',
      // types of fields which will be applied verification (listed in the array {Array})
      typeField: [
        'text',
        'number',
      ],
      // check function is receive input element {HTMLInputElement}
      // return true or false {Boolean}
      validate(input) {
        return input.value !== '';
      },
      // error text on your language
      // name consist of two parts **instructions** and **en**
      'instructions-ru': 'это поле не может быть пустым.',
      'instructions-en': 'This field can not be empty.',
    },
    ...
  ],
};

formValidationConstructor(config);
```

and now you can add check to the element

```javascript
<input type="text" name="name" id="name" data-options="isTestCheck" placeholder="Name *" />
```

### Create a group for items with a checkbox type

Each items with the checkbox type that will be in the same group,
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

* **isNonEmpty** - field check of emptiness (analogue input **required** all fields except **ckeckbox** and **radio**)
* **isValidNumber** - check of the number
* **isEmailCorrect** - check the validity of the entered email address
* **isValidTel** - check on the validity of the entered phone number
* **isValidUrl** - check on the validity of the entered url address
* **onlyLetters** - check on the entered letters without special characters
* **minMax** - check compliance with the number of not less than min and not more than max (works if given **min** and **max** to the input **type = "number"**)
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
