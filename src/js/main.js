import { SocketComponent } from './components/socket.component.js';
import { SocketProxyComponent } from './components/socket-proxy.component.js';
import { RouterComponent } from './components/router.component.js';
import { MessageMediatorComponent } from './components/message-mediator.component.js';
import { RTCComponent } from './components/rtc.component.js';
import { RTCProxyComponent } from './components/rtc-proxy.component.js';
import { DroneListComponent } from './components/drone-list.component.js';
import { StartComponent } from './components/start.component.js';

/**
 * TODO Improve this...
 */
window.route = function (route) {
	let routeElm = document.querySelector('rpas-router');

	routeElm.dataset.route = route;
	history.pushState(null, null, route);
};
