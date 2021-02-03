<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Container extends Model
{
    use HasFactory;

    protected $table = 'containers';

    public $incrementing = false;

    protected $fillable = ['id','name'];

    public function access(){
        return $this->belongsToMany(Access::class,'access_container','container_id','access_id');
    }

    public function files($deleted = 0){
        return $this->hasMany(File::class,'container_id','id')->where('deleted','=',$deleted);
    }

    public function hasAccessTo($file_id){
        return auth()->current_container->files()->where('id','=',$file_id)->count() != 0;
    }
}
