<?php

namespace App;

use Carbon\Carbon;
use Eloquent;
use Illuminate\Database\Eloquent\Model;

/**
 * App\ApiKey
 *
 * @property int $id
 * @property int $user_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @mixin Eloquent
 */
class ApiKey extends Model
{
    protected $guarded = ['id'];

     protected $casts = [
         'id' => 'integer',
         'user_id' => 'integer',
         'status' => 'integer'
     ];


    public function user() {
        return $this->belongsTo(User::class);
    }

}
