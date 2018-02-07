export class SocketProxyComponent extends HTMLElement {
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
		let data = event.detail;

		if (data.action === 'UPDATE_REMOTE') {
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
