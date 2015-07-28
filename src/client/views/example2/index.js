export class Example2 {
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
}