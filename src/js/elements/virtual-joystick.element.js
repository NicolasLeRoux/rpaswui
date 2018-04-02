import VirtualJoystick from '../vendors/virtualjoystick.js';

export class VirtualJoystickElement extends HTMLElement {

    static get name () {
		return 'rpas-virtual-joystick';
	}

	constructor () {
		super();
    }
    
    connectedCallback () {
        console.log("touchscreen is", VirtualJoystick.touchScreenAvailable() ? "available" : "not available");
        const img = this.querySelector('img');
        const joystick = new VirtualJoystick({
            container : img,
            mouseSupport : true
        });
        let joystickListener;
        joystick.addEventListener('touchStart', function(){
            console.log('touchStart');
            joystickListener = setInterval(function(){
                console.log(`dx: ${joystick.deltaX()}`);
                console.log(`dy: ${joystick.deltaY()}`);
                console.log(`right: ${joystick.right()}`);
                console.log(`up: ${joystick.up()}`);
                console.log(`left: ${joystick.left()}`);
                console.log(`down: ${joystick.down()}`);
            }, 500);
        });
        joystick.addEventListener('mousedown', function(){
            console.log('mousedown');
            joystickListener = setInterval(function(){
                console.log(`dx: ${joystick.deltaX()}`);
                console.log(`dy: ${joystick.deltaY()}`);
                console.log(`right: ${joystick.right()}`);
                console.log(`up: ${joystick.up()}`);
                console.log(`left: ${joystick.left()}`);
                console.log(`down: ${joystick.down()}`);
            }, 500);
        });
        joystick.addEventListener('touchEnd', function(){
            console.log('touchEnd');
            clearInterval(joystickListener);
        });
        joystick.addEventListener('mouseup', function(){
            console.log('mouseup');
            clearInterval(joystickListener);
        });
    }
}

customElements.define(VirtualJoystickElement.name, VirtualJoystickElement);