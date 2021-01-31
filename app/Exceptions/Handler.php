<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Support\Facades\App;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->renderable(function (UnprocessableEntityHttpException $e){
            return App::make('helper.response')->fail($e->getMessage(),$e->getStatusCode());
        });

        $this->renderable(function (MethodNotAllowedHttpException $e){
            return App::make('helper.response')->fail($e->getMessage(),$e->getStatusCode());
        });

        $this->renderable(function (NotFoundHttpException $e){
            return App::make('helper.response')->fail('Not found',$e->getStatusCode());
        });

        $this->reportable(function (Throwable $e) {
            //
        });
    }
}
