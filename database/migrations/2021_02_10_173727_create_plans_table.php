<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Migration auto-generated by Sequel Pro Laravel Export (1.7.0)
 * @see https://github.com/cviebrock/sequel-pro-laravel-export
 */
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
            $table->longText('description')->nullable();
            $table->integer('every_months')->default(1);
            $table->increments('id');
            $table->string('interval', 50)->default('');
            $table->string('name', 191)->default('');
            $table->tinyInteger('per_user')->nullable()->default(1);
            $table->double('price', 11, 2);
            $table->string('seats', 100)->nullable();
            $table->string('stripe_plan_id', 100)->default('');
            $table->string('subheading', 191)->nullable();
            $table->unique('name', 'name');
            
            $table->charset = 'utf8mb4';
            $table->collation = 'utf8mb4_0900_ai_ci';
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
