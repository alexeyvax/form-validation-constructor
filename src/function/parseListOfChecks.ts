import configValidation from '../function/configValidation';
import typesValidation from '../function/typesValidation';
import warnings from '../warnings';
import { CheckItem, Config } from './../interfaces';

const parseListOfChecks = (config: Config) => {
  const listOfChecks = config.listOfChecks as CheckItem[];
  listOfChecks.map((checkItem: CheckItem) => {
    typesValidation[checkItem.name] = { validate: checkItem.validate };
    checkItem.typeField.forEach((i: string) => configValidation[i].push(checkItem.name));

    Object.keys(checkItem.instructions).map((langKey: string) => {
      const currentLangKey = checkItem.instructions[langKey];

      Object.keys(currentLangKey).map((item: string) => {
        if (langKey in warnings) {
          warnings[langKey][item] = currentLangKey[item];
          return;
        }
        warnings[langKey] = { [item]: currentLangKey[item] };
      });
    });
  });
};

export default parseListOfChecks;
