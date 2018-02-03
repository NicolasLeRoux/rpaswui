var renderItem = function (item) {
	return `
		<p>${item.name}</p>
	`;
};

var askForPeerCo = function (event) {
	const $elm = event.currentTarget,
		id = $elm.dataset.id;

	ws.send(JSON.stringify({
		type: 'PILOT',
		action: 'INIT_PEER_CO',
		remoteId: id
	}));
};

// Affichage des drones sur le DOM
var elm = document.createElement('ul');
document.body.append(elm);

let ws = new WebSocket('ws://localhost:3000', 'echo-protocol');
ws.onmessage = (event) => {
	let drones = JSON.parse(event.data);

	// RAZ
	elm.innerHTML = '';

	drones.map(item => {
		let li = document.createElement('li');
		li.dataset.id = item.id;
		li.innerHTML = renderItem(item);
		li.addEventListener('click', askForPeerCo);
		elm.append(li);
	});
};
ws.onopen = function (event) {
	ws.send(JSON.stringify({
		type: 'PILOT',
		action: 'INIT_SOCKET'
	}));
};
