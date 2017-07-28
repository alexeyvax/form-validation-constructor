import validation from './modules/validation';

// module.exports = validation;
const config = {
  isTestCheck: {
    lang: 'en',
    typeField: [
      'text',
      'number',
    ],
    checkName: 'isTestCheck',
    validate(input) {
      return input.value !== '';
    },
    'instructions-ru': 'это поле не может быть пустым.',
    'instructions-en': 'This field can not be empty.',
  },
};

validation(config);
