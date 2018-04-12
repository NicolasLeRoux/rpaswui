export class VirtualJoystickElement extends HTMLElement {

    static get name () {
		return 'rpas-virtual-joystick';
    }

	constructor () {
		super();
    }
    
    connectedCallback () {
        this.joystick = nipplejs.create({
            zone: this,
            color: 'black',
            mode: 'static',
            position: {left: '75%', top: '50%'},
        });
    }
}

customElements.define(VirtualJoystickElement.name, VirtualJoystickElement);