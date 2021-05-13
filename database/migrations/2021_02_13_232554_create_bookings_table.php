<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBookingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedBigInteger('user_id')->nullable()->index('user_id');
            $table->unsignedBigInteger('contact_id')->nullable()->index('contact_id');
            $table->unsignedBigInteger('service_id')->index('service_id');
            $table->date('date');
            $table->string('start', 20)->nullable();
            $table->string('end', 20)->nullable();
            $table->string('meet_link')->nullable();
            $table->json('metadata')->nullable();
            $table->tinyInteger('notified_2')->default(0);
            $table->tinyInteger('notified_24')->default(0);
            $table->string('zoom_link')->nullable()->default('');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('bookings');
    }
}
