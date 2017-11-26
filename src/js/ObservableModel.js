class ObservableModel {
	constructor (attrs) {
		this.attributes = Object.assign({},
			this.constructor.default(),
			attrs);

		for (let attr in this.attributes) {
			Object.defineProperty(this, attr, {
				get: function () {
					return this.attributes[attr];
				},
				set: function (val) {
					this.attributes[attr] = val;
					if (this.observer) this.observer.next(this.attributes);
				}
			});
		}
	}

	subscribe (func) {
		if (!this.observer) {
			this.observable = new Observable(observer => {
				this.observer = observer;
			});
		}
		this.observable.subscribe(func);
	}

	destroy () {
		if (this.observer) this.observer.complete();
	}
};

export default ObservableModel;
