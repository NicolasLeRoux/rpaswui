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

	get rtc () {
		if (!this._rtc) {
			this._rtc = new new RTCPeerConnection();
		}

		return this._rtc;
	}
};

customElements.define(RTCComponent.name, RTCComponent);
