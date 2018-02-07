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
		switch (message.action) {
			case 'UPDATE_REMOTE':
				let drones = message.drones;

				this.innerHTML = ""; // RAZ
				drones.forEach(this.appendDrone.bind(this));
				break;
			default:
				console.error('Undefined action...', {
					action: message.action
				});
		}
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
			data = {
				action: 'START_PEER_COMMUNICATION',
				recipient: 'rpas-rtc',
				data: {
					remoteId
				}
			},
			evt = new CustomEvent('message', {
				bubbles: true,
				detail: data
			});

		this.dispatchEvent(evt);
	}
};

customElements.define(DroneListComponent.name, DroneListComponent);
