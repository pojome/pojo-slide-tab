<?php
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

class Pojo_Sliding_Tab_Settings {
	
	public function register_sidebar() {
		register_sidebar(
			array(
				'id'            => 'pojo-' . sanitize_title( 'Sliding Tab' ),
				'name'          => __( 'Sliding Tab', 'pojo-sliding-tab' ),
				'description'   => __( 'These are widgets for the Sliding Tab', 'pojo-sliding-tab' ),
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