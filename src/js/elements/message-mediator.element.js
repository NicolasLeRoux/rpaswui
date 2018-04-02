export class MessageMediatorElement extends HTMLElement {
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
		let message = event.detail,
			$recipient;

		event.stopPropagation();

		if (message.recipient) {
			$recipient = this.querySelector(message.recipient);

			if ($recipient) {
				if (typeof $recipient.receive === 'function') {
					$recipient.receive(message);
				} else {
					console.warn(`Recipient '${message.recipient}' do not implement 'receive' method. Message:`, message);
				}
			} else {
				console.warn(`Recipient '${message.recipient}' do not found on childs. Message:`, message);
			}
		} else {
			console.warn('No recipient for current message. Message:', message);
		}
	}
};

customElements.define(MessageMediatorElement.name, MessageMediatorElement);
