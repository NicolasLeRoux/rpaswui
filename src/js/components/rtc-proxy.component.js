export class RTCProxyComponent extends HTMLElement {
	static get name () {
		return 'rpas-rtc-proxy';
	}

	constructor () {
		super();
	}

	connectedCallback () {
		// TODO
	}
};

customElements.define(RTCProxyComponent.name, RTCProxyComponent);
