<?php

use Faker\Provider\Uuid;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('files', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('container_id')->nullable();
            $table->uuid('parent_file_id')->nullable();
            $table->enum('type',['file','folder'])->default('file');
            $table->string('name');
            $table->string('ext')->nullable();
            $table->boolean('deleted')->default(0);

            // Timestamps
            $table->timestamp('deleted_at')->nullable()->default(null);
            $table->timestamps();

            // FKs
            $table->foreign('container_id')->references('id')->on('containers');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('files');
    }
}
