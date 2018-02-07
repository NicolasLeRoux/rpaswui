export class RTCComponent extends HTMLElement {
	static get name () {
		return 'rpas-rtc';
	}

	constructor () {
		super();
	}

	connectedCallback () {
		console.log('RTC');
	}

	receive () {
		console.warn('TODO: Implement method !');
	}
};

customElements.define(RTCComponent.name, RTCComponent);
