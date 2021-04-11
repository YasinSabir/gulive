<?php

require_once dirname( __FILE__ ) . '/../mailchimp-importer/config.php';

$pathinfo = pathinfo( FILENAME );

header( 'Content-Type: application/csv' );
header( 'Content-Disposition: attachment; filename=' . $pathinfo['basename'] );
header( 'Pragma: no-cache' );

readfile( FILENAME );
