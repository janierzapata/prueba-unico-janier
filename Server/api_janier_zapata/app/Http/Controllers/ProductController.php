<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $product = Product::all();
        return response() -> json([
            'res' => true,
            'data' => $product
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validateProduct = Product::all()->where('code', $request->input('code'))->first(); 
        
        if(isset($validateProduct)){
            return response()->json([
                'res' => false,
                'message' => 'Ya existe un producto con este codigo',
                'data' => null
            ]);
        }
    
        $data = $request->all();
        $data['status'] = "enabled";

        $nuevoProducto = Product::create($data); 
        return response()->json([
            'res' => true,
            'message' => 'Producto creado correctamente',
            'data' => $nuevoProducto
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $exist = Product::find($id); 
        if(isset($exist)){
            $exist->update($request->all());
            return response()->json([
                'res' => true,
                'message' => 'Producto actualizado correctamente',
                'data' => $exist
            ]);
        }else{
            return response()->json([
                'res' => false,
                'message' => 'Producto no encontrado',
                'data' => null
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $exist = Product::find($id);
        if(isset($exist)){
            $res = Product::destroy($id);
            if($res){
                    return response()->json([
                        'res' => true,
                        'message' => 'Producto eliminado correctamente',
                        'data' => $exist
                    ]);
            }
        }else{
            return response()->json([
                'res' => false,
                'message' => 'Producto no encontrado',
                'data' => null
            ]);
        }
    }

   
    


}
