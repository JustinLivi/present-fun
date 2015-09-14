class SlideDeck {

	constructor( slideCount, index ) {
		this.slideCount = slideCount;
		this.index = index;
	}

	goToSlide( index ) {
		if ( index >= this.slideCount || index < 0 ) throw new Error(`Slide ${index} out of range`);
		window.open( `/slides/${index}` ,'_self');
	}

	nextSlide() {
		try {
			this.goToSlide( this.index + 1 );
		}
		catch ( e ) {
			console.log( e.message );
		}
	}

	previousSlide() {
		try {
			this.goToSlide( this.index - 1 );
		}
		catch ( e ) {
			console.log( e.message );
		}
	}

}

export default SlideDeck;