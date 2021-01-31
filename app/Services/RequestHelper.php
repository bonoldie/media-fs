<?php

namespace App\Services;

use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

class RequestHelper {

    public function hasFields($fields = []){
        if(!empty($fields) && !request()->has($fields)){
            throw new UnprocessableEntityHttpException("No such fields.");
        }
    }
}