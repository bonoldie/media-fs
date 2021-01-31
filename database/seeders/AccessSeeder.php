<?php

namespace Database\Seeders;

use App\Models\Access;
use Faker\Provider\Uuid;
use Illuminate\Database\Seeder;

class AccessSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Access::create(['token' => 'ad409947-cd3d-3a28-905d-d8b73936b72d']);
    }
}
