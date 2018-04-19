const {Router, json} = require('express');
const {
	getType,
	getStatus,
	addToCollection,
	removeFromCollection,
	getAllData,
	CHECK_LOWER_IN_PATH
} = require('../storage/json');
const {
	TYPE_COLLECTION,
	TYPE_SIMPLE,
	METHOD_POST,
	METHOD_GET,
	METHOD_DELETE,
	METHOD_PUT
} = require('./endpoints');

/**
 *
 * @returns {*}
 */
const responder = () => {
	const router = Router({mergeParams: true});
	router.use(json(), ({path, method, body}, res) => {
		switchType(path, method, body, res);
	});
	return router;
};

/**
 *
 * @param path
 * @param method
 * @param body
 * @param res
 * @returns {*}
 */
const handleCollectionInstanceMethods = (path, method, body, res) => {
	switch (method) {
	case METHOD_POST:
		return res.status(getStatus(path)).json({id: addToCollection(path, body)});
	case METHOD_GET:
	default:
		return res.status(getStatus(path)).json(getAllData(path));
	}
};

/**
 *
 * @param path
 * @param method
 * @param body
 * @param res
 * @returns {*}
 */
const handleCollectionModifierMethods = (path, method, body, id, res) => {
	switch (method) {
	case METHOD_DELETE:
		return res.status(getStatus(path)).json({id: removeFromCollection(path, id)});
	default:
		console.log(path, method, body);
		return res.status(404).json({message: 'Cannot modify this collection'});
	}
};

/**
 *
 * @param path
 * @param method
 * @param body
 * @param res
 * @returns {*}
 */
const switchType = (path, method, body, res) => {
	switch (getType(path)) {
	case TYPE_COLLECTION:
		return handleCollectionInstanceMethods(path, method, body, res);
	case TYPE_SIMPLE:
		return res.status(getStatus(path)).json(getAllData(path));
	case CHECK_LOWER_IN_PATH:
	default:
		const pathParts = path.match(/(.*)(\/[^\/]*)$/, '');
		const tryPath = pathParts[1];
		const id = pathParts[2].replace('/', '');
		if (getType(tryPath) !== TYPE_COLLECTION) {
			return res.status(404).json({message: 'That endpoint does not exist'})
		}
		return handleCollectionModifierMethods(tryPath, method, body, id, res);
	}
};

module.exports = {
	responder
};