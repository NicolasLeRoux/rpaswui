export class RouterElement extends HTMLElement {
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

	receive (message) {
		this.onRouteChange('/aircraft-view', message.data);
	}

	onRouteChange (newRoute, parameters) {
		if (this.dataset.route !== newRoute) {
			let nextPath;
			if (newRoute.includes('/aircraft-view')) {
				nextPath = `${newRoute}/${parameters.remoteId}`;
			} else {
				nextPath = newRoute;
			}

			this.changeTemplate(this.dataset.route, newRoute, parameters);
			this.dataset.route = newRoute;
			window.history.pushState({}, `RAPSWUI: ${nextPath.substring(1)}`, nextPath);
		}
	}

	changeTemplate (oldValue, newValue, attr) {
		const newElm = this.template.querySelector(`[data-route="${newValue}"]`),
			oldElm = this.querySelector(`[data-route="${oldValue}"]`);

		if (oldElm) {
			oldElm.remove();
		}

		if (newElm) {
			let newElmClone = document.importNode(newElm, true);
			if (attr) {
				newElmClone.dataset.remoteId = attr.remoteId;
			}
			this.append(document.importNode(newElmClone, true));
		}
	}

	get template () {
		return this.children[0].content;
	}
};

customElements.define(RouterElement.name, RouterElement);
