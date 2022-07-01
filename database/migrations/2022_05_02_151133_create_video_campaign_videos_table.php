<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVideoCampaignVideosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('video_campaign_videos', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('video_campaign_id')->unsigned();
            $table->foreign('video_campaign_id')->references('id')->on('video_campaigns');
            $table->bigInteger('user_video_id')->unsigned();
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
        Schema::dropIfExists('video_campaign_videos');
    }
}
