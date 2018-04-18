const ENDPOINTS = 'endpoints';
const SUCCESS = '200';

const getPath = (path) => path.split('/').filter(item => item.trim() !== '');

module.exports = {
	ENDPOINTS,
	SUCCESS,
	getPath
};