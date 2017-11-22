import m from 'mithril';
import style from './mainComponent.scss';

class MainComponent {
	constructor (vnode) {
		if(window.DeviceOrientationEvent) {
			window.addEventListener('deviceorientation', this.onOrientationChange.bind(this, vnode));
		} else {
			// Le navigateur ne supporte pas l'événement deviceorientation
		}
	}

	view (vnode) {
		return m('div', {
			style: {
				position: 'relative'
			}
		},
		m('div', {
			style: {
				position: 'absolute',
				height: '30px',
				width: '30px',
				backgroundColor: 'red'
			}
		}));
	}

	onOrientationChange (vnode, event) {
		vnode.state.alpha = event.alpha;
		vnode.state.beta = event.beta;
		vnode.state.gamma = event.gamma;
	}
};

export default MainComponent;
