<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateContactsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contacts', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('first_name', 191)->nullable();
            $table->string('last_name', 191)->nullable();
            $table->string('email', 191)->default('');
            $table->json('blacklisted_services')->nullable();
            $table->unsignedBigInteger('contact_user_id')->nullable()->index('customer_id');
            $table->json('custom_fields')->nullable();
            $table->string('invite_token', 30)->default('');
            $table->json('invoices')->nullable();
            $table->tinyInteger('is_pending')->default(1);
            $table->string('stripe_customer_id', 191)->nullable();
            $table->json('subscriptions')->nullable();
            $table->unsignedBigInteger('user_id')->index('user_id');
            $table->string('xero_guid', 191)->nullable();
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
        Schema::dropIfExists('contacts');
    }
}
