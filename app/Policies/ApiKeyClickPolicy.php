<?php

namespace App\Policies;

use App\ApiKeyClick;
use Common\Auth\BaseUser;
use Common\Core\Policies\BasePolicy;

class ApiKeyClickPolicy extends BasePolicy
{
    public function index(BaseUser $user, $userId = null)
    {
        return $user->hasPermission('apiKeyClick.view') || $user->id === (int) $userId;
    }

    public function show(BaseUser $user, ApiKeyClick $apiKeyClick)
    {
        return $user->hasPermission('apiKeyClick.view') || $apiKeyClick->user_id === $user->id;
    }

    public function store(BaseUser $user)
    {
        return $user->hasPermission('apiKeyClick.create');
    }

    public function update(BaseUser $user, ApiKeyClick $apiKeyClick)
    {
        return $user->hasPermission('apiKeyClick.update') || $apiKeyClick->user_id === $user->id;
    }

    public function destroy(BaseUser $user, $apiKeyClickIds)
    {
        if ($user->hasPermission('apiKeyClick.delete')) {
            return true;
        } else {
            $dbCount = app(ApiKeyClick::class)
                ->whereIn('id', $apiKeyClickIds)
                ->where('user_id', $user->id)
                ->count();
            return $dbCount === count($apiKeyClickIds);
        }
    }
}
