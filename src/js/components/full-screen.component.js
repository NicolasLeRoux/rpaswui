import fs from '../vendors/fullscreen.js';

export class FullScreenComponent extends HTMLElement {
    static get name () {
        return 'rpas-full-screen';
    }

    constructor () {
        super();
    }

	connectedCallback () {
        const goElm = this.querySelector('button.go-fs');
        const exitElm = this.querySelector('button.exit-fs');

        goElm.addEventListener('click', this.onClickGo.bind(this));
        exitElm.addEventListener('click', this.onClickExit.bind(this));
    }

    onClickGo () {
        fs.requestFullscreen(this);
    }

    onClickExit () {
        fs.exitFullscreen();
    }
}

customElements.define(FullScreenComponent.name, FullScreenComponent);
