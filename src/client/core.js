import SlideDeck from './modules/slidedeck.js';

var slideDeck = new SlideDeck( 1, 0 );

$(window).click( e => {
	console.log('clicked');
	slideDeck.goToSlide( 1 );
});

export default slideDeck;