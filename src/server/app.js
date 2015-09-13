'use strict';

var config = require('./config'),
    express = require('express'),
    bodyParser = require('body-parser'),
    http = require('http'),
    path = require('path');

var app = express();
app.server = http.createServer(app);

app.config = config;

app.set('port', config.port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(require('serve-static')(path.join(__dirname, '../client')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.locals.projectName = app.config.projectName;
app.locals.copyrightYear = new Date().getFullYear();
app.locals.copyrightName = app.config.companyName;
app.locals.cacheBreaker = 'br34k-01';

require('./routes')(app);

app.server.listen(app.config.port, function(){
	//and... we're live
});