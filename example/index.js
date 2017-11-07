import formValidationConstructor from '../src';

const config = {
  lang: 'de',
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
      instructions: {
        en: {
          isTestCheck: 'This field can not be empty.',
        },
        ru: {
          isTestCheck: 'это поле не может быть пустым.',
        },
        de: {
          isTestCheck: 'Dieses Feld darf nicht leer sein.',
        },
      },
    },
  ],
};

formValidationConstructor(config);
