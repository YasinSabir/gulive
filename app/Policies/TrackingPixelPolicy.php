<?php

namespace App\Policies;

use App\TrackingPixel;
use App\User;
use Common\Core\Policies\BasePolicy;

class TrackingPixelPolicy extends BasePolicy
{

    public function index(User $user, $userId = null)
    {
        return $user->hasPermission('tracking_pixels.view') || $user->id === (int) $userId;
    }

    public function show(User $user, TrackingPixel $trackingPixel)
    {
        return $user->hasPermission('tracking_pixels.view') || $trackingPixel->user_id === $user->id;
    }

    public function store(User $user)
    {
        return $this->storeWithCountRestriction($user, TrackingPixel::class);
    }

    public function update(User $user, TrackingPixel $trackingPixel)
    {
        return $user->hasPermission('tracking_pixels.update') || $trackingPixel->user_id === $user->id;
    }

    public function destroy(User $user, $trackingPixelIds)
    {
        if ($user->hasPermission('tracking_pixels.delete')) {
            return true;
        } else {
            $dbCount = app(TrackingPixel::class)
                ->whereIn('id', $trackingPixelIds)
                ->where('user_id', $user->id)
                ->count();
            return $dbCount === count($trackingPixelIds);
        }
    }
}
