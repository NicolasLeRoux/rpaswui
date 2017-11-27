const WebSocketServer = require('websocket').server,
	http = require('http'),
	express = require('express');

var drones = [];

var serverClient = http.createServer(function (req, res) {
	console.info('Received request for ' + req.url);

	res.writeHead(404);
	res.end();
});

var serverRpas = http.createServer(function (req, res) {
	console.info('Received request for ' + req.url);

	res.writeHead(404);
	res.end();
});

serverClient.listen(8000, function () {
	console.info('Server is listening on port 8000');
});

serverRpas.listen(9000, function () {
	console.info('Server is listening on port 9000');
});

var wsServerClient = new WebSocketServer({
	httpServer: serverClient,
	autoAcceptConnections: false
});

var wsServerRpas = new WebSocketServer({
	httpServer: serverRpas,
	autoAcceptConnections: false
});

// TODO: Make it more specific !!!
function originIsAllowed (origin) {
	return true;
};

/*
 * Server pour les WebSockets.
 *
 * Exemple de code client:
 * ```js
 * var ws = new WebSocket('ws://localhost:8000', 'echo-protocol');
 * ws.send('Mon message...');
 * ```
 */
wsServerClient.on('request', function (req) {
	if (!originIsAllowed(req.origin)) {
		console.warn('Origin not allowed !!!');

		return req.reject();
	}

	console.info('[Client] New websocket connection !');

	var connec = req.accept('echo-protocol', req.origin);
	connec.on('message', function (message) {
		if (message.type === 'utf8') {
			console.info('[Client] Received utf8 message.');
		} else if (message.type === 'binary') {
			console.info('[Client] Received binary message.');
		}
	});
	connec.on('close', function () {
		console.info('[Client] Peer disconnected...');
	});
});

/**
 * WebSocket de connection pour les drones.
 */
wsServerRpas.on('request', function (req) {
	if (!originIsAllowed(req.origin)) {
		console.warn('Origin not allowed !!!');

		return req.reject();
	}

	console.info('[RPAS] New websocket connection !');

	var connec = req.accept('echo-protocol', req.origin);
	connec.on('message', function (message) {
		if (message.type === 'utf8') {
			console.info('[RPAS] Received utf8 message.');
			drones.push(JSON.parse(message.utf8Data));
		} else if (message.type === 'binary') {
			console.info('[RPAS] Received binary message.');
		}
	});
	connec.on('close', function () {
		console.info('[RPAS] Peer disconnected...');
	});
});

var app = express();

app.get('/drones', function(req, res) {
	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(drones));
});

app.listen(8080);
