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

app.get('/src/**/*', (req, res) => {
	res.sendFile(path.join(__dirname, req.url));
});

app.get('/node_modules/**/*', (req, res) => {
	res.sendFile(path.join(__dirname, req.url));
});

/**
 * Web services
 */
app.get('/api/drones', (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify(drones));
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
	let connec = req.accept('echo-protocol', req.origin);

	connec.on('message', function(message) {
		if (message.type === 'utf8') {
			let json = JSON.parse(message.utf8Data);

			if (json.type === 'PILOT') {
				if (json.action === 'LOGIN') {
					const drone = clients
						.filter(isMovable)
						.find(item => {
							return item.id === json.droneId;
						});

					if (drone) {
						console.log('Connection with,', drone.name);
					}
				} else {
					clients.push(Object.assign(json, {
						connec,
						id: uuidV1()
					}));

					connec.send(JSON.stringify(getDrones()));
				}
			} else if (json.type === 'DRONE') {
				clients.push(Object.assign(json, {
					connec,
					id: uuidV1()
				}));

				clients
					.filter(isPilot)
					.forEach((cli) => {
						cli.connec.send(JSON.stringify(getDrones()));
					});
			}
		}
	});

	connec.on('close', function(reasonCode, description) {
		const client = clients
			.find(item => {
				return item.connec === connec;
			});
		const index = clients.indexOf(client);

		if (index !== -1) {
			clients.splice(index, 1);

			clients
				.filter(isPilot)
				.forEach((cli) => {
					cli.connec.send(JSON.stringify(getDrones()));
				});
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

/**
 * Démarrage du serveur
 */
server.listen(3000, () => {
	console.info('Démarrage du serveur sur le port 3000.');
});
