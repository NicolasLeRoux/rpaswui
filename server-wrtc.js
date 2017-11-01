const path = require('path'),
	express = require('express'),
	http = require('http'),
	wrtc = require('wrtc'),
	bodyParser = require('body-parser'),
	WebSocketServer = require('websocket').server,
	opencv = require('opencv');

var app = express(),
	server = http.createServer(app),
	wsServer = new WebSocketServer({
		httpServer: server,
		autoAcceptConnections: false
	}),
	pc,
	videoChannel;

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

function onMessage (json, connec) {
	switch (json.type) {
		case 'localDescription':
			var desc = new wrtc.RTCSessionDescription(json.data);
			pc = new wrtc.RTCPeerConnection();

			videoChannel = pc.createDataChannel('video', {
				// UPD Semantics
				ordered: false,
				maxRetransmits: 0
			});
			videoChannel.onopen = function () {
				console.info('Video channel opened.');

				var videoStream = new opencv.VideoStream(0);
				/**
				 * J'obtient ici une image de 480*640 alors que je souhaite
				 * avoir une image de 568*320.
				 */
				videoStream.video.setWidth(430);
				videoStream.video.setHeight(320);
				videoStream.on('data', function (matrix) {
					// Ici, trop de data en une seul fois...
					// https://github.com/js-platform/node-webrtc/issues/156
					// Le Buffer est une class node !!!
					var str = matrix.toBuffer({
							ext: '.jpg',
							jpegQuality: 50
						}).toString('base64');

					console.log('Taille de la chaine: ', str.length);
					videoChannel.send(str.slice(0, 50000));
				});
				videoStream.read();
			};
			videoChannel.onclose = function () {
				console.info('Video channel closed.');
			};

			pc.ondatachannel = function (event) {
				console.info('Serveur get data channel', event);

				var channel = event.channel;

				channel.onmessage = function (e) {
					console.info('Command channel on message: ', e.data);
				};
				channel.onopen = function () {
					console.info('Command channel on open');
				};
				channel.onclose = function () {
					console.info('Command channel on close');
				};
			};

			pc.onicecandidate = function (event) {
				console.info('Server on ICE candidate', event);

				if (event.candidate) {
					connec.send(JSON.stringify({
						type: 'icecandidate',
						data: event.candidate
					}));
				}
			};

			pc.setRemoteDescription(desc)
				.then(function() {
					console.log('Create WebRTC answer.');
					return pc.createAnswer();
				}).then(answerDesc => {
					console.info('Set WebRTC desc from answer: ', answerDesc);
					return pc.setLocalDescription(answerDesc);
				}).then(() => {
					console.info('Set server remote desc from client answer');
					connec.send(JSON.stringify({
						type: 'localDescription',
						data: pc.localDescription
					}));
				});
			break;
		case 'icecandidate':
			pc.addIceCandidate(json.data)
				.then(() => {
					console.info('Adding ICE candidate success !');
				}).catch(error => {
					console.warn('ICE candidate error: ', error);
				});
			break;
		default:
			console.warn('Ce type de donnée n\'est pas référencé.');
	}
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
			onMessage(JSON.parse(message.utf8Data), connec);
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
