<?php

namespace App;

use Carbon\Carbon;
use Common\Auth\BaseUser;
use Common\Auth\Roles\Role;
use Common\Auth\SocialProfile;
use Common\Billing\Subscription;
use Common\Domains\CustomDomain;
use Common\Files\FileEntry;
use Common\Pages\CustomPage;
use Eloquent;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Notifications\DatabaseNotification;
use Illuminate\Notifications\DatabaseNotificationCollection;

/**
 * App\User
 *
 * @property int $id
 * @property string|null $username
 * @property string|null $first_name
 * @property string|null $last_name
 * @property string|null $avatar_url
 * @property string|null $gender
 * @property string $email
 * @property string|null $password
 * @property string|null $card_brand
 * @property string|null $card_last_four
 * @property string|null $remember_token
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property int $confirmed
 * @property string|null $confirmation_code
 * @property string|null $language
 * @property string|null $country
 * @property string|null $timezone
 * @property string $avatar
 * @property string|null $stripe_id
 * @property int $available_space
 * @property-read Collection|FileEntry[] $entries
 * @property-read string $display_name
 * @property-read bool $has_password
 * @property-read DatabaseNotificationCollection|DatabaseNotification[] $notifications
 * @property-read Collection|Role[] $roles
 * @property-read Collection|SocialProfile[] $social_profiles
 * @property-read Collection|Subscription[] $subscriptions
 * @property-read Collection|CustomDomain[] $custom_domains
 * @property-read Collection|Link[] $links
 * @property-read Collection|LinkOverlay[] $link_overlays
 * @property-read array $permissions
 * @mixin Eloquent
 */
class User extends BaseUser
{
    public function custom_domains()
    {
        return $this->hasMany(CustomDomain::class);
    }

    /**
     * @return HasMany
     */
    public function links()
    {
        return $this->hasMany(Link::class);
    }

    /**
     * @return HasManyThrough
     */
    public function linkClicks()
    {
        return $this->hasManyThrough(LinkClick::class, Link::class);
    }

    /**
     * @return HasMany
     */
    public function link_overlays()
    {
        return $this->hasMany(LinkOverlay::class);
    }

    /**
     * @return HasMany
     */
    public function link_groups()
    {
        return $this->hasMany(LinkGroup::class);
    }

    /**
     * @return HasMany
     */
    public function tracking_pixels()
    {
        return $this->hasMany(TrackingPixel::class);
    }

    /**
     * @return HasMany
     */
    public function link_custom_pages()
    {
        return $this->hasMany(CustomPage::class)
            ->where('type', 'link_page');
    }
}
