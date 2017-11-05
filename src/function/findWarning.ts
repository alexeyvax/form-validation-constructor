import outputErrors from '../classes/OutputErrors';
import configValidation from './configValidation';

/* Find and out warnings */
const findWarning = (
  { name, type }: HTMLInputElement,
  arr: string[],
): string[] => {
  const mediateArray = [] as string[];

  if (!arr.length) {
    return mediateArray;
  }

  arr.forEach((i: string) => {
    if (configValidation[type].includes(i)) {
      return mediateArray.push(i);
    }

    return outputErrors.outputWarningToConsole(
      `Warning: field named "${name}" with type="${type}".
      data-options can not contain check to "${i}"`,
    );
  });
  return mediateArray;
};

export default findWarning;
