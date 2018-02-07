export class StartComponent extends HTMLElement {
	static get name () {
		return 'rpas-start';
	}

	constructor () {
		super();
	}

	connectedCallback () {
		let $btn = this.querySelector('button');

		$btn.addEventListener('click', this.onClickButton.bind(this));
	}

	onClickButton (event) {
		let evt = new CustomEvent('message', {
			bubbles: true,
			detail: {
				action: 'INIT_SOCKET',
				recipient: 'rpas-socket',
				type: 'PILOT'
			}
		});

		this.dispatchEvent(evt);
	}
};

customElements.define(StartComponent.name, StartComponent);
