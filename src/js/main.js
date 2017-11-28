import test from './test.js';
import PersonneModel from './PersonneModel.js';
import ObservableCollection from './ObservableCollection.js';
import MutationObserverModel from './MutationObserverModel.js';

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


/**
 * Avec les ``MutationObserver``...
 * Pas de tri sur l'objet ``HTMLCollection``... Par contre, lors de l'ajout de
 * plusieurs éléments, un seul record est envoyé. Même lors d'ajout à la chaine,
 * le callback est appellé une fois avec plusieurs mutations.
 */
var observer = new MutationObserver(function(mutations) {
	mutations.forEach(function(mutation) {
		console.log(mutation);
	});
});
var target = document.createElement('ul');
window.target = target;

// configuration of the observer:
var config = {
	attributes: true,
	childList: true,
	characterData: true
};

// pass in the target node, as well as the observer options
observer.observe(target, config);

target.append(document.createElement('li'), document.createElement('li'));
target.append(document.createElement('li'));


/**
 * Warning, impossible d'avoir des majuscule dans les noms des attributes...
 */
class Pers extends MutationObserverModel {
	static get observedAttributes() {
		return [
			'name',
			'age'
		]
	}

	constructor (attrs) {
		super(attrs);
	}
}

var pers = new Pers();
window.pers = pers;
