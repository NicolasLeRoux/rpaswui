export class RouterComponent extends HTMLElement {
	static get name () {
		return 'rpas-router';
	}

	constructor () {
		super();
	}

	connectedCallback () {
		this.initiateRouteListening();
		this.onRouteChange(window.location.pathname !== "/" ? window.location.pathname : '/home');
	}

	initiateRouteListening () {
		document.querySelectorAll('[data-router-target]').forEach((item) => {
			item.onclick = this.onRouteChange.bind(this, item.dataset.routerTarget);
		}, this);
	}

	onRouteChange (newRoute) {
		if (this.dataset.route !== newRoute) {
			this.changeTemplate(this.dataset.route, newRoute);
			this.dataset.route = newRoute;
			window.history.pushState({}, `RAPSWUI: ${newRoute.substring(1)}`, newRoute);
		}
	}

	changeTemplate (oldValue, newValue) {
		const newElm = this.template.querySelector(`[data-route="${newValue}"]`),
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
