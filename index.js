var connect = require('connect');

function createMiniHarp(){
		var app = connect();
		return app;
};

module.exports = createMiniHarp;
