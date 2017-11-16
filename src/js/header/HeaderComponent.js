import m from 'mithril';
import style from './headerComponent.scss';

class HeaderComponent {
	view (vnode) {
		return m('div', {
			class: 'mdc-toolbar'
		}, [
			m('div', {
				class: 'mdc-toolbar__row'
			},
				m('section', {
					class: 'mdc-toolbar__section mdc-toolbar__section--align-start'
				}, [
					m('a', {
						class: 'material-icons mdc-toolbar__menu-icon'
					}, 'menu'),
					m('span', {
						class: 'mdc-toolbar__title'
					}, 'Title')
				])
			)
		]);
	}
};

export default HeaderComponent;
