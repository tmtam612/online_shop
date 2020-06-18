<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LineItem extends Model
{
    protected $table = 'line_items';
    
    protected $fillable = [
        'quantity',
        'id_product',
        'id_order',
    ];
}
