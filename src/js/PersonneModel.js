import ObservableModel from './ObservableModel.js';

class Personne extends ObservableModel {
	static default () {
		return {
			name: undefined,
			age: undefined
		}
	}

	constructor (attrs) {
		super(attrs);
	}
}

export default Personne;
