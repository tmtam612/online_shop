<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = 'products';
    public $timestamps = false;
    
    protected $fillable = [
        'name',
        'image',
        'description',
        'price',
        'inventory',
    ];

    protected $guarded = [
        'id'
    ];
}
