export class RTCComponent extends HTMLElement {
	static get name () {
		return 'rpas-rtc';
	}

	constructor () {
		super();
	}

	connectedCallback () {
		let remoteId = this.parentElement.parentElement.dataset.remoteId;
		if (remoteId) {
			this.start(remoteId);
		} else {
			console.error('Missing remote Id to start rtc connection');
		}
	}

	receive (message) {
		switch (message.action) {
			case 'INIT_PEER_CO':
				this.peerCo.setRemoteDescription(new RTCSessionDescription(message.remoteDescription))
					.then(() => {
						console.info('WebRTC ready.');
					});
				break;
			case 'RTC_ICE_CANDIDATE':
				this.peerCo.addIceCandidate(message.candidate)
					.then(() => {
						console.info('Adding ICE candidate success ! Info: ', message.candidate);
					}).catch(error => {
						console.warn('ICE candidate error: ', error);
					});
				break;
			default:
				console.error('Undefined action...', {
					action: message.action
				});
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
			document.querySelectorAll('[data-command-direction]').forEach((item) => {
				item.onclick = () => {
					commandChannel.send(JSON.stringify({
						type: 'COMMAND',
						direction: item.dataset.commandDirection
					}));
				};
			}, this);
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
