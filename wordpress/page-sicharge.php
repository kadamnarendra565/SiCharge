<?php
/**
 * Template Name: SiCharge - SiC Interactive Presentation Template
 * Description: Custom full-width template for presenting the SiCharge Silicon Carbide Project in WordPress.
 *
 * How to use:
 * 1. Copy this file into your active WordPress theme directory: /wp-content/themes/<your-theme>/page-sicharge.php
 * 2. In WordPress Admin -> Pages -> Add New -> In the right sidebar under "Page Attributes" -> Template -> Select "SiCharge - SiC Interactive Presentation Template".
 * 3. Publish page.
 */

// If you want WordPress Header & Footer included, uncomment get_header() and get_footer()
// get_header();
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo( 'charset' ); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?php wp_title('|', true, 'right'); ?> SiCharge — Silicon Carbide Battery Presentation</title>
  
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Lucide Icons -->
  <script src="https://unpkg.com/lucide@latest"></script>
  <!-- Chart.js -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

  <?php wp_head(); ?>
  
  <style>
    <?php echo file_get_contents(get_stylesheet_directory() . '/assets/css/custom.css'); ?>
  </style>
</head>
<body class="bg-[#070c18] text-slate-100 min-h-screen">

  <div id="sicharge-wordpress-container">
    <!-- Embedded Content from index.html -->
    <?php
      // If deployed as theme template:
      $indexPath = get_stylesheet_directory() . '/index.html';
      if (file_exists($indexPath)) {
        // Output body contents
        $content = file_get_contents($indexPath);
        // Extract body portion
        if (preg_match('/<body[^>]*>(.*?)<\/body>/is', $content, $matches)) {
          echo $matches[1];
        } else {
          echo $content;
        }
      } else {
        echo '<div class="p-12 text-center text-white"><h2 class="text-2xl font-bold">SiCharge Presentation Loaded</h2><p class="text-slate-400 mt-2">Place index.html and assets folder in theme directory to render full content.</p></div>';
      }
    ?>
  </div>

  <?php wp_footer(); ?>
</body>
</html>
