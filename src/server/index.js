const express = require('express');
const {createEndpointsRouter} = require('./createEndpoint');
const {responder} = require('./endpointResponder');

const runServer = () => {
	const app = express();
	app.get('/', (req, res) => {
		res.send('hello world');
	});
	app.use(createEndpointsRouter());
	app.use(responder());
	app.listen(3000);
};

module.exports = {
	runServer
};