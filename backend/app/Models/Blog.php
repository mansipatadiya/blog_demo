<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    protected $table = 'tbl_blog';

    protected $fillable = ['title', 'body', "category_id"];

    public  function hasCategory()
    {
        return $this->hasOne('App\Models\Category', 'id', 'category_id');
    }
}
