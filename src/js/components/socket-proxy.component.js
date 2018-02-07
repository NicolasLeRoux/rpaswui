import { ProxyComponent } from './proxy.component.js';

export class SocketProxyComponent extends ProxyComponent {
	static get name () {
		return 'rpas-socket-proxy';
	}

	constructor () {
		super();
	}

	connectedCallback () {
		this.querySelector('rpas-socket')
			.addEventListener('message', this.onMessage.bind(this));
	}

	onMessage (event) {
		let data = event.detail,
			actionToSendToDroneList = [
				'UPDATE_REMOTE'
			],
			actionToSendToRTC = [
				'RTC_ICE_CANDIDATE',
				'INIT_PEER_CO'
			];

		if (actionToSendToDroneList.includes(data.action)) {
			let newData = Object.assign({}, data, {
					recipient: 'rpas-drone-list'
				}),
				evt = new CustomEvent('message', {
					bubbles: true,
					detail: newData
				});

			event.stopPropagation();
			this.dispatchEvent(evt);
		} else if (actionToSendToRTC.includes(data.action)) {
			let newData = Object.assign({}, data, {
					recipient: 'rpas-rtc'
				}),
				evt = new CustomEvent('message', {
					bubbles: true,
					detail: newData
				});

			event.stopPropagation();
			this.dispatchEvent(evt);
		}
	}
};

customElements.define(SocketProxyComponent.name, SocketProxyComponent);
