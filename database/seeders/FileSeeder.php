<?php

namespace Database\Seeders;

use App\Models\File;
use Faker\Provider\Uuid;
use Illuminate\Database\Seeder;

class FileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $folder_1 = File::create([
            'id' => Uuid::uuid(),
            'name' => 'folder_1',
            'type' => 'folder',
            'container_id' => '2f9fbcf2-9021-30de-8017-b713df6382c0',
        ]);

        $folder_2 = File::create([
            'id' => Uuid::uuid(),
            'name' => 'folder_2',
            'type' => 'folder',
            'container_id' => '2f9fbcf2-9021-30de-8017-b713df6382c0',
        ]);

        $folder_3 = File::create([
            'id' => Uuid::uuid(),
            'parent_file_id' => $folder_1->id,
            'name' => 'folder_3',
            'type' => 'folder',
            'container_id' => '2f9fbcf2-9021-30de-8017-b713df6382c0',
        ]);

        $folder_4 = File::create([
            'id' => Uuid::uuid(),
            'parent_file_id' => $folder_2->id,
            'name' => 'folder_4',
            'type' => 'folder',
            'container_id' => '2f9fbcf2-9021-30de-8017-b713df6382c0',
        ]);

        $folder_5 = File::create([
            'id' => Uuid::uuid(),
            'parent_file_id' => $folder_3->id,
            'name' => 'folder_5',
            'type' => 'folder',
            'container_id' => '2f9fbcf2-9021-30de-8017-b713df6382c0',
        ]);

        $folder_6 = File::create([
            'id' => Uuid::uuid(),
            'parent_file_id' => $folder_4->id,
            'name' => 'folder_6',
            'type' => 'folder',
            'container_id' => '2f9fbcf2-9021-30de-8017-b713df6382c0',
        ]);
    }
}
