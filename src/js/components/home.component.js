export class HomeComponent extends HTMLElement {
	static get name () {
		return 'rpas-home';
	}

	constructor () {
		super();
	}

	connectedCallback () {
        console.log('Home');
	}
};

customElements.define(HomeComponent.name, HomeComponent);

