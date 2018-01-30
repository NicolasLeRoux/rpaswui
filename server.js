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
	console.info('New websocket connection !');

	let connec = req.accept('echo-protocol', req.origin);
	connec.on('message', function(message) {
		if (message.type === 'utf8') {
			let json = JSON.parse(message.utf8Data);

			clients.push(Object.assign(json, {
				connec,
				id: uuidV1()
			}));

			if (json.type === 'PILOT') {
				connec.send(JSON.stringify(clients.filter(isMovable)));
			} else if (json.type === 'DRONE') {
				clients
					.filter(isPilot)
					.forEach((cli) => {
						cli.connec.send(JSON.stringify(getDrones()));
					});
			}
		}
	});

	connec.on('close', function(reasonCode, description) {
		const drone = clients
			.find(item => {
				return item.connec === connec;
			});
		const index = clients.indexOf(drone);

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
		.map((drone) => {
			return {
				id: drone.id,
				name: drone.name
			}
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
