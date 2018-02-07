export class RTCProxyComponent extends HTMLElement {
	static get name () {
		return 'rpas-rtc-proxy';
	}

	constructor () {
		super();
	}

	connectedCallback () {
		console.log('RTC Proxy');
	}
};

customElements.define(RTCProxyComponent.name, RTCProxyComponent);
