const path = require('path'),
	express = require('express'),
	http = require('http'),
	wrtc = require('wrtc'),
	bodyParser = require('body-parser'),
	WebSocketServer = require('websocket').server;

var app = express(),
	server = http.createServer(app),
	wsServer = new WebSocketServer({
		httpServer: server,
		autoAcceptConnections: false
	});

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

/**
 * Serveur de fichier
 */
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index-wrtc.html'));
});

// TODO: Make it more specific !!!
function originIsAllowed (origin) {
	return true;
};

/**
 * Serveur pour les WebSockets.
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

server.listen(3000, () => {
	console.info('Démarrage du serveur sur le port 3000.');
});
