const {Router, json} = require('express');
const {setEndpoint, getEndpoint} = require('../storage/json');
const {TYPE_COLLECTION, STATUS, DATA, TYPE, PATH, METHOD} = require('./endpoints');

const createEndpointsRouter = () => {
	const router = Router({mergeParams: true});
	router.post('/endpoints', json(), ({body}, res) => {
		const path = body[PATH];
		const status = body[STATUS];
		const data = body[DATA];
		const method = body[METHOD];
		const type = body[TYPE];
		try {
			validate(type, data);
		}
		catch ({message}) {
			res.status(500).json({message});
			return;
		}
		setEndpoint(path, {
			data,
			status,
			type,
			method
		});
		res.json(getEndpoint(path));
	});
	return router;
};

const validate = (type, data) => {
	switch (type) {
	case TYPE_COLLECTION:
		validateCollection(data);
	}
};

const validateCollection = (data) => {
	if (!Array.isArray(data)) {
		throw Error('data must be an array');
	}
};


module.exports = {
	createEndpointsRouter
};