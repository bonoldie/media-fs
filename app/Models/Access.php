<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Access extends Model
{
    use HasFactory;
    
    protected $table = 'access';

    public function containers($deleted = 0){
        return $this->belongsToMany(Container::class,'access_container','access_id','container_id')->where('deleted','=',$deleted);
    }

    public function hasAccessTo($container_id){
        return auth()->access->containers()->where('id','=',$container_id)->count() != 0;
    }
}
