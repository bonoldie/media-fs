<?php

namespace App\Services;

use Illuminate\Support\Facades\Response;

class ResponseHelper
{
    public function success($data = [], $message = "Ok", $status = 200)
    {
        return $this->generic(["message" => $message, "data" => $data], $status);
    }

    public function fail($message = "An error has occurred.", $status = 400)
    {
        return $this->generic(["message" => $message], $status);
    }

    public function generic($data = [], $status = 200, $headers = [])
    {
        return Response::json(
            $data,
            $status,
            $headers
        );
    }
}
