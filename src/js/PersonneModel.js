import ObservableModel from './ObservableModel.js';

class Personne extends ObservableModel {
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

export default Personne;
