<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddVideoCampaignIdFieldInVideoMessagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('video_messages', function (Blueprint $table) {
            //
            $table->bigInteger('video_campaign_id')->unsigned()->nullable()->default(null);
            $table->foreign('video_campaign_id')->references('id')->on('video_campaigns');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('video_messages', function (Blueprint $table) {
            //
        });
    }
}
