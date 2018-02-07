export class DroneListComponent extends HTMLElement {
	static get name () {
		return 'rpas-drone-list';
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
		wrapElm.addEventListener('click', this.onClickDrone.bind(this));

		this.append(wrapElm);
	}

	onClickDrone (event) {
		console.log(event);
	}
};

customElements.define(DroneListComponent.name, DroneListComponent);
