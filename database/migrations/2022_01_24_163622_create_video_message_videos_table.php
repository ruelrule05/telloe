<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVideoMessageVideosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('video_message_videos', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('video_message_id')->unsigned()->nullable()->default(null);
            $table->foreign('video_message_id')->references('id')->on('video_messages');
            $table->bigInteger('user_video_id')->unsigned()->nullable()->default(null);
            $table->foreign('user_video_id')->references('id')->on('user_videos');
            $table->integer('order')->default(0);
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
        Schema::dropIfExists('video_message_videos');
    }
}
