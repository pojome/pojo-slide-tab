<?php
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

class Pojo_Slide_Tab_Settings {
	
	public function register_sidebar() {
		register_sidebar(
			array(
				'id'            => 'pojo-' . sanitize_title( 'Slide Tab' ),
				'name'          => __( 'Slide Tab', 'pojo-slide-tab' ),
				'description'   => __( 'These are widgets for the Slide Tab', 'pojo-slide-tab' ),
				'before_widget' => '<section id="%1$s" class="widget %2$s"><div class="widget-inner">',
				'after_widget'  => '</div></section>',
				'before_title'  => '<h5 class="widget-title"><span>',
				'after_title'   => '</span></h5>',
			)
		);
	}

	public function __construct() {
		$this->register_sidebar();
	}
	
}