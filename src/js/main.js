import { SocketComponent } from './components/socket.component.js';
import { SocketProxyComponent } from './components/socket-proxy.component.js';
import { RouterComponent } from './components/router.component.js';
import { MessageMediatorComponent } from './components/message-mediator.component.js';

var renderItem = function (item) {
	return `
		<td>${item.name}</td>
		<td>48°52′51.118″N/2°16′1.032″E</td>
		<td>Online</td>
	`;
};

let peerCo;

var askForPeerCo = function (event) {
	const $elm = event.currentTarget,
		id = $elm.dataset.id;

	initPeerCo(id);
};

// Affichage des drones sur le DOM
var elm = document.querySelector('.aircraft-list');

var elmSocket = document.querySelector('rpas-socket');
elmSocket.addEventListener('open', (event) => {
	elmSocket.send({
		type: 'PILOT',
		action: 'INIT_SOCKET'
	});
});
elmSocket.addEventListener('message', (event) => {
	let json = event.detail;

	switch (json.action) {
		case 'UPDATE_REMOTE':
			let drones = json.drones;

			// RAZ
			elm.innerHTML = '';

			drones.map(item => {
				let wrapElm = document.createElement('tr');
				wrapElm.dataset.id = item.id;
				wrapElm.innerHTML = renderItem(item);
				wrapElm.addEventListener('click', askForPeerCo);
				elm.append(wrapElm);
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
});

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
			elmSocket.send({
				type: 'PILOT',
				action: 'RTC_ICE_CANDIDATE',
				candidate: event.candidate,
				remoteId
			});
		}
	};

	peerCo.createOffer()
		.then(offerDesc => {
			console.info('Set server local description from offer: ', offerDesc);

			return peerCo.setLocalDescription(offerDesc);
		}).then(() => {
			console.info('Set client remote desc from server offer');

			elmSocket.send({
				type: 'PILOT',
				action: 'INIT_PEER_CO',
				remoteDescription: peerCo.localDescription,
				remoteId
			});
		});
};

/**
 * TODO Improve this...
 */
window.route = function (route) {
	let routeElm = document.querySelector('rpas-router');

	routeElm.dataset.route = route;
	history.pushState(null, null, route);
};
