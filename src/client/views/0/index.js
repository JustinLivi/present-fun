class Example {

	constructor() {
		this.test = 'test';
	}

	promiseToTest() {
		return new Promise(( resolve ) => {
			window.setTimeout(() => {
				resolve( this.test );
			}, 1000);
		});
	}

	testError() {
		throw new Error('test error');
	}
}

export default Example;