<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateServicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('services', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('user_id')->nullable()->index('user_id');
            $table->string('address')->nullable();
            $table->tinyInteger('ask_phone')->default(0);
            $table->tinyInteger('ask_skype')->default(0);
            $table->unsignedBigInteger('assigned_service_id')->nullable();
            $table->tinyInteger('create_zoom_link')->default(0);
            $table->string('currency', 5)->default('USD');
            $table->json('days');
            $table->decimal('default_rate', 11)->default(0.00);
            $table->longText('description');
            $table->integer('duration');
            $table->json('holidays')->nullable();
            $table->json('ignored_calendar_events_google')->nullable();
            $table->tinyInteger('in_widget')->default(0);
            $table->integer('interval')->default(15);
            $table->tinyInteger('is_available')->default(0);
            $table->tinyInteger('is_preset')->default(0);
            $table->tinyInteger('manage_bookings')->default(0);
            $table->unsignedBigInteger('member_id')->nullable();
            $table->string('name', 191)->default('');
            $table->unsignedBigInteger('parent_service_id')->nullable();
            $table->tinyInteger('require_phone')->default(0);
            $table->tinyInteger('require_skype')->default(0);
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
        Schema::dropIfExists('services');
    }
}
