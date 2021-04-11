<?php

namespace App\Actions\ApiKey;

use App\ApiKey;
use Auth;
use Illuminate\Support\Str;

class CrupdateApiKey
{
    /**
     * @var ApiKey
     */
    private $apiKey;

    /**
     * @param ApiKey $apiKey
     */
    public function __construct(ApiKey $apiKey)
    {
        $this->apiKey = $apiKey;
    }

    /**
     * @param array $data
     * @param ApiKey $apiKey
     * @return ApiKey
     */
    public function execute($data, $apiKey = null)
    {
        if ( ! $apiKey) {
            $apiKey = $this->apiKey->newInstance([
                 'user_id' => Auth::id(),
            ]);
        }

        $attributes = [
            'title'    => $data['title'],
            'api_key'  => "key_#" . time() . Str::random(30),
            'status'   => 0,
        ];

        $apiKey->fill($attributes)->save();

        return $apiKey;
    }
}