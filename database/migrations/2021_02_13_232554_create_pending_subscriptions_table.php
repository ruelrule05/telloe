<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePendingSubscriptionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pending_subscriptions', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedBigInteger('user_id')->nullable()->index('user_id');
            $table->unsignedBigInteger('contact_id')->nullable()->index('contact_id');
            $table->double('amount', 11, 2);
            $table->date('date')->nullable();
            $table->integer('duration')->nullable();
            $table->enum('duration_frequency', ['month', 'year'])->nullable();
            $table->enum('recurring_frequency', ['week', 'month', 'year'])->nullable();
            $table->json('services');
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
        Schema::dropIfExists('pending_subscriptions');
    }
}
