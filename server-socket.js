const WebSocketServer = require('websocket').server,
	http = require('http');

var server = http.createServer(function (req, res) {
	console.info('Received request for ' + req.url);

	res.writeHead(404);
	res.end();
});

server.listen(8000, function () {
	console.info('Server is listening on port 8000');
});

var wsServer = new WebSocketServer({
	httpServer: server,
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
wsServer.on('request', function (req) {
	if (!originIsAllowed(req.origin)) {
		console.warn('Origin not allowed !!!');

		return req.reject();
	}

	console.info('New websocket connection !');

	var connec = req.accept('echo-protocol', req.origin);
	connec.on('message', function (message) {
		if (message.type === 'utf8') {
			console.info('Received utf8 message.');
		} else if (message.type === 'binary') {
			console.info('Received binary message.');
		}
	});
	connec.on('close', function () {
		console.info('Peer disconnected...');
	});
});
