export class RouterComponent extends HTMLElement {
	static get name () {
		return 'rpas-router';
	}

	constructor () {
		super();
	}
};

customElements.define(RouterComponent.name, RouterComponent);
