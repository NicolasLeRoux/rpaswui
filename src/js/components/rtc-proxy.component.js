import { ProxyComponent } from './proxy.component.js';

export class RTCProxyComponent extends ProxyComponent {
	static get name () {
		return 'rpas-rtc-proxy';
	}

	constructor () {
		super();
	}

	connectedCallback () {
		this.querySelector('rpas-rtc')
			.addEventListener('message', this.onMessage.bind(this));
	}

	onMessage (event) {
		let data = event.detail,
			actionToSendToSocket = [
				'RTC_ICE_CANDIDATE',
				'INIT_PEER_CO'
			];

		if (actionToSendToSocket.includes(data.action)) {
			let newData = Object.assign({}, data, {
					recipient: 'rpas-socket'
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

customElements.define(RTCProxyComponent.name, RTCProxyComponent);
