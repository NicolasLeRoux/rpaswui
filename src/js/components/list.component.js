export class ListComponent extends HTMLElement {
	static get name () {
		return 'rpas-list';
	}

	constructor () {
		super();
	}

	connectedCallback () {
		// TODO
	}

	receive (message) {
		let drones = message.drones;

		this.innerHTML = ""; // RAZ
		drones.forEach(this.appendDrone.bind(this));
	}

	appendDrone (drone) {
		let wrapElm = document.createElement('div');

		wrapElm.dataset.id = drone.id;
		wrapElm.innerHTML = `
			<p>${drone.name}</p>
		`;

		this.append(wrapElm);
	}
};

customElements.define(ListComponent.name, ListComponent);
