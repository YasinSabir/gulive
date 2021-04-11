<?php

namespace App\Http\Requests;

use Auth;
use Common\Core\BaseFormRequest;
use Illuminate\Validation\Rule;

class CrupdateApiKeyClickRequest extends BaseFormRequest
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
        $ignore = $this->getMethod() === 'PUT' ? $this->route('api_key_click')->id : '';
        $userId = $this->route('api_key_click') ? $this->route('api_key_click')->user_id : Auth::id();

        return [
            'title' => [
                $required, 'string', 'min:3','unique:api_keys',
                Rule::unique('api_key_clicks')->where('user_id', $userId)->ignore($ignore)
            ],
        ];
    }
}
