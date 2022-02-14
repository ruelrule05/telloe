<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVideoMessageLikesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('video_message_likes', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('video_message_id')->unsigned()->nullable()->default(null);
            $table->bigInteger('user_id')->unsigned()->nullable()->default(null);
            $table->foreign('video_message_id')->references('id')->on('video_messages');
            $table->foreign('user_id')->references('id')->on('users');
            $table->boolean('is_liked')->default(true);
            $table->softDeletes();
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
        Schema::dropIfExists('video_message_likes');
    }
}
