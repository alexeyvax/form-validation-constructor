/**
 * Sort the field to check on groups
 * 
 * @param listGroups {Array}
 * @returns arr {Array}
 */
function sortGroups(listGroups) {
	const groups = [];
	const listGroupsName = [];
	listGroups.forEach(item => {
		const currentName = sortForName(item);
		if (!listGroupsName.includes(currentName)) {
			const currentCroup = selectAllElementsCurrentGroup(currentName, listGroups);
			listGroupsName.push(currentName);
			groups.push(currentCroup);
		}
	});
	return groups;
}

/**
 * It passes through the main list, and created groups to check
 * 
 * @param arrName {String}
 * @param list {Array}
 * @returns arr {Array}
 */
function selectAllElementsCurrentGroup(currentName, list) {
	const arr = [];
	
	list.forEach(item => {
		const name = sortForName(item);
		if (currentName === name) {
			arr.push(item);
		}
	});
	return arr;
}

/**
 * Detected field type and detected name of its group
 * 
 * @param item {HTMLInputElement}
 * @returns name {String}
 */
function sortForName(item) {
	const type = item.type;
	let name;
	
	if (type === 'radio') {
		name = item.name;
	} else if (type === 'checkbox') {
		const dataset = item.dataset['groupname'];
		if (dataset) {
			name = dataset;
		} else {
			// TODO сделать вывод ошибки один раз, а не по колличеству элементов
			console.error(`Input please valid groupname for input with name ${item.name} 
				and type="checkbox"`);
		}
	}
	return name;
}

export default sortGroups;
