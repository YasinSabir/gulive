<?php

require_once( dirname( __FILE__ ) . '/vendor/autoload.php' );
require_once( dirname( __FILE__ ) . '/config.php' );

$csvFile   = file( FILENAME );
$batch_id  = file_get_contents( dirname( __FILE__ ) . '/batch.txt' );
$mailchimp = new MailchimpMarketing\ApiClient();

$mailchimp->setConfig( [
	                       'apiKey' => API_KEY,
	                       'server' => 'us3'
                       ] );
try {
	if ( ! empty( $batch_id ) ) {
		$response = $mailchimp->batches->status( $batch_id );
		if ( $response->status == 'finished' ) {
			file_put_contents( dirname( __FILE__ ) . '/batch.txt', '' );
		} else {
			echo '<h1>BATCH IN PROCESS ALREADY!</h1>';
			echo '<pre>';
			var_dump( $response );
			die;
		}
	}
} catch ( Exception $e ) {
	// nothing
}

if ( ! empty( $csvFile ) ) {
	$data = $operations = $columns = [];

	foreach ( $csvFile as $key => $line ) {
		if ( $key == 0 ) {
			$columns = str_getcsv( $line );
		} else {
			$data[] = str_getcsv( $line );
		}
	}

	$columns = array_map( function ( $c ) {
		return str_replace( ' ', '-', strtolower( $c ) );
	}, $columns );

	$mapping = [
		'MMERGE0'  => 'email',
		'MMERGE1'  => 'first-name',
		'MMERGE2'  => 'last-name',
		'MMERGE6'  => 'salutation',
		'MMERGE41' => 'salutation',
		'MMERGE7'  => 'middle-name',
		'MMERGE8'  => 'hearing-status',
		'MMERGE9'  => '',
		'MMERGE10' => 'long-department',
		'MMERGE11' => 'long-job-title',
		'MMERGE12' => 'other-email',
		'MMERGE13' => 'gallaudet_instructor',
		'MMERGE14' => 'gallaudet_advisor',
		'MMERGE15' => 'gallaudet_student',
		'MMERGE16' => 'gallaudet_employee',
		'MMERGE17' => 'gallaudet_employee_clerc',
		'MMERGE18' => '',
		'MMERGE19' => '',
		'MMERGE20' => '',
		'MMERGE21' => '',
		'MMERGE22' => '',
		'MMERGE23' => 'radiuscontactid',
		'MMERGE24' => 'supervisor',
		'MMERGE25' => 'studentid',
		'MMERGE26' => 'gallaudet_role',
		'MMERGE27' => 'gallaudet_term_current',
		'MMERGE28' => 'enrolled-status',
		'MMERGE29' => 'academic-career',
		'MMERGE30' => 'academic-load',
		'MMERGE31' => 'academic-level',
		'MMERGE32' => 'academic-program',
		'MMERGE33' => 'academic-plan',
		'MMERGE34' => '',
		'MMERGE35' => 'scd',
		'MMERGE36' => 'budget-unit',
		'MMERGE37' => '',
		'MMERGE38' => '',
		'MMERGE39' => 'studentid',
		'MMERGE40' => '',
		'MMERGE42' => 'department',
		'MMERGE43' => 'job-title',
	];

	foreach ( $data as $k => $d ) {

		$d = array_combine( $columns, $d );

		if ( strrpos( $d['email'], '@' ) == false ) {
			continue;
		}

		$merge_fields = [];

		foreach ( $mapping as $mk => $mv ) {
			if ( ! empty( $mv ) ) {
				$merge_fields[ $mk ] = $d[ $mv ];
			}
		}

		$is_deaf         = strtolower( $d['hearing-status'] ) == 'deaf';
		$is_hearing      = strtolower( $d['hearing-status'] ) == 'hearing';
		$is_hard_hearing = false;

		$hash                       = md5( $d['email'] );
		$method                     = 'PUT';
		$path                       = "/lists/" . LIST_ID . "/members/" . $hash;
		$operation                  = [
			'method'       => $method,
			'path'         => $path,
			'operation_id' => "contact-$k",
			'body'         => json_encode( [
				                               'email_address' => $d['email'],
				                               'status'        => 'subscribed',
				                               'interests'     => [
					                               '74a3cd04a9' => true, // Hi5
					                               'b43057b4db' => true, // Bison
					                               '2c12ced46f' => true, // Galluet Digest
					                               'dfcf5b878f' => true, // Gallaudet University ~ Community News
					                               'cb689998dd' => $is_deaf,
					                               '3e57e00f2d' => $is_hearing,
					                               '4ee514c188' => $is_hard_hearing
				                               ],
				                               'merge_fields'  => $merge_fields
			                               ] )
		];
		$operations['operations'][] = (object) $operation;

		$method    = 'POST';
		$path      = "/lists/" . LIST_ID . "/members/" . $hash . "/tags";
		$operation = [
			'method'       => $method,
			'path'         => $path,
			'operation_id' => "tag-$k",
			'body'         => json_encode( [
				                               'tags' => [
					                               [ 'name' => 'Internal', 'status' => 'active' ]
				                               ]
			                               ] )
		];

		$operations['operations'][] = (object) $operation;
	}

//		echo '<pre>';
//		var_dump($operations);die;

	try {
		$opts                     = $operations['operations'];
		$opts_chunks              = array_chunk( $opts, 500 );
		$page                     = file_get_contents( dirname( __FILE__ ) . '/page.txt' );
		$page                     = intval( $page ) + 1;
		$operations['operations'] = $opts_chunks[ $page ];

		$response = $mailchimp->batches->start( $operations );
		$batch_id = $response->id;

		echo $batch_id;

		file_put_contents( dirname( __FILE__ ) . '/page.txt', $page );
		file_put_contents( dirname( __FILE__ ) . '/batch.txt', $batch_id );
		file_put_contents( dirname( __FILE__ ) . '/last_ran.txt', PHP_EOL . date( 'Y-m-d H:i:s' ), FILE_APPEND );
		file_put_contents( dirname( __FILE__ ) . '/last_ran.txt', PHP_EOL . 'SUCCESS!! sent ' . count( $operations['operations'] ) . ' operations', FILE_APPEND );

	} catch ( \GuzzleHttp\Exception\BadResponseException $e ) {
		$res = $e->getResponse()->getBody()->getContents();
		file_put_contents( dirname( __FILE__ ) . '/last_ran.txt', PHP_EOL . date( 'Y-m-d H:i:s' ), FILE_APPEND );
		file_put_contents( dirname( __FILE__ ) . '/last_ran.txt', PHP_EOL . $res, FILE_APPEND );
		echo $res;
	}
}
