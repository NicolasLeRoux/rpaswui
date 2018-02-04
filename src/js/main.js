var renderItem = function (item) {
	return `
		<p>${item.name}</p>
	`;
};

let peerCo;

var askForPeerCo = function (event) {
	const $elm = event.currentTarget,
		id = $elm.dataset.id;

	initPeerCo(id);
};

// Affichage des drones sur le DOM
var elm = document.createElement('ul');
document.body.append(elm);

let ws = new WebSocket('ws://localhost:3000', 'echo-protocol');
ws.onmessage = (event) => {
	let json = JSON.parse(event.data);

	switch (json.action) {
		case 'UPDATE_REMOTE':
			let drones = json.drones;

			// RAZ
			elm.innerHTML = '';

			drones.map(item => {
				let li = document.createElement('li');
				li.dataset.id = item.id;
				li.innerHTML = renderItem(item);
				li.addEventListener('click', askForPeerCo);
				elm.append(li);
			});
			break;
		case 'INIT_PEER_CO':
			peerCo.setRemoteDescription(new RTCSessionDescription(json.remoteDescription))
				.then(() => {
					console.info('WebRTC ready.');
				});
			break;
		case 'RTC_ICE_CANDIDATE':
			peerCo.addIceCandidate(json.candidate)
				.then(() => {
					console.info('Adding ICE candidate success ! Info: ', json.candidate);
				}).catch(error => {
					console.warn('ICE candidate error: ', error);
				});
			break;
		default:
			console.error('Undefined action...', {
				action: json.action
			});
	}


};
ws.onopen = function (event) {
	ws.send(JSON.stringify({
		type: 'PILOT',
		action: 'INIT_SOCKET'
	}));
};

const initPeerCo = function (remoteId) {
	peerCo = new RTCPeerConnection();

	let commandChannel = peerCo.createDataChannel('command', {
		// UPD Semantics
		ordered: false,
		maxRetransmits: 0
	});

	commandChannel.onopen = function () {
		console.info('Command channel opened.');
		commandChannel.send('Client: Mon super message !');
	};
	commandChannel.onclose = function () {
		console.info('Command channel closed.');
	};

	peerCo.ondatachannel = function (event) {
		console.info('Client get data channel', event);

		var channel = event.channel,
			imgElm = document.querySelector('img');

		// Réception des images !
		channel.onmessage = function (e) {
			imgElm.src = 'data:image/png;base64,' + e.data;
		};
		channel.onopen = function () {
			console.info('Video channel on open.');
		};
		channel.onclose = function () {
			console.info('Video channel on close.');
		};
	};

	peerCo.onicecandidate = function (event) {
		console.info('Client on ICE candidate', event);

		if (event.candidate) {
			ws.send(JSON.stringify({
				type: 'PILOT',
				action: 'RTC_ICE_CANDIDATE',
				candidate: event.candidate,
				remoteId
			}));
		}
	};

	peerCo.createOffer()
		.then(offerDesc => {
			console.info('Set server local description from offer: ', offerDesc);

			return peerCo.setLocalDescription(offerDesc);
		}).then(() => {
			console.info('Set client remote desc from server offer');

			ws.send(JSON.stringify({
				type: 'PILOT',
				action: 'INIT_PEER_CO',
				remoteDescription: peerCo.localDescription,
				remoteId
			}));
		});
};
