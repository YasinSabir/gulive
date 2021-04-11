<?php

namespace App\Actions\ApiKey;

use App\User;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Common\Workspaces\Workspace;

class GetMonthlyClicks
{
    /**
     * @param User|Workspace $model
     * @return int
     */
    public function execute($model)
    {
        $range = CarbonPeriod::create(
            Carbon::now()->startOfMonth(),
            '1 month',
            Carbon::now()->endOfMonth()
        );

        return $model->ApiKeyClicks()
            ->where('crawler', false)
            ->whereBetween(
                'api_key_clicks.created_at',
                [$range->getStartDate(), $range->getEndDate()]
            )->count();
    }
}
