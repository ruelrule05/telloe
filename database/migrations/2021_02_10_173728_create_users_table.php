<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Migration auto-generated by Sequel Pro Laravel Export (1.7.0)
 * @see https://github.com/cviebrock/sequel-pro-laravel-export
 */
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
            $table->timestamps();
            $table->string('dial_code', 5)->nullable();
            $table->string('email', 100)->nullable()->default('');
            $table->string('facebook_id', 191)->nullable();
            $table->string('first_name', 100)->default('');
            $table->json('google_calendar_events')->nullable();
            $table->string('google_calendar_id', 191)->nullable()->collation('utf8mb4_bin');
            $table->json('google_calendar_token')->nullable();
            $table->json('google_calendars')->nullable();
            $table->string('google_id', 191)->nullable();
            $table->bigIncrements('id');
            $table->json('id_documents')->nullable();
            $table->json('ignored_calendar_events')->nullable();
            $table->string('last_name', 100)->default('');
            $table->dateTime('last_online')->nullable();
            $table->tinyInteger('notify_email')->default(1);
            $table->tinyInteger('notify_message')->default(0);
            $table->tinyInteger('notify_sms')->default(1);
            $table->json('outlook_calendar_events')->nullable();
            $table->string('outlook_calendar_id', 191)->nullable()->collation('utf8mb4_bin');
            $table->json('outlook_calendars')->nullable();
            $table->json('outlook_token')->nullable();
            $table->string('password', 255)->default('');
            $table->string('phone', 30)->nullable();
            $table->string('profile_image', 255)->nullable();
            $table->string('psid', 191)->nullable();
            $table->unsignedInteger('role_id')->nullable()->default(2);
            $table->json('stripe_account')->nullable();
            $table->string('stripe_customer_id', 191)->nullable();
            $table->string('timezone', 191)->nullable()->default('Australia/Brisbane');
            $table->string('username', 255)->default('');
            $table->string('xero_tenant_id', 191)->nullable();
            $table->json('xero_token')->nullable();
            $table->json('zoom_token')->nullable();
            $table->unique('username', 'username');
            $table->unique('email', 'email');
            $table->index('role_id', 'role_id');
            
            $table->charset = 'utf8mb4';
            $table->collation = 'utf8mb4_general';
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
