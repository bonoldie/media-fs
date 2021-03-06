<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    use HasFactory;

    protected $table = 'files';

    public $incrementing = false;

    protected $appends = array('files_counter');

    protected $fillable = ['name', 'ext', 'id', 'container_id', 'type', 'parent_file_id'];

    public function container($deleted = 0)
    {
        return $this->belongsTo(Container::class, 'id', 'container_id')->where('deleted', '=', $deleted);
    }

    public function files()
    {
        if ($this->isFolder())
            return $this->where('parent_file_id', '=', $this->id);
        return collect([]);
    }


    public function getFilesCounterAttribute()
    {
        return $this->files()->count();
    }
    
    // Helpers
    public function isFile()
    {
        return $this->type === 'file';
    }

    public function isFolder()
    {
        return $this->type === 'folder';
    }
}
