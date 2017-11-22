import m from 'mithril';
import test from './test.js';
import style from './main.scss';
import HeaderView from './header/HeaderView.js';

window.onload = function () {
	m.route.prefix('');

	m.mount(document.querySelector('body > header'), HeaderView);
};
