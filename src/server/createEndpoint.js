const {Router, json} = require('express');
const {setRecord} = require('../storage/json');
const {ENDPOINTS, getPath} = require('./endpoints');

const PATH = 'path';
const STATUS = 'status';
const RESPONSE = 'response';

const createEndpointsRouter = () => {
	const router = Router({mergeParams: true});
	router.post('/endpoints', json(), ({body}, res, next) => {
		console.log(body);
		const path = getPath(body[PATH]);
		const status = body[STATUS];
		const response = body[RESPONSE];
		path.push(status);
		path.unshift(ENDPOINTS);
		setRecord(path, response);
		res.json({});
	});
	return router;
};

module.exports = {
	createEndpointsRouter
};