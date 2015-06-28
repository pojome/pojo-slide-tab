<?php
/*
Plugin Name: Pojo Slide Tab
Plugin URI: http://pojo.me/
Description: ...
Author: Pojo Team
Author URI: http://pojo.me/
Version: 1.0.0
Text Domain: pojo-slide-tab
Domain Path: /languages/


This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
*/
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

define( 'POJO_SLIDE_TAB__FILE__', __FILE__ );
define( 'POJO_SLIDE_TAB_BASE', plugin_basename( POJO_SLIDE_TAB__FILE__ ) );
define( 'POJO_SLIDE_TAB_URL', plugins_url( '/', POJO_SLIDE_TAB__FILE__ ) );
define( 'POJO_SLIDE_TAB_ASSETS_URL', POJO_SLIDE_TAB_URL . 'assets/' );

final class Pojo_Slide_Tab {

	/**
	 * @var Pojo_Slide_Tab The one true Pojo_Slide_Tab
	 * @since 1.0.0
	 */
	private static $_instance = null;

	/**
	 * @var Pojo_Slide_Tab_Settings
	 */
	public $settings;

	/**
	 * @var Pojo_Slide_Tab_Front
	 */
	public $front;

	public function load_textdomain() {
		load_plugin_textdomain( 'pojo-slide-tab', false, basename( dirname( __FILE__ ) ) . '/languages' );
	}

	/**
	 * Throw error on object clone
	 *
	 * The whole idea of the singleton design pattern is that there is a single
	 * object therefore, we don't want the object to be cloned.
	 *
	 * @since 1.0.0
	 * @return void
	 */
	public function __clone() {
		// Cloning instances of the class is forbidden
		_doing_it_wrong( __FUNCTION__, __( 'Cheatin&#8217; huh?', 'pojo-slide-tab' ), '1.0.0' );
	}

	/**
	 * Disable unserializing of the class
	 *
	 * @since 1.0.0
	 * @return void
	 */
	public function __wakeup() {
		// Unserializing instances of the class is forbidden
		_doing_it_wrong( __FUNCTION__, __( 'Cheatin&#8217; huh?', 'pojo-slide-tab' ), '1.0.0' );
	}

	/**
	 * @return Pojo_Slide_Tab
	 */
	public static function instance() {
		if ( is_null( self::$_instance ) )
			self::$_instance = new Pojo_Slide_Tab();

		return self::$_instance;
	}

	public function admin_notices() {
		echo '<div class="error"><p>' . sprintf( __( '<a href="%s" target="_blank">Pojo Framework</a> is not active. Please activate any theme by Pojo before you are using "Pojo Slide Tab" plugin.', 'pojo-slide-tab' ), 'http://pojo.me/' ) . '</p></div>';
	}

	public function bootstrap() {
		// This plugin for Pojo Themes..
		if ( ! class_exists( 'Pojo_Core' ) ) {
			add_action( 'admin_notices', array( &$this, 'admin_notices' ) );
			return;
		}
		
		include( 'includes/class-pojo-slide-tab-settings.php' );
		include( 'includes/class-pojo-slide-tab-front.php' );

		$this->settings = new Pojo_Slide_Tab_Settings();
		$this->front    = new Pojo_Slide_Tab_Front();
	}

	private function __construct() {
		add_action( 'init', array( &$this, 'bootstrap' ) );
		add_action( 'plugins_loaded', array( &$this, 'load_textdomain' ) );
	}

}

Pojo_Slide_Tab::instance();