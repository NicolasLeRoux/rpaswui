export class StartComponent extends HTMLElement {
	static get name () {
		return 'rpas-start';
	}

	constructor () {
		super();
	}

	connectedCallback () {
		console.log('Start');
	}
};

customElements.define(StartComponent.name, StartComponent);
