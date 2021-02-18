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

// Container level
Route::middleware(['access.container'])->group(function($router){
    $router->resource('container',ContainerController::class)->except(['create']);
    
    // File level
    $router->prefix('file')->middleware(['access.file'])->group(function($router){
        $router->resource('',FileController::class)->except(['create','destroy']);
        $router->get('download/{file}',FileController::class.'@download');
        
        // WORKAROUND TO MAKE CONTROLLER NOT BUILD THE MODEL
        $router->delete('{file_id}',FileController::class.'@destroy');
    });
});

// Welcome API
Route::get('/',function(){
    return app('helper.response')->success();
});