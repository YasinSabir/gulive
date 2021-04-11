<?php

namespace App\Policies;

use App\ApiKey;
use Common\Auth\BaseUser;
use Common\Core\Policies\BasePolicy;

class ApiKeyPolicy extends BasePolicy
{
    public function index(BaseUser $user, $userId = null)
    {
        return $user->hasPermission('apiKey.view') || $user->id === (int) $userId;
    }

    public function show(BaseUser $user, ApiKey $apiKey)
    {
        return $user->hasPermission('apiKey.view') || $apiKey->user_id === $user->id;
    }

    public function store(BaseUser $user)
    {
        return $user->hasPermission('apiKey.create');
    }

    public function update(BaseUser $user, ApiKey $apiKey)
    {
        return $user->hasPermission('apiKey.update') || $apiKey->user_id === $user->id;
    }

    public function destroy(BaseUser $user, $apiKeyIds)
    {
        if ($user->hasPermission('apiKey.delete')) {
            return true;
        } else {
            $dbCount = app(ApiKey::class)
                ->whereIn('id', $apiKeyIds)
                ->where('user_id', $user->id)
                ->count();
            return $dbCount === count($apiKeyIds);
        }
    }
}
