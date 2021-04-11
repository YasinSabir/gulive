<?php

namespace App\Policies;

use App\LinkGroup;
use App\User;
use Common\Core\Policies\BasePolicy;

class LinkGroupPolicy extends BasePolicy
{
    public function index(User $user, $userId = null)
    {
        return $user->hasPermission('link_groups.view') || $user->id === (int) $userId;
    }

    public function show(User $user, LinkGroup $linkGroup)
    {
        return $user->hasPermission('link_groups.view') || $linkGroup->user_id === $user->id || $linkGroup->public;
    }

    public function store(User $user)
    {
        return $this->storeWithCountRestriction($user, LinkGroup::class);
    }

    public function update(User $user)
    {
        return $user->hasPermission('link_groups.update');
    }

    public function destroy(User $user, $groupIds)
    {
        if ($user->hasPermission('link_groups.delete')) {
            return true;
        } else {
            $dbCount = app(LinkGroup::class)
                ->whereIn('id', $groupIds)
                ->where('user_id', $user->id)
                ->count();
            return $dbCount === count($groupIds);
        }
    }
}
