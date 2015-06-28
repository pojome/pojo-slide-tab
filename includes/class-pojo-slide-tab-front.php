<?php
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

class Pojo_Slide_Tab_Front {

	public function enqueue_scripts() {
		wp_enqueue_style( 'pojo-slide-tab', POJO_SLIDE_TAB_ASSETS_URL . 'css/style.css' );
		wp_register_script( 'pojo-slide-tab', POJO_SLIDE_TAB_ASSETS_URL . 'js/app.min.js', array( 'jquery' ), false, true );
		wp_enqueue_script( 'pojo-slide-tab' );
	}

	public function footer() {
		?>
		<div id="pojo-slide-tab">
			<div class="toggle">
				<a href="javascript:void(0);">Click me</a>
			</div>
			
			<div class="body">
				<div class="body-inner">
					<?php dynamic_sidebar( 'pojo-' . sanitize_title( 'Slide Tab' ) ); ?>
				</div>
			</div>
		</div>
		<?php
	}

	public function __construct() {
		add_action( 'wp_enqueue_scripts', array( &$this, 'enqueue_scripts' ), 50 );
		add_action( 'wp_footer', array( &$this, 'footer' ) );
	}
	
}