'use strict'

exports.init = function( req, res ) {

	var index = req.params.index;
	res.render( index + '/index', { index });

}