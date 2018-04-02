const tmpl = function (data = {}) {
	return `
		<style>
			svg {
				width: 24px;
				height: 24px;
			}
		</style>
		<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false">
			<g>
				<path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"></path>
			</g>
		</svg>
	`;
};

export class FullScreenExitIconElement extends HTMLElement {

	static get name () {
		return 'rpas-full-screen-exit-icon';
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
	}
}

customElements.define(FullScreenExitIconElement.name, FullScreenExitIconElement);
