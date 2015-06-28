/*!
 * @author: Pojo Team
 */
/* global jQuery */

( function( $ ) {
	'use strict';

	var Pojo_Slide_Tab_App = {
		cache: {
			$document: $( document ),
			$window: $( window )
		},
		
		cacheElements: function() {},

		buildElements: function() {},

		bindEvents: function() {
			$( '#pojo-slide-tab' ).pojoSlideTab();
		},
		
		init: function() {
			this.cacheElements();
			this.buildElements();
			this.bindEvents();
		}
	};

	$( document ).ready( function( $ ) {
		Pojo_Slide_Tab_App.init();
	} );

}( jQuery ) );
