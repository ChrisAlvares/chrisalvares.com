var format = require('util').format;
var _ = require('underscore');

var provider = {};

provider.getRoutes = function(app) {

	var main = require('../controller');
	var finance = require('../controller/finance');

	app.get('/', main.index);
	app.get('/apicalls', main.apicalls);
	app.get('/finance/', finance.data);
};



provider.setConfigVariables = function(app) {

	var config = require('../config/config.js');
	
	try {
		var local = require('../config/local.js');
		config = _.extend(config, local);
	} catch(e) {
		console.log("No local file found, you should have a local file for security reasons, do not edit the config.js file:\n" + e);
	}

	for(var key in config) {
		app.set(key, config[key]);
	}	
	
	this.setDatabase(app);
}

provider.setDatabase = function(app)
{
    var mongoose = require('mongoose');
    var db = app.get('database');
    mongoose.connect(format('mongodb://%s:%s/%s', 
        db.host,
        db.port,
        db.dbname
    ));
    app.set('db', mongoose.connection);    
}

module.exports = provider;