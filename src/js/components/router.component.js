export class RouterComponent extends HTMLElement {
	static get name () {
		return 'rpas-router';
	}

	static get observedAttributes () {
		return [
			'data-route'
		];
	}

	constructor () {
		super();
	}

	connectedCallback () {
		console.debug('Initializing Router')
		window.route = function (route) {
			this.dataset.route = route;
			history.pushState(null, null, route);
		};
	}

	attributeChangedCallback(name, oldValue, newValue) {
		switch (name) {
			case 'data-route':
				this.onRouteChange(name, oldValue, newValue);
				break;
			default:
				console.warn('Unwatch attribute', name);
		}
	}

	onRouteChange (name, oldValue, newValue) {
		let newElm = this.template.querySelector(`[data-route="${newValue}"]`),
			oldElm = this.querySelector(`[data-route="${oldValue}"]`);

		if (oldElm) {
			oldElm.remove();
		}

		if (newElm) {
			this.append(document.importNode(newElm, true));
		}
	}

	get template () {
		return this.children[0].content;
	}
};

customElements.define(RouterComponent.name, RouterComponent);
