const fs = require('fs');
const {fromJS} = require('immutable');

const fileName = __dirname + '/data/db.json';

const serialize = (data) => fs.writeFileSync(fileName, JSON.stringify(data));
const initialize = () => fromJS(JSON.parse(fs.readFileSync(fileName)));

const getRecord = (path) => {
	const records = initialize();
	if (records.hasIn(path)) {
		return records.getIn(path).toJS();
	}
	return null;
};

const setRecord = (path, value) => {
	const records = initialize();
	console.log(path, value);
	const newRecords = records.setIn(path, value);
	console.log(newRecords);
	serialize(newRecords);
};

module.exports = {
	getRecord,
	setRecord
};