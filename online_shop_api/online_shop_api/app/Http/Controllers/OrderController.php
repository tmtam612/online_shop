<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Product;
use App\Order;
use App\LineItem;

class OrderController extends Controller
{
    public function index()
    {
        return Product::all();
    }
 
    public function show($id)
    {
        return Product::find($id);
    }

    public function store(Request $request)
    {
        DB::beginTransaction();
        $total = 0;

        $order = Order::create([
            'id_customer' => "1",
            'buy_date' => now(),
        ]);
        
        $listProducts = json_decode($request->getContent(), true);
        foreach ($listProducts as $idProduct => $quantityOrder) {
            $productOrder = Product::find($idProduct);

            // Check quantity enough
            if($productOrder->inventory < $quantityOrder) {
                DB::rollBack();
                return 204;
            } else {
                $productOrder->inventory -= $quantityOrder;
                $total += $productOrder->price * $quantityOrder;
                $productOrder->save();
            }
            
            LineItem::create([
                'id_product' => $idProduct,
                'id_order'=>  $order->id,
                'quantity'=> $quantityOrder
            ]);
        }

        $order->total = $total;
        $order->save();
        DB::commit();

        return $order; 
    }
}
