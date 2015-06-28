/*!
* @author: Pojo Team
 */
/* global jQuery */

;( function( $, window, document, undefined ) {
	'use strict';
	
	var pluginName = "pojoSlideTab",
		defaults = {};

	function Plugin( element, options ) {
		this.$element = $( element );
		this.settings = $.extend( {}, defaults, options );
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}
	
	Plugin.prototype = {
		init: function() {
			var self = this,
				$elem = self.$element;

			var toggle = $( '.toggle a', '#pojo-slide-tab' ),
				_get_container_height = function() {
					$container = $( '#pojo-slide-tab .body' );

					return $container.outerHeight() - 25;
				},
				$container = $( '#pojo-slide-tab .body' );

			toggle.on( 'click', function( e ) {
				e.preventDefault();
				if ( ! $( this ).hasClass( 'open' ) ) {
					$container.animate( {
						marginBottom: 0
					}, 500, 'easeOutQuint' );
					toggle.addClass( 'open' );
				} else {
					$container.animate( {
						marginBottom: - _get_container_height()
					}, 500, 'easeOutQuint' );
					toggle.removeClass( 'open' );
				}

				$( window )
					.trigger( 'resize' )
					.trigger( 'smartresize' );
			} );

			$( window ).on( 'resize pojo_isotope_loaded', function() {
				if ( ! toggle.hasClass( 'open' ) ) {
					$container.css( {
						marginBottom: - _get_container_height(),
						display: 'block'
					} );
				}
			} )
				.trigger( 'resize' );
		}
	};

	$.fn[ pluginName ] = function( options ) {
		this.each( function() {
			if ( ! $.data( this, "plugin_" + pluginName ) ) {
				$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
			}
		} );

		return this;
	};
} ) ( jQuery, window, document );