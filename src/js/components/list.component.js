export class ListComponent extends HTMLElement {
	static get name () {
		return 'rpas-list';
	}

	constructor () {
		super();
	}

	connectedCallback () {
		console.log('List');
	}

	receive () {
		console.warn('TODO: Implement method !');
	}
};

customElements.define(ListComponent.name, ListComponent);
