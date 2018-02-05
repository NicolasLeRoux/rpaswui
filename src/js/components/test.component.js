export class TestComponent extends HTMLElement {
	static get name () {
		return 'rpas-test';
	}

	constructor () {
		super();
	}

	connectedCallback () {
		console.log('ConnectedCallback from TestComponent.');
	}
};

customElements.define(TestComponent.name, TestComponent);
