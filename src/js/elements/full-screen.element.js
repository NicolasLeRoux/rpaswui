import fs from '../vendors/fullscreen.js';

const tmpl = function (data = {}) {
	return `
		<style>
			:host {
				display: block;
				position: relative;
			}

			:host:-webkit-full-screen  {
				width: 100%;
				height: 100%;
			}
		</style>
		<slot></slot>
	`;
};

export class FullScreenElement extends HTMLElement {
	static get name () {
		return 'rpas-full-screen';
	}

	constructor () {
		super();
	}

	connectedCallback () {
		const shadow = this.attachShadow({
				mode: 'open'
			});
		const tmpElm = document.createElement('div');
		tmpElm.innerHTML = tmpl();

		[...tmpElm.children].forEach((child) => {
			shadow.appendChild(child);
		});

		const goElm = this.querySelector('.go-fs');
		const exitElm = this.querySelector('.exit-fs');

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

customElements.define(FullScreenElement.name, FullScreenElement);
