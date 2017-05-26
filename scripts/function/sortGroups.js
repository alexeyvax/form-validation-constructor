/**
 * Sort the field to check on groups
 * 
 * @param listGroups {Array}
 * @returns arr {Array}
 */
function sortGroups(listGroups) {
	const groups = [];
	const arr = [];
	
	listGroups.forEach(
		item => {
			const name = sortForName(item);
			if (!groups.includes(name)) {
				groups.push(name);
			}
		}
	);
	groups.forEach(arrName => {
			const itemArr = forEachGroup(arrName, listGroups);
			arr.push(itemArr);
		}
	);
	return arr;
}

/**
 * It passes through the main list, and created groups to check
 * 
 * @param arrName {String}
 * @param list {Array}
 * @returns arr {Array}
 */
function forEachGroup(arrName, list) {
	const arr = [];
	
	list.forEach(item => {
		const name = sortForName(item);
		if (arrName === name) {
			arr.push(item);
			return true;
		}
		return false;
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
		}
	}
	return name;
}

export default sortGroups;
