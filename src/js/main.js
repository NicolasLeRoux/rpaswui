import test from './test.js';
import PersonneModel from './PersonneModel.js';
import ObservableCollection from './ObservableCollection.js';

var renderItem = function (item) {
	return `
		<p>${item.name}</p>
	`;
};

// Affichage des drones sur le DOM
var elm = document.createElement('ul');
document.body.append(elm);

let ws = new WebSocket('ws://localhost:3000', 'echo-protocol');
ws.onmessage = (event) => {
	let drones = JSON.parse(event.data);

	drones.map(item => {
		if (!document.querySelector(`#${item.id}`)) {
			let li = document.createElement('li');
			li.id = item.id;
			li.innerHTML = renderItem(item);
			elm.append(li);
		}
	});
};
