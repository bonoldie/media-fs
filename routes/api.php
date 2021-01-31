<?php

use App\Http\Controllers\ContainerController;
use App\Http\Controllers\FileController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::middleware(['access.container'])->group(function($router){
    $router->resource('container',ContainerController::class)->except(['create']);
    
    $router->middleware(['access.file'])->group(function($router){
        $router->resource('file',FileController::class)->except(['create']);
        $router->get('file/download/{file}',FileController::class.'@download');
    });
});

// Welcome API
Route::get('/',function(){
    return app('helper.response')->success();
});