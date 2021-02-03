<?php

namespace App\Http\Controllers;

use App\Models\Container;
use Exception;
use Faker\Provider\Uuid;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

class ContainerController extends Controller
{
    public function index()
    {
        return $this->responseHelper->success(auth()->access->containers()->get());
    }

    public function store(Request $request)
    {
        // Validations
        $this->requestHelper->hasFields(['name']);

        try{
            $new_container = Container::create(['id' => Uuid::uuid(),'name' => $request->get('name')]);

            auth()->access->containers()->attach($new_container->id);
        }catch(Exception $e){
            throw new UnprocessableEntityHttpException($e->getMessage());
        }

        return $this->responseHelper->success($new_container);

    }


    public function show(string $container_id)
    {
        $container = $this->requestHelper->checkAccessToContainer($container_id);

        return $this->responseHelper->success($container);
    }


    public function update(Request $request,string $container_id)
    {
        // Validations
        $this->requestHelper->hasFields('name');
        $container = $this->requestHelper->checkAccessToContainer($container_id);

        $container->name = $request->get('name');
        
        try{
            $container->save();
        }catch(Exception $e){
            throw new UnprocessableEntityHttpException();
        }

        return $this->responseHelper->success($container);

    }

    public function destroy(string $container_id)
    {
        // Validation
        $container = $this->requestHelper->checkAccessToContainer($container_id);
        $container->deleted = true;

        // Soft delete
        try{
            $container->save();
        }catch(Exception $e){
            throw new UnprocessableEntityHttpException();
        }

        return $this->responseHelper->success($container);
    }
}
