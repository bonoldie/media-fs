<?php

namespace App\Http\Controllers;

use App\Models\File;
use Exception;
use Faker\Provider\Uuid;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

class FileController extends Controller
{

    public function index()
    {
        return $this->responseHelper->success(auth()->current_container->files()->get());
    }

    public function store(Request $request)
    {
        // Validations
        $this->requestHelper->hasFields(['name', 'type']);
        $type = $request->get('type');

        if (!in_array($type, ['file', 'folder'])) {
            throw new UnprocessableEntityHttpException("Invalid `type` field.");
        }

        if ($type == 'file' && !$request->has('file')) {
            throw new UnprocessableEntityHttpException("Invalid `type` field.");
        }

        // Parent file validation
        if (!empty($request->get('parent_file_id'))) {
            $parent_file_id = $request->get('parent_file_id');

            // Forbidden parent file
            if (!auth()->current_container->hasAccessTo($parent_file_id)) {
                throw new AccessDeniedHttpException("Invalid parent file.");
            }

            // Non-folder parent file
            $parent_file = File::findOrFail($parent_file_id);
            if ($parent_file->type != "folder") {
                throw new UnprocessableEntityHttpException("Parent file is not a folder.");
            }
        }

        // Creation of the new file
        $new_file_attributes = array_merge(
            $request->only(['name']),
            [
                'id' => Uuid::uuid(),
                'container_id' => auth()->current_container->id,
                'type' => $type,
                'ext' => $request->has('ext'),
                'parent_file_id' => isset($parent_file) ? $parent_file->id : null
            ]
        );

        try {
            $new_file = File::create($new_file_attributes);
        } catch (Exception $e) {
            throw new HttpException("Error while creating the new file.");
        }

        // Store the file 
        if ($type == 'file') {
            try {
                Storage::disk('local')->put('files/' . $new_file->id, $request->get('file'));
            } catch (Exception $e) {
                return new HttpException(500, "File not stored. Reason: " . $e->getMessage());
            }
        }

        return $this->responseHelper->success($new_file);
    }

    public function show(string $file_id)
    {
        // Validations
        $file = $this->requestHelper->checkAccessToFile($file_id);

        return $this->responseHelper->success($file);
    }

    public function update(Request $request, $file_id)
    {
        // Validation
        $file = $this->requestHelper->checkAccessToFile($file_id);

        $file->update($request->only('name', 'ext'));

        if ($request->has('parent_file_id')) {
            $parent_file = $this->requestHelper->checkAccessToFile($request->get('parent_file_id'));

            if ($parent_file->type == 'folder') {
                try {
                    $file->parent_file_id = $parent_file->id;
                    $file->save();
                } catch (Exception $e) {
                    throw new UnprocessableEntityHttpException();
                }
            }
        }

        return $this->responseHelper->success($file);
    }

    public function destroy(string $file_id)
    {
        // Validation
        $file = $this->requestHelper->checkAccessToFile($file_id);

        // Soft delete
        $file->deleted = true;

        // Soft delete
        try {
            $file->save();
        } catch (Exception $e) {
            throw new UnprocessableEntityHttpException();
        }

        return $this->responseHelper->success('', 'File deleted.');
    }

    /**
     * Return the file download response
     */
    public function download(string $file_id)
    {
        // Validations
        $file = $this->requestHelper->checkAccessToFile($file_id);

        return Storage::disk('local')->download('files/' . $file->id, $file->name . '.' . $file->ext);
    }
}
