<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRunsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('runs', function (Blueprint $table) {
            $table->increments('id');
            $table->string('udid');
            $table->integer('walk_time');
            $table->float('start_lat', '10', '6');
            $table->float('start_lng', '10', '6');
            $table->float('end_lat', '10', '6');
            $table->float('end_lng', '10', '6');
            $table->float('speed');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('runs');
    }
}
