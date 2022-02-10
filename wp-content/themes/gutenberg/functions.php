<?php

if (!function_exists('df_setup')) {
    function df_setup()
    {
        define('DISALLOW_FILE_EDIT', true);

        add_theme_support('title-tag');
        add_theme_support('post-thumbnails');

        add_theme_support('editor-gradient-presets', []);
        add_theme_support('disable-custom-gradients');
        add_theme_support('editor-color-palette', array(''));
        add_theme_support('disable-custom-font-sizes');

        register_nav_menus(array(
            'header_menu' => 'Header Menu',
        ));
    }
}
add_action('after_setup_theme', 'df_setup');
//
function df_scripts()
{
    wp_deregister_style('wp-block-library');
    wp_deregister_script('jquery');

    wp_register_script('jquery', 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js', [], '3.4.1', true);

    wp_enqueue_style('main-styles', get_template_directory_uri() . '/assets/build/main.css', null, filemtime(get_template_directory() . '/assets/build/main.css'));
    wp_enqueue_script('main-js', get_template_directory_uri() . '/assets/build/main.js', array('jquery'), filemtime(get_template_directory() . '/assets/build/main.js'), true);

    wp_enqueue_style('blocks', get_template_directory_uri() . '/assets/build/style-blocks.css', null, filemtime(get_template_directory() . '/assets/build/style-blocks.css'));
}

add_action('wp_enqueue_scripts', 'df_scripts');

//
function df_blocks()
{
    $asset_file = include get_template_directory(__FILE__) . '/assets/build/blocks.asset.php';
    wp_enqueue_style('blocks', get_template_directory_uri() . '/assets/build/style-blocks.css', null, filemtime(get_template_directory() . '/assets/build/style-blocks.css'));
    wp_enqueue_script('blocks', get_template_directory_uri() . '/assets/build/blocks.js', $asset_file['dependencies'], $asset_file['version'], true);
    wp_enqueue_style('editor', get_template_directory_uri() . '/assets/build/editor.css', null, filemtime(get_template_directory() . '/assets/build/editor.css'));
}

add_action('enqueue_block_editor_assets', 'df_blocks');


//
function admin_styles()
{
    wp_enqueue_style('admin', get_template_directory_uri() . '/assets/build/admin.css', null, filemtime(get_template_directory() . '/assets/build/admin.css'));
    wp_enqueue_script('admin-js', get_template_directory_uri() . '/assets/admin-scripts/scripts.js', array('jquery'), filemtime(get_template_directory() . '/assets/admin-scripts/scripts.js'), true);
}
add_action('admin_enqueue_scripts', 'admin_styles');
