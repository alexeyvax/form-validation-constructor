import { RADIO, CHECKBOX } from '../constants/index';

/**
 * Detected name of its group
 * 
 * @param groupName {String}
 * @param name {String}
 * @param listOfErrors {Array}
 * @returns name {String}
 */
const checkGroupName = (groupName, name, listOfErrors) => {
  let newName;
  if (groupName) {
    newName = groupName;
  } else if (!listOfErrors.includes(name)) {
    listOfErrors.push(name);
    console.error(`Please enter valid groupname for input with name ${name} 
      and type="checkbox"`);
  }
  return newName;
};

/**
 * Detected field type and detected name of its group
 * 
 * @param item {HTMLInputElement}
 * @returns name {String}
 */
const sortForName = ({ type, name, dataset }, listOfErrors) => {
  let newName;

  if (type === RADIO) {
    newName = name;
  } else if (type === CHECKBOX) {
    newName = checkGroupName(dataset.groupname, name, listOfErrors);
  }
  return newName;
};

/**
 * It passes through the main list, and created groups to check
 * 
 * @param arrName {String}
 * @param list {Array}
 * @returns arr {Array}
 */
const selectAllElementsCurrentGroup = (currentName, list, listOfErrors) => {
  const arr = [];

  list.forEach((item) => {
    const name = sortForName(item, listOfErrors);
    if (currentName === name) {
      arr.push(item);
    }
  });
  return arr;
};

/**
 * Sort the field to check on groups
 * 
 * @param listGroups {Array}
 * @returns arr {Array}
 */
const sortGroups = (listGroups) => {
  const groups = [];
  const listGroupsName = [];
  const listOfErrors = [];

  listGroups.forEach((item) => {
    const currentName = sortForName(item, listOfErrors);
    if (!listGroupsName.includes(currentName)) {
      const currentCroup = selectAllElementsCurrentGroup(currentName, listGroups, listOfErrors);
      listGroupsName.push(currentName);
      groups.push(currentCroup);
    }
  });
  return groups;
};

export default sortGroups;
