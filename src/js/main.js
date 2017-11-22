import test from './test.js';

// Liste de drone disponible au pilotage.
var drones = [
	{
		id: 'drone001',
		name: 'Super drone'
	},
	{
		id: 'drone002',
		name: 'Micro drone'
	}
];

// TODO Debug only
window.drones = drones;

var obs = new Rx.Subject(drones)
	.pairwise();

var renderItem = function (item) {
	return `
		<p>${item.name}</p>
	`;
};

// Affichage des drones sur le DOM
var elm = document.createElement('ul');
document.body.append(elm);

/**
 * Le diff est à voir pour plus tard, pour le moment un re-render butal est good
 * enough...
 */
drones.map(item => {
	if (!document.querySelector(`#${item.id}`)) {
		let li = document.createElement('li');
		li.id = item.id;
		li.innerHTML = renderItem(item);
		elm.append(li);
	}
});

obs.subscribe(([old, current]) => {
	console.log(old, current);
});

drones.push({
	id: 'drone003',
	name: 'Drone'
});
obs.next(drones.slice());

drones.push({
	id: 'drone004',
	name: 'DroneBis'
});
obs.next(drones.slice());
