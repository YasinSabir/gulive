<?php

namespace App\Providers;

use App\Listeners\DetachDeletedCustomDomains;
use Common\Domains\DeletedCustomDomains;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        DeletedCustomDomains::class => [
            DetachDeletedCustomDomains::class
        ],
        \SocialiteProviders\Manager\SocialiteWasCalled::class => [
            // ... other providers
            'SocialiteProviders\\Azure\\AzureExtendSocialite@handle',
            'SocialiteProviders\\Microsoft\\MicrosoftExtendSocialite@handle',
        ],
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();
    }
}
