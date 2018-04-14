const path = require('path'),
	express = require('express'),
	http = require('http'),
	WebSocketServer = require('websocket').server,
	uuidV1 = require('uuid/v1');

let app = express(),
	server = http.createServer(app),
	wsServer = new WebSocketServer({
		httpServer: server,
		autoAcceptConnections: false
	}),
	clients = [];

/**
 * Serveur de fichier
 */
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/home', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/aircraft-list', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/about', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/src/**/*', (req, res) => {
	res.sendFile(path.join(__dirname, req.url));
});

app.get('/node_modules/**/*', (req, res) => {
	res.sendFile(path.join(__dirname, req.url));
});

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
	if (req.requestedProtocols.indexOf('echo-protocol') === -1) {
		req.reject();
		return;
	}

	let connec = req.accept('echo-protocol', req.origin);

	connec.on('message', function(message) {
		if (message.type === 'utf8') {
			let json = JSON.parse(message.utf8Data);

			processSocketMessage(json, connec);
		}
	});

	connec.on('close', function(reasonCode, description) {
		const local = findLocal(connec);
		const index = clients.indexOf(local);

		if (index !== -1) {
			clients.splice(index, 1);

			if (local.type !== 'PILOT') {
				clients
					.filter(isPilot)
					.forEach((cli) => {
						cli.connec.send(JSON.stringify({
							action: 'UPDATE_REMOTE',
							drones: getDrones()
						}));
					});
			}
		}
	});
});

const getDrones = function () {
	return clients
		.filter(isMovable)
		.map(unCircularClient);
};

const unCircularClient = function (client) {
	return Object.assign({}, client, {
		connec: undefined
	});
};

const isPilot = function (item) {
	return item.type === 'PILOT';
};

const isMovable = function (item) {
	return !isPilot(item);
};

const processSocketMessage = function (json, connec) {
	let remote, local;

	switch (json.action) {
		case 'INIT_SOCKET':
			clients.push(Object.assign(json, {
				connec,
				id: uuidV1()
			}));

			if (json.type === 'DRONE') {
				clients
					.filter(isPilot)
					.forEach((cli) => {
						cli.connec.send(JSON.stringify({
							action: 'UPDATE_REMOTE',
							drones: getDrones()
						}));
					});
			} else if (json.type === 'PILOT') {
				connec.send(JSON.stringify({
					action: 'UPDATE_REMOTE',
					drones: getDrones()
				}));
			}
			break;
		case 'INIT_PEER_CO':
			remote = findRemote(json.remoteId);
			local = findLocal(connec);

			if (remote) {
				remote.connec.send(JSON.stringify(Object.assign(json, {
					remoteId: local.id
				})));
			}
			break;
		case 'RTC_ICE_CANDIDATE':
			remote = findRemote(json.remoteId);
			local = findLocal(connec);

			remote.connec.send(JSON.stringify(Object.assign(json, {
				remoteId: local.id
			})));
			break;
		default:
			console.error('Undefined action...');
	}
}

const findRemote = function (id) {
	return clients
		.find(item => {
			return item.id === id;
		});
}

const findLocal = function (connec) {
	return clients
		.find(item => {
			return item.connec === connec;
		});
}

/**
 * Démarrage du serveur
 */
const port = process.env.PORT || 3000;
server.listen(port, () => {
	console.info(`Démarrage du serveur sur le port ${port}.`);
});
