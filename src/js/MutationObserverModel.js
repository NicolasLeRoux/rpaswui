var mutationObserverConfig = {
	attributes: true,
	attributeOldValue: true
	//attributeFilter
};

class MutationObserverModel {
	static get observedAttributes() {
		return []
	}

	constructor () {
		this.attributes = {};

		if (this.constructor.observedAttributes.length !== 0) {
			var observer = new MutationObserver(this.mutationsCallback);
			this.dataElm = document.createElement('data');

			this.constructor.observedAttributes.forEach(attr => {
				Object.defineProperty(this, attr, {
					get: function () {
						return this.attributes[attr];
					},
					set: function (val) {
						this.attributes[attr] = val;
						if (this.dataElm) this.dataElm.dataset[attr] = val;
					}
				});
			});

			observer.observe(this.dataElm, mutationObserverConfig);
		}
	}

	mutationsCallback (mutations) {
		mutations.forEach(function(mutation) {
			console.log(mutation);
		});
	}
};

export default MutationObserverModel;
