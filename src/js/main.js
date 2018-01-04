import test from './test.js';
import PersonneModel from './PersonneModel.js';
import ObservableCollection from './ObservableCollection.js';

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

var model = new PersonneModel({
	name: 'Pierre'
});
window.model = model;
console.log(model.name);
model.subscribe(val => {
	console.log(val);
});
model.name = 'Thomas';

var collection = new ObservableCollection(drones);
window.collection = collection;
collection.subscribe(val => {
	console.log(val);
});
collection.push({
	id: 'drone003',
	name: 'Drone'
});


/**
 * Le proxy pour observer un modèle...
 * Note: Pas d'aglomération des events. Exemple de la méthode ``sort`` qui va
 * faire plusieurs appel aux setters... Le ``Proxy`` est un object bas niveau...
 */
var array = new Proxy([], {
	set (target, prop, value) {
		console.log(target, prop, value);
		target[prop] = value;
		return true;
	}
});
window.array = array;
