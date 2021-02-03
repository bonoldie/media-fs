<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Support\Facades\App;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\HttpException;
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
        $this->renderable(function (HttpException $e) {

            if (empty($e->getMessage())) {
                switch ($e) {
                    case $e instanceof NotFoundHttpException:
                        $message = 'Not found.';
                        break;
                    case $e instanceof AccessDeniedHttpException:
                        $message = 'Forbidden.';
                        break;
                    case $e instanceof UnprocessableEntityHttpException:
                        $message = 'Unprocessable entity.';
                        break;
                    default:
                        $message = 'An error has occurred.';
                }
            } else {
                $message = $e->getMessage();
            }

            return app('helper.response')->fail($message, $e->getStatusCode());
        });


        $this->reportable(function (Throwable $e) {
            //
        });
    }
}
