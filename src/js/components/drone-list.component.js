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
		let $elm = event.currentTarget,
			remoteId = $elm.dataset.id,
			json = {
				action: 'START_PEER_COMMUNICATION',
				recipient: 'rpas-rtc',
				data: {
					remoteId
				}
			},
			evt = new CustomEvent('message', {
				bubbles: true,
				detail: json
			});

		this.dispatchEvent(evt);
	}
};

customElements.define(DroneListComponent.name, DroneListComponent);
