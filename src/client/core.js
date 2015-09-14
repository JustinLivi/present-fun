import SlideDeck from './modules/slidedeck.js';

const SLIDECOUNT = 30;

var index;
var slideDeck;

window.onload = function() {
	index = parseInt($('#slide-index').html());
	slideDeck = new SlideDeck( SLIDECOUNT, index );

	$('body').on('keydown', function( event ) {
		switch ( event.which ) {

			//left
			case 37:
				event.preventDefault();
				slideDeck.previousSlide();
	        	break;

	        // right
	        case 39:
				event.preventDefault();
	        	slideDeck.nextSlide();
	        	break;
		}
	});
}
