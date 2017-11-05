import formValidationConstructor from './modules/validation';

const config = {
  lang: 'en',
  listOfChecks: [
    {
      name: 'isTestCheck',
      typeField: [
        'text',
        'number',
      ],
      validate(input: HTMLInputElement): boolean {
        return input.value !== '';
      },
      'instructions-ru': 'это поле не может быть пустым.',
      'instructions-en': 'This field can not be empty.',
    },
  ],
};

/* start constructor */
formValidationConstructor(config);

/* publish constructor to npm */
// export default formValidationConstructor;
