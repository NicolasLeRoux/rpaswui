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
};

customElements.define(RTCComponent.name, HomeComponent);
