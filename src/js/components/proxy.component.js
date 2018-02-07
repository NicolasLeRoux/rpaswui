export class ProxyComponent extends HTMLElement {
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

customElements.define(ProxyComponent.name, ProxyComponent);
