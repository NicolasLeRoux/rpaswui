export class SocketComponent extends HTMLElement {
	static get name () {
		return 'rpas-socket';
	}

	static get observedAttributes () {
		return [
			'data-url'
		];
	}

	constructor () {
		super();

		this.isOpen = false;
	}

	attributeChangedCallback (name, oldValue, newValue) {
		switch (name) {
			case 'data-url':
				this.onUrlChange(name, oldValue, newValue);
				break;
			default:
				console.warn('Unwatch attribute', name);
		}
	}

	onUrlChange (name, oldValue, newValue) {
		this.ws.onopen = this.onOpenSocket.bind(this);
		this.ws.onmessage = this.onMessageSocket.bind(this);
		this.ws.onclose = this.onCloseSocket.bind(this);
	}

	onOpenSocket () {
		let evt = new CustomEvent('open', {
			bubbles: true
		});
		this.dispatchEvent(evt);

		this.isOpen = true;
	}

	onMessageSocket () {
		let json = JSON.parse(event.data),
			evt = new CustomEvent('message', {
				bubbles: true,
				detail: json
			});

		this.dispatchEvent(evt);
	}

	onCloseSocket () {
		let evt = new CustomEvent('close', {
			bubbles: true
		});
		this.dispatchEvent(evt);

		this.isOpen = false;
	}

	receive (message) {
		this.ws.send(JSON.stringify(message));
	}

	/**
	 * Invoked when the custom element is disconnected from the document's DOM.
	 */
	disconnectedCallback () {
		this.ws.close();
	}

	get ws () {
		if (!this._ws) {
			this._ws = new WebSocket(this.dataset.url, this.dataset.protocol);
		}
		return this._ws;
	}

	get isOpen () {
		return this._isOpen;
	}

	set isOpen (boolean) {
		this._isOpen = !!boolean;
	}
};

customElements.define(SocketComponent.name, SocketComponent);
