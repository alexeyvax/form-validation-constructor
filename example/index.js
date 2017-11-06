import formValidationConstructor from '../src';

const config = {
  lang: 'en',
  listOfChecks: [
    {
      name: 'isTestCheck',
      typeField: [
        'text',
        'number',
      ],
      validate(input) {
        return input.value !== '';
      },
      'instructions-ru': 'это поле не может быть пустым.',
      'instructions-en': 'This field can not be empty.',
    },
  ],
};

formValidationConstructor(config);
