<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Migration auto-generated by Sequel Pro Laravel Export (1.7.0)
 * @see https://github.com/cviebrock/sequel-pro-laravel-export
 */
class CreateBookingLinksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('booking_links', function (Blueprint $table) {
            $table->nullableTimestamps();
            $table->json('dates');
            $table->json('emails')->nullable();
            $table->bigIncrements('id');
            $table->string('name', 255)->nullable();
            $table->unsignedBigInteger('user_id');
            $table->string('uuid', 255)->default('');
            $table->unique('uuid', 'uuid');
            
            $table->charset = 'utf8mb4';
            $table->collation = 'utf8mb4_unicode_ci';
        });
        
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('booking_links');
    }
}
