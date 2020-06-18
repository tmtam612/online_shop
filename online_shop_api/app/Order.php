<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $table = 'orders';
    public $timestamps = false;
    
    protected $fillable = [
        'id_customer',
        'buy_date',
        'total',
    ];

    protected $guarded = [
        'id',
    ];
}
