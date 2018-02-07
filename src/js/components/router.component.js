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
		document.querySelectorAll('[data-router-target]').forEach((item) => {
			item.onclick = () => {
				this.onRouteChange(this.dataset.route, item.dataset.routerTarget);
				this.dataset.route = item.dataset.routerTarget;
			};
		}, this);
	}

	attributeChangedCallback(name, oldValue, newValue) {
		switch (name) {
			case 'data-route':
				//this.onRouteChange(name, oldValue, newValue);
				break;
			default:
				console.warn('Unwatch attribute', name);
		}
	}

	onRouteChange (oldValue, newValue) {
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
