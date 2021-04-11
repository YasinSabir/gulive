<?php

namespace App\Actions\ApiKeyClick;

use App\ApiKeyClick;
use Auth;

class CrupdateApiKeyClick
{
    /**
     * @var ApiKeyClick
     */
    private $apiKeyClick;

    /**
     * @param ApiKeyClick $apiKeyClick
     */
    public function __construct(ApiKeyClick $apiKeyClick)
    {
        $this->apiKeyClick = $apiKeyClick;
    }

    /**
     * @param array $data
     * @param ApiKeyClick $apiKeyClick
     * @return ApiKeyClick
     */
    public function execute($data, $apiKeyClick = null)
    {
        if ( ! $apiKeyClick) {
            $apiKeyClick = $this->apiKeyClick->newInstance([
                 'user_id' => Auth::id(),
            ]);
        }

        $attributes = [
            'name' => $data['name'],
        ];

        $apiKeyClick->fill($attributes)->save();

        return $apiKeyClick;
    }
}