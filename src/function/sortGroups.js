import { RADIO, CHECKBOX } from '../constants/index';

/**
 * Detected field type and detected name of its group
 * 
 * @param item {HTMLInputElement}
 * @returns name {String}
 */
function sortForName(item, listOfErrors) {
  const type = item.type;
  let name;

  if (type === RADIO) {
    name = item.name;
  } else if (type === CHECKBOX) {
    const dataset = item.dataset.groupname;
    if (dataset) {
      name = dataset;
    } else if (!listOfErrors.includes(item.name)) {
      listOfErrors.push(item.name);
      console.error(`Please enter valid groupname for input with name ${item.name} 
        and type="checkbox"`);
    }
  }
  return name;
}

/**
 * It passes through the main list, and created groups to check
 * 
 * @param arrName {String}
 * @param list {Array}
 * @returns arr {Array}
 */
function selectAllElementsCurrentGroup(currentName, list, listOfErrors) {
  const arr = [];

  list.forEach((item) => {
    const name = sortForName(item, listOfErrors);
    if (currentName === name) {
      arr.push(item);
    }
  });
  return arr;
}

/**
 * Sort the field to check on groups
 * 
 * @param listGroups {Array}
 * @returns arr {Array}
 */
function sortGroups(listGroups) {
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
}

export default sortGroups;
