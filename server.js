var config = require('./server/config'),
	LoggerServer = require('./server/LoggerServer'),
	server = new LoggerServer(config);

server.bootstrap();