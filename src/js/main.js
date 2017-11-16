import m from 'mithril';
import test from './test.js';
import style from './main.scss';
import HeaderComponent from './header/HeaderComponent.js';
import MainComponent from './main/MainComponent.js';

window.onload = function () {
	m.route.prefix('');

	m.mount(document.querySelector('body > header'), HeaderComponent);
	m.mount(document.querySelector('body > main'), MainComponent);
};
