const express = require('express'),
	wrtc = require('wrtc'),
	bodyParser = require('body-parser'),
	opencv = require('opencv');

var app = express(),
	pc,
	videoStream,
	sendChannel;

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get('/getServerDescription', function(req, res) {
	if (!pc) {
		pc = new wrtc.RTCPeerConnection();
		pc.createOffer()
			.then(function(desc) {
				console.log('Local desc: ', desc);
				pc.setLocalDescription(desc);
			});

		//videoStream = new opencv.VideoStream(0);
	}

	sendChannel = pc.createDataChannel('video', {
		// UPD Semantics
		ordered: false,
		maxRetransmits: 0
	});
	sendChannel.onpen = function () {
		console.info('Open data Channel');
	};

	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(pc.localDescription));
});

app.post('/setClientDescription', function(req, res) {
	console.log('Description du clien...', req.body);

	pc.setRemoteDescription(new wrtc.RTCSessionDescription(req.body))
		.then(function() {
			console.log('Set remote description...');
		}).catch(function (error) {
			console.log(error);
		});

	setTimeout(function () {
		sendData();
	}, 2000);

	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(req.body));
});

function sendData () {
	console.info('Send data !');

	sendChannel.send('test');
};

app.listen(8080);
