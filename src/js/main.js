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

	// RAZ
	elm.innerHTML = '';

	drones.map(item => {
		if (!document.querySelector(`#${item.id}`)) {
			let li = document.createElement('li');
			li.id = item.id;
			li.innerHTML = renderItem(item);
			elm.append(li);
		}
	});
};
ws.onopen = function (event) {
	ws.send(JSON.stringify({
		type: 'PILOT'
	}));
};
