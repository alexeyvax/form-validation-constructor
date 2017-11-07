# form-validation-constructor

The simple library-constructor which validate form on the client side.
Constructor is based on a "strategy" pattern and It can add your personal form check.

form-validation-constructor complemented browser's validation
or replaced it with custom checks.

On the section [how to add a custom check](#add-custom-ckeck), you can see an example which
add your own check to the list of checks.

## See description

[See description](https://github.com/alexeyvax/form-validation-constructor/tree/master/description)

## See example

[see code example](https://github.com/alexeyvax/form-validation-constructor/tree/master/example)

## Install with npm

You can install library with npm

```javascript
npm install --save form-validation-constructor
```

after installation you can connect it to your project
The best place to the connect is your root file, which combine all scripts
example:

```javascript
// connect to main scripts file
import formValidationConstructor from 'form-validation-constructor';

formValidationConstructor();
```

## License

[MIT](https://github.com/alexeyvax/form-validation-constructor/blob/master/LICENSE.md)
