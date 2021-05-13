<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('plans', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 191)->default('')->unique('name');
            $table->longText('description')->nullable();
            $table->integer('every_months')->default(1);
            $table->string('interval', 50)->default('');
            $table->tinyInteger('per_user')->nullable()->default(1);
            $table->double('price', 11, 2);
            $table->string('seats', 100)->nullable();
            $table->string('stripe_plan_id', 100)->default('');
            $table->string('subheading', 191)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('plans');
    }
}
