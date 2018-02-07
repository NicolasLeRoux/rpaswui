export class RouterComponent extends HTMLElement {
	static get name () {
		return 'rpas-router';
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
