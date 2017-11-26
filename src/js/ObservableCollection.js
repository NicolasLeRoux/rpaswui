class ObservableCollection {
	constructor (array) {
		this.array = array;
	}

	push (item) {
		this.array.push(item);
		if (this.observer) this.observer.next(this.array);
	}

	pop () {
		this.array.pop();
		if (this.observer) this.observer.next(this.array);
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

export default ObservableCollection;
