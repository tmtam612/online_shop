<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Product;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
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
        $relativePath = $this->savedImage($request);

        // Progressing store product
        $requestData = $request->all();
        $requestData['image'] = $relativePath;
        return Product::create($requestData);
    }

    public function update(Request $request, $id)
    {
        $relativePath = $this->savedImage($request);
        
        $requestData = $request->all();
        $requestData['image'] = $relativePath;
        $product = Product::findOrFail($id);
        $product->update($requestData);

        return $product;
    }

    public function delete(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return 204;
    }

    private function savedImage($request)
    {
        // Progressing store image
        $path = $request->file('image')->store('public/storage');
        $extension = $request->file('image')->extension();
        $nameFile = basename($path, ".".$extension);
        return Storage::url('storage/' . $nameFile . "." .  $extension);
    }
}
