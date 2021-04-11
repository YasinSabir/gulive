<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Stripe, Mailgun, SparkPost and others. This file provides a sane
    | default location for this type of information, allowing packages
    | to have a conventional place to find your various credentials.
    |
    */

    'mailgun' => [
        'domain' => env('MAILGUN_DOMAIN'),
        'secret' => env('MAILGUN_SECRET'),
    ],

    'ses' => [
        'key' => env('SES_KEY'),
        'secret' => env('SES_SECRET'),
        'region' => env('SES_REGION', 'us-east-1'),
    ],

    'sparkpost' => [
        'secret' => env('SPARKPOST_SECRET'),
    ],

    'stripe' => [
        'model' => App\User::class,
        'key' => env('STRIPE_KEY'),
        'secret' => env('STRIPE_SECRET'),
    ],

    'paypal' => [
        'client_id' => env('PAYPAL_CLIENT_ID'),
        'secret' => env('PAYPAL_SECRET'),
        'webhook_id' => env('PAYPAL_WEBHOOK_ID'),
    ],

    /**
     * Socialite login credentials
     */

//    'azure' => [
//        'client_id' => env('AZURE_CLIENT_ID'),
//        'client_secret' => env('AZURE_CLIENT_SECRET'),
//        'redirect' => env('AZURE_REDIRECT_URI')
//    ],

    'microsoft' => [
        'client_id' => env('MICROSOFT_CLIENT_ID'),
        'client_secret' => env('MICROSOFT_CLIENT_SECRET'),
        'redirect' => env('MICROSOFT_REDIRECT_URI')
    ],

    'azure' => [
        'client_id'     => 'f6ae821e-b3e5-4329-8beb-919bb0adadde',
        'client_secret' => '~6NvUa52v.j~z1-ma4iw5pmurn~xB46f0n',
        'redirect'    => 'http://localhost:4200/secure/auth/social/microsoft/callback',
        //'redirect'      => 'http://localhost/gulive/secure/auth/social/azure/callback',

    ],

    'google' => [
        'client_id' => env('GOOGLE_ID'),
        'client_secret' => env('GOOGLE_SECRET'),
        'redirect' =>   env('APP_URL').'/secure/auth/social/google/callback'
    ],

    'twitter' => [
        'client_id' => env('TWITTER_ID'),
        'client_secret' => env('TWITTER_SECRET'),
        'redirect' =>   env('APP_URL').'/secure/auth/social/twitter/callback'
    ],

    'facebook' => [
        'client_id' => env('FACEBOOK_ID'),
        'client_secret' => env('FACEBOOK_SECRET'),
        'redirect' =>   env('APP_URL').'/secure/auth/social/facebook/callback'
    ],
];
