<?php

namespace App\Http\Requests;

use Auth;
use Common\Core\BaseFormRequest;
use Illuminate\Validation\Rule;

class CrupdateApiKeyRequest extends BaseFormRequest
{
    /**
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * @return array
     */
    public function rules()
    {
        $required = $this->getMethod() === 'POST' ? 'required' : '';
        $ignore = $this->getMethod() === 'PUT' ? $this->route('api_key')->id : '';
        $userId = $this->route('api_key') ? $this->route('api_key')->user_id : Auth::id();

        return [
            'title' => [
                $required, 'string', 'min:3','unique:api_keys',
                Rule::unique('api_keys')->where('user_id', $userId)->ignore($ignore)
            ],
        ];
    }
}
