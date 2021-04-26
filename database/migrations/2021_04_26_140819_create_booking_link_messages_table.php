<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBookingLinkMessagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('booking_link_messages', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('booking_link_id')->nullable()->index('booking_link_id');
            $table->unsignedBigInteger('user_id')->nullable()->index('user_id');
            $table->longText('message')->nullable();
            $table->json('metadata')->nullable();
            $table->longText('preview')->nullable();
            $table->string('source')->nullable()->default('');
            $table->json('tags')->nullable();
            $table->string('timestamp', 191)->nullable();
            $table->enum('type', ['text', 'emoji', 'image', 'audio', 'video', 'file', 'call_failed', 'call_ended'])->default('text');
            $table->longText('link_preview')->nullable();
            $table->tinyInteger('is_history')->default(0);
            $table->tinyInteger('is_read')->default(0);
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
        Schema::dropIfExists('booking_link_messages');
    }
}
