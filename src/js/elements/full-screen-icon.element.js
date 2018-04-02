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
				<path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"></path>
			</g>
		</svg>
	`;
};

export class FullScreenIconElement extends HTMLElement {

	static get name () {
		return 'rpas-full-screen-icon';
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

customElements.define(FullScreenIconElement.name, FullScreenIconElement);
