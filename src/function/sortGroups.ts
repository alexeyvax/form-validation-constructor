import outputErrors from '../classes/OutputErrors';
import { CHECKBOX, RADIO } from '../constants';

/* Detected name of its group */
const checkGroupName = (
  name: string,
  listOfErrors: string[],
  groupName?: string,
): string => {
  let newName = '';

  if (groupName) {
    newName = groupName;
    return newName;
  } else if (!listOfErrors.includes(name)) {
    listOfErrors.push(name);
    outputErrors.outputWarningToConsole(
      `Please enter valid groupname for input with name ${name} and type="checkbox"`,
    );
  }
  return newName;
};

/* Detected field type and detected name of its group */
const sortForName = (
  { type, name, dataset }: HTMLInputElement,
  listOfErrors: string[],
): string => {
  let newName = '';

  if (type === RADIO) {
    newName = name;
  } else if (type === CHECKBOX) {
    newName = dataset.groupname ?
      checkGroupName(name, listOfErrors, dataset.groupname) : '';
  }
  return newName;
};

/* It passes through the main list, and created groups to check */
const selectAllElementsCurrentGroup = (
  currentName: string,
  list: HTMLInputElement[],
  listOfErrors: string[],
): HTMLInputElement[] => {
  const arr = [] as HTMLInputElement[];

  list.forEach((item: HTMLInputElement) => {
    const name = sortForName(item, listOfErrors);

    if (currentName === name) {
      arr.push(item);
    }
  });
  return arr;
};

/* Sort the field to check on groups */
const sortGroups = (listGroups: HTMLInputElement[]): HTMLInputElement[][] => {
  const groups = [] as HTMLInputElement[][];
  const listGroupsName = [] as string[];
  const listOfErrors = [] as string[];

  listGroups.forEach((item: HTMLInputElement) => {
    const currentName = sortForName(item, listOfErrors);

    if (listGroupsName.includes(currentName)) {
      return;
    }

    const currentCroup = selectAllElementsCurrentGroup(currentName, listGroups, listOfErrors);
    listGroupsName.push(currentName);
    groups.push(currentCroup);
  });
  return groups;
};

export default sortGroups;
