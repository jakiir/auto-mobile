<?php
if (!class_exists( 'atm_export' )){ 
		class atm_export{
/**
* Constructor
*/
public function __construct()
{
	global $wpdb;
if(isset($_GET['download_report']))
{
$csv = $this->generate_csv();
$sitename = sanitize_key( get_bloginfo( 'name' ) );
if ( ! empty($sitename) ) $sitename .= '.';
$filename = $sitename . 'atm.' . date( 'Y-m-d' );

header("Pragma: public");
header("Expires: 0");
header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
header("Cache-Control: private", false);
header("Content-Type: application/octet-stream");
header("Content-Disposition: attachment; filename=\"$filename.csv\";" );
header("Content-Transfer-Encoding: binary");

echo $csv;
exit;
}

// Create end-points
add_filter('query_vars', array($this, 'query_vars'));
add_action('parse_request', array($this, 'parse_request'));
}


/**
* Allow for custom query variables
*/
public function query_vars($query_vars)
{
$query_vars[] = 'download_report';
return $query_vars;
}

/**
* Parse the request
*/
public function parse_request(&$wp)
{
if(array_key_exists('download_report', $wp->query_vars))
{
$this->download_report();
exit;
}
}

/**
* Download report
*/
public function download_report()
{
echo '<div class="wrap">';
echo '<div id="icon-tools" class="icon32">
</div>';
echo '<h2>Download Report</h2>';
//$url = site_url();

echo '<p>Export the Subscribers';
}

/**
* Converting data to CSV
*/
public function generate_csv()
{
	global $wpdb;
$csv_output = '';

$i = 0;
/*foreach ( $wpdb->get_col( "DESC " . $table_name, 0 ) as $column_name ) {

  //error_log( $column_name );
  $csv_output = $csv_output . $column_name.",";
$i++;
}*/
$colnames = array(
	'part' => 'Part #',
	'category' => 'Category',
	'year' => 'Year',
	'make' => 'Make',
	'model' => 'Model',
	'color' => 'Color',
	'position' => 'Position',
	'mpn' => 'MPN',
	'title' => 'Title',
	'price' => 'Price',
	'qty' => 'Qty',
	'weight' => 'Weight',
	'image' => 'Image',
	'description' => 'Description',
	'application_notes' => 'Application Notes',
	'action' => 'Action'
);
foreach($colnames as $colname) {
	$csv_output = $csv_output . $colname.",";
	$i++;
}

$csv_output .= "\n";

$args = array( 'post_type' => 'tlp_automobile', 'posts_per_page' => -1, 'post_status' => 'any', 'post_parent' => null ); 
$attachments = get_posts( $args );
if ( $attachments ) {
	foreach ( $attachments as $post ) {
		for ($j=0;$j<1;$j++) {
			$get_advanced_automobile_array = get_post_meta($post->ID, 'advanced_automobile', true);
			$get_advanced_automobile = unserialize($get_advanced_automobile_array);
			  
			$csv_output .= get_post_meta($post->ID, 'txt_automobile_sku', true).",";			
			
			$csv_output .= '-'.",";	
			
			$txt_automobile_year = get_post_meta($post->ID, 'advanced_automobile_year', true); 
			$txt_automobile_year_to = get_post_meta($post->ID, 'txt_automobile_year_to', true);						
			$csv_output .= $txt_automobile_year.'-'.$txt_automobile_year_to.",";
			
			$txt_automobile_make = get_post_meta($post->ID, 'advanced_automobile_make', true);			
			$csv_output .= $txt_automobile_make.",";
			
			$txt_automobile_model = get_post_meta($post->ID, 'advanced_automobile_model', true);
			$csv_output .= $txt_automobile_model.",";
			
			$csv_output .= get_post_meta($post->ID, 'txt_automobile_color', true).",";
			
			$csv_output .= $get_advanced_automobile['txt_automobile_position'].",";
			
			$txt_automobile_mpn = str_replace(',', '', get_post_meta($post->ID, 'txt_automobile_mpn', true));
			
			$csv_output .= $txt_automobile_mpn.",";
			
			$post_title = str_replace(',', '', $post->post_title);
			
			$csv_output .= $post_title.",";
			
			$csv_output .= esc_html( get_post_meta( get_the_ID(), 'txt_automobile_price', true ) ).",";
			
			$csv_output .= get_post_meta($post->ID, 'txt_automobile_qty', true).",";
			
			$txt_automobile_weight = str_replace(',', '', $txt_automobile_weight = $get_advanced_automobile['txt_automobile_weight']);
			
			$csv_output .= $txt_automobile_weight.",";
			
			$imagess = str_replace(',', '', wp_get_attachment_url( get_post_thumbnail_id( $post->ID, 'medium' ) ));
			
			$csv_output .= $imagess.",";

			$post_contentt = str_replace(',', '', apply_filters('the_content', $post->post_content));
			
			$csv_output .= $post_contentt.",";
			
			$txt_automobile_comments = str_replace(',', '', $get_advanced_automobile['txt_automobile_comments']);
			
			$csv_output .= $txt_automobile_comments.",";	
			
			$csv_output .= 'New'.",";	
			
		  }
		  $csv_output .= "\n";
	}
	wp_reset_postdata();
}

/*while ($rowr = mysql_fetch_row($values)) {
for ($j=0;$j<$i;$j++) {
$csv_output .= $rowr[$j].",";
}
$csv_output .= "\n";
}*/

return $csv_output;
}
}
}