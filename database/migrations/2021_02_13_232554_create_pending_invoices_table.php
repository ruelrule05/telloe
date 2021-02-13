<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePendingInvoicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pending_invoices', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('amount');
            $table->unsignedBigInteger('user_id')->index('user_id');
            $table->unsignedBigInteger('contact_id')->index('contact_id');
            $table->json('service_ids');
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
        Schema::dropIfExists('pending_invoices');
    }
}
