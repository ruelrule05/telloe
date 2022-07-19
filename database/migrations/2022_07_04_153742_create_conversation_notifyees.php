<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateConversationNotifyees extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('conversation_notifyees', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->bigInteger('conversation_id')->unsigned();
            $table->foreign('conversation_id')->references('id')->on('conversations');
            $table->timestamp('last_notified_at');
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
        Schema::dropIfExists('video_messages_notifyees');
    }
}
