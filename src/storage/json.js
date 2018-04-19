const fs = require('fs');
const {fromJS} = require('immutable');
const uuid = require('uuid');

const fileName = __dirname + '/data/db.json';


const ENDPOINTS = 'endpoints';
const DATA = 'data';
const TYPE = 'type';
const STATUS = 'status';
const TYPE_COLLECTION = 'collection';
const TYPE_SIMPLE = 'simple';
const CHECK_LOWER_IN_PATH = 'checkLower';

/**
 *
 * @param data
 */
const storeData = (data) => fs.writeFileSync(fileName, JSON.stringify(data, null, '  '));

/**
 * load file
 */
const loadData = () => fromJS(JSON.parse(fs.readFileSync(fileName)));

/**
 *
 * @param path String
 * @returns Array
 */
const getEndpointPath = (path) => {
	const splitPath = path.split('/').filter(item => item.trim() !== '');
	splitPath.unshift(ENDPOINTS);
	return splitPath;
};

/**
 *
 * @param path String
 * @returns {*}
 */
const getEndpoint = (path) => {
	const records = loadData();
	if (records.hasIn(getEndpointPath(path))) {
		return records.getIn(getEndpointPath(path)).toJS();
	}
	return null;
};

/**
 *
 * @param path String
 * @param value
 */
const setEndpoint = (path, value) => {
	const records = loadData();
	const newRecords = records.setIn(getEndpointPath(path), value);
	storeData(newRecords);
};

/**
 *
 * @param path String
 * @returns {*}
 */
const getType = (path) => {
	const mock = getEndpoint(path);
	if (!mock) {
		return CHECK_LOWER_IN_PATH;
	}
	return mock[TYPE];
};

/**
 *
 * @param path String
 * @returns {*}
 */
const getStatus = (path) => {
	const mock = getEndpoint(path);
	return mock[STATUS];
};

/**
 *
 * @param path String
 * @returns {*}
 */
const getAllData = (path) => {
	const mock = getEndpoint(path);
	return mock[DATA];
};

/**
 *
 * @param path String
 * @param body Object
 * @returns {*}
 */
const addToCollection = (path, body) => {
	const mock = getEndpoint(path);
	body.id = uuid.v1();
	mock[DATA].push(body);
	setEndpoint(path, mock);
	return body.id;
};

/**
 *
 * @param path
 * @param id
 * @returns {*}
 */
const removeFromCollection = (path, id) => {
	const mock = getEndpoint(path);
	const index = mock[DATA].indexOf(item => item.id === id)
	mock[DATA].splice(index, 1);
	setEndpoint(path, mock);
	return id;
};


module.exports = {
	getEndpoint,
	setEndpoint,
	getType,
	getStatus,
	getAllData,
	addToCollection,
	removeFromCollection,
	CHECK_LOWER_IN_PATH
};