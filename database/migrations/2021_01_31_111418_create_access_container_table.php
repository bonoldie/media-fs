<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAccessContainerTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('access_container', function (Blueprint $table) {
            $table->uuid('container_id');
            $table->foreignId('access_id');

            $table->foreign('container_id')->references('id')->on('containers');
            $table->foreign('access_id')->references('id')->on('access');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('access_container');
    }
}
