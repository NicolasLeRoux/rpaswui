export class RTCComponent extends HTMLElement {
	static get name () {
		return 'rpas-rtc';
	}

	constructor () {
		super();
	}

	connectedCallback () {
		// TODO
	}

	receive (message) {
		if (message.action === 'START_PEER_COMMUNICATION') {
			this.start(message.data.remoteId);
		}
	}

	start (remoteId) {
		let commandChannel = this.peerCo.createDataChannel('command', {
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

		this.peerCo.ondatachannel = function (event) {
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

		this.peerCo.onicecandidate = (event) => {
			console.info('Client on ICE candidate', event);

			if (event.candidate) {
				this.send({
					type: 'PILOT',
					action: 'RTC_ICE_CANDIDATE',
					candidate: event.candidate,
					remoteId
				});
			}
		};

		this.peerCo.createOffer()
			.then(offerDesc => {
				console.info('Set server local description from offer: ', offerDesc);

				return this.peerCo.setLocalDescription(offerDesc);
			}).then(() => {
				console.info('Set client remote desc from server offer');

				this.send({
					type: 'PILOT',
					action: 'INIT_PEER_CO',
					remoteDescription: this.peerCo.localDescription,
					remoteId
				});
			});
	}

	send (message) {
		let evt = new CustomEvent('message', {
				bubbles: true,
				detail: message
			});

		this.dispatchEvent(evt);
	}

	get peerCo () {
		if (!this._peerCo) {
			this._peerCo = new RTCPeerConnection();
		}

		return this._peerCo;
	}
};

customElements.define(RTCComponent.name, RTCComponent);
