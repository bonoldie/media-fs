<?php

namespace App\Services;

use App\Models\Container;
use App\Models\File;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

/**
 * Request utilities 
 */
class RequestHelper
{

    /**
     * Checks for field in the request
     */
    public function hasFields($fields = [])
    {
        if (!empty($fields) && !request()->has($fields)) {
            throw new UnprocessableEntityHttpException("No such fields [".collect($fields)->map(function($field){return '`'.$field.'`';})->join(',')."].");
        }
    }

    /**
     * Validate an access to a file
     */
    public function checkAccessToFile($file_id)
    {
        $file = null;
        if (empty($file = File::find($file_id))) {
            throw new NotFoundHttpException('File not found.');
        } elseif (!auth()->current_container->hasAccessTo($file_id)) {
            throw new AccessDeniedHttpException();
        }

        return $file;
    }

    /**
     * Validate an access to a container
     */
    public function checkAccessToContainer($container_id)
    {
        $container = null;
        if (empty($container = Container::find($container_id))) {
            throw new NotFoundHttpException('Container not found.');
        } elseif (!auth()->access->hasAccessTo($container_id)) {
            throw new AccessDeniedHttpException();
        }

        return $container;
    }
}
