export class DroneListComponent extends HTMLElement {
	static get name () {
		return 'rpas-drone-list';
	}

	constructor () {
		super();
	}

	connectedCallback () {
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
		let wrapElm = document.createElement('tr');

		wrapElm.dataset.id = drone.id;
		wrapElm.innerHTML = `
			<td>${drone.name}</td>
			<td>Todo</td>
			<td>
				<p>Todo<p>
				<button data-id="${drone.id}">Start</button>
			</td>
		`;
		
		this.tableBody.append(wrapElm);

		document.querySelector(`[data-id="${drone.id}"]`).addEventListener('click', this.onClickDrone.bind(this));
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

	get tableBody () {
		return document.querySelector('.aircraft-list');
	}
};

customElements.define(DroneListComponent.name, DroneListComponent);
