<?php
require_once( dirname( __FILE__ ) . '/vendor/autoload.php' );
require_once( dirname( __FILE__ ) . '/config.php' );

$mailchimp = new MailchimpMarketing\ApiClient();

$mailchimp->setConfig( [
	                       'apiKey' => API_KEY,
	                       'server' => 'us3'
                       ] );
$batch_id = file_get_contents( dirname( __FILE__ ) . '/batch.txt' );
$response = $mailchimp->batches->status( $batch_id );
echo '<pre>';
var_dump( $response );
