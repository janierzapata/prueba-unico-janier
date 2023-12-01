<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;


class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = User::all();
        return response() -> json([
            'res' => true,
            'data' => $user
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
     
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $validateUseremail = User::all()->where('email', $request->input('email'))->first();
        $validateUserdoc = User::all()->where('document', $request->input('document'))->first();

        if(isset($validateUseremail) ){
            return response()->json([
                'res' => false,
                'message' => 'Este email ya se encuentran registrados',
                'data' => null
            ]);
        }

        $nuevoUsuario = User::create($request->all()); 
        return response()->json([
            'res' => true,
            'message' => 'Usuario creado correctamente',
            'data' => $nuevoUsuario
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
        $exist = User::find($id); 
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
        //
    }




    public function auth(Request $request){
        $user = User::where('email', $request->email)->first();
        if(isset($user->id)){
            if($user->password == $request->password){
                $token = $user->createToken('session')->plainTextToken;
                $user->api_token = $token;
                $user -> save();
                return response()->json([
                    'res' => true,
                    'message' => 'Usuario autenticado correctamente',
                    'data' => $user
                ]);
            }else{
                return response()->json([
                    'res' => false,
                    'message' => 'Usuario o contraseña incorrectos',
                    'data' => null
                ]);
            }
        }else{
            return response()->json([
                'res' => false,
                'message' => 'Usuario o contraseña incorrectos',
                'data' => null
            ]);
        }
    }


    public function updatePassword(Request $request)
    {
        $email = $request->input('email');
        $exist = User::all()->where('email', $email)->first(); 
        if(isset($exist)){

            if($request->input('password') !== $exist->password){
                return response()->json([
                    'res' => false,
                    'message' => 'Tu contraseña no coincide con la actual',
                    'data' => null
                ]);
            }else{
                $exist->password = $request->input('newPassword');
                $exist->save();
                return response()->json([
                    'res' => true,
                    'message' => 'Contraseña actualizada correctamente',
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
