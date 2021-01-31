<?php

namespace App\Http\Controllers;

use App\Models\File;
use Exception;
use Faker\Provider\Uuid;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

class FileController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $this->responseHelper->success(auth()->current_container->files()->get());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->requestHelper->hasFields(['name', 'ext', 'file']);


        try {
            $newFile = File::create(array_merge(
                $request->only(['name', 'ext']),
                ['id' => Uuid::uuid(), "container_id" => auth()->current_container->id]
            ));

            if ($request->has('parent_file_id') && $this->current_container->hasAccessTo($request->get('parent_file_id'))) {
                $newFile->parent_file_id = $request->get('parent_file_id');

                $newFile->save();
            }
        } catch (Exception $e) {
            return $this->responseHelper->fail($e->getMessage());
        }

        try {
            if ($request->has('type') && $request->get('type') == 'folder') {
                // è una cartella quindi non salvo nulla nello storage
            } else {
                Storage::disk('local')->put('files/' . $newFile->id, base64_decode($request->get('file')));
            }
        } catch (Exception $e) {
            return $this->responseHelper->fail($e->getMessage());
        }

        return $this->responseHelper->success(['id' => $newFile->id]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\File  $file
     * @return \Illuminate\Http\Response
     */
    public function show(string $file)
    {
        return $this->responseHelper->success(auth()->current_container->files()->where('id', 'like', $file)->get());
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\File  $file
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, File $file)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\File  $file
     * @return \Illuminate\Http\Response
     */
    public function destroy(File $file)
    {
        //
    }


    public function download(File $file)
    {
        if (auth()->current_container->hasAccessTo($file->id)) {
            return Storage::disk('local')->download('files/' . $file->id, $file->name . '.' . $file->ext);
        }

        throw new AccessDeniedHttpException();
    }
}
