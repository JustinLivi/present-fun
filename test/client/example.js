import Example from '../../client/views/example/index.js';

describe('Example', function() {

	let example = new Example();

	it('should throw an error', function() {
		expect( example.testError ).to.throw( 'test error' );
	});

});