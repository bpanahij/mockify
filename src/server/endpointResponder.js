const {Router, json} = require('express');
const {getRecord} = require('../storage/json');
const {ENDPOINTS, SUCCESS, getPath} = require('./endpoints');

const responder = () => {
	const router = Router({mergeParams: true});
	router.use(json(), ({path}, res) => {
		const splitPath = getPath(path);
		splitPath.unshift(ENDPOINTS);
		splitPath.push(SUCCESS);
		console.log(splitPath);
		const response = getRecord(splitPath);
		res.json(response);
	});
	return router;
};

module.exports = {
	responder
};