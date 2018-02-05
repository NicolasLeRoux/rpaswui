export class SocketComponent extends HTMLElement {
	static get name () {
		return 'rpas-socket';
	}

	constructor () {
		super();
	}

	/**
	 * Invoked when the custom element is first connected to the document's DOM.
	 */
	connectedCallback () {
		this.ws.onopen = this.onOpenSocket.bind(this);
		this.ws.onmessage = this.onMessageSocket.bind(this);
	}

	onOpenSocket () {
		this.ws.send(JSON.stringify({
			type: 'PILOT',
			action: 'INIT_SOCKET'
		}));

		// TODO tmp
		this.data = {
			name: 'Pierre'
		};
		var evt = new Event('look');
		this.dispatchEvent(evt);
	}

	onMessageSocket () {
	}

	/**
	 * Invoked when the custom element is moved to a new document.
	 */
	adoptedCallback () {
		console.log('adoptedCallback');
	}

	/**
	 * Invoked when the custom element is disconnected from the document's DOM.
	 */
	disconnectedCallback () {
	}

	get ws () {
		if (!this._ws) {
			this._ws = new WebSocket('ws://localhost:3000', 'echo-protocol');
		}
		return this._ws;
	}

	get data () {
		return this._data;
	}

	set data (data) {
		this._data = data;
	}
};

customElements.define(SocketComponent.name, SocketComponent);
