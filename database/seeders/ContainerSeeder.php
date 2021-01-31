<?php

namespace Database\Seeders;

use App\Models\Access;
use App\Models\Container;
use Illuminate\Database\Seeder;

class ContainerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $newContainer = Container::create(['name' => 'main_container','id' => '2f9fbcf2-9021-30de-8017-b713df6382c0']);
        
        $newContainer->access()->attach(Access::first()->id);
    }
}
