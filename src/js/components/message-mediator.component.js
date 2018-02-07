export class MessageMediatorComponent extends HTMLElement {
	static get name () {
		return 'rpas-message-mediator';
	}

	constructor () {
		super();
	}

	connectedCallback () {
        console.log('Mediator');
	}
};

customElements.define(MessageMediatorComponent.name, MessageMediatorComponent);
