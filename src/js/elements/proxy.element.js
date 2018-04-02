export class ProxyElement extends HTMLElement {
	static get name () {
		return 'rpas-proxy';
	}

	constructor () {
		super();
	}

	connectedCallback () {
		console.log('Proxy');
	}
};

customElements.define(ProxyElement.name, ProxyElement);
