export class MessageMediatorComponent extends HTMLElement {
	static get name () {
		return 'rpas-message-mediator';
	}

	constructor () {
		super();
	}

	connectedCallback () {
		this.addEventListener('message', this.onMessage.bind(this));
	}

	onMessage (event) {
		console.log(event);
	}
};

customElements.define(MessageMediatorComponent.name, MessageMediatorComponent);
