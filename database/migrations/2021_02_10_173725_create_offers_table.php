<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Migration auto-generated by Sequel Pro Laravel Export (1.7.0)
 * @see https://github.com/cviebrock/sequel-pro-laravel-export
 */
class CreateOffersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('offers', function (Blueprint $table) {
            $table->tinyInteger('booked')->nullable()->default(0);
            $table->nullableTimestamps();
            $table->unsignedBigInteger('customer_id');
            $table->integer('discount')->nullable();
            $table->string('discount_text', 191)->nullable();
            $table->bigIncrements('id');
            $table->unsignedBigInteger('member_id');
            $table->json('services')->nullable();
            $table->index('customer_id', 'user_id');
            $table->index('member_id', 'member_id');
            
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
        Schema::dropIfExists('offers');
    }
}
