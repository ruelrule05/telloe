<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('first_name', 100)->default('');
            $table->string('last_name', 100)->default('');
            $table->string('email', 100)->nullable()->default('')->unique('email');
            $table->string('password')->default('');
            $table->string('dial_code', 5)->nullable();
            $table->string('facebook_id', 191)->nullable();
            $table->json('google_calendar_events')->nullable();
            $table->string('google_calendar_id', 191)->nullable();
            $table->json('google_calendar_token')->nullable();
            $table->json('google_calendars')->nullable();
            $table->string('google_id', 191)->nullable();
            $table->json('id_documents')->nullable();
            $table->json('ignored_calendar_events')->nullable();
            $table->dateTime('last_online')->nullable();
            $table->tinyInteger('notify_email')->default(1);
            $table->tinyInteger('notify_message')->default(0);
            $table->tinyInteger('notify_sms')->default(1);
            $table->json('outlook_calendar_events')->nullable();
            $table->string('outlook_calendar_id', 191)->nullable();
            $table->json('outlook_calendars')->nullable();
            $table->json('outlook_token')->nullable();
            $table->string('phone', 30)->nullable();
            $table->string('profile_image')->nullable();
            $table->string('psid', 191)->nullable();
            $table->unsignedInteger('role_id')->nullable()->default(2)->index('role_id');
            $table->json('stripe_account')->nullable();
            $table->string('stripe_customer_id', 191)->nullable();
            $table->string('timezone', 191)->nullable()->default('Australia/Brisbane');
            $table->string('username')->default('')->unique('username');
            $table->string('xero_tenant_id', 191)->nullable();
            $table->json('xero_token')->nullable();
            $table->json('zoom_token')->nullable();
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
        Schema::dropIfExists('users');
    }
}
