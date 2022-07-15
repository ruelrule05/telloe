<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class EditFieldsInVideoCampaignsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('video_campaigns', function (Blueprint $table) {
            //

            $table->string('name')->nullable()->default(null);
            $table->string('title')->nullable()->default(null);
            $table->string('description')->nullable()->default(null);
            $table->json('initial_message')->nullable()->default(null);
            $table->bigInteger('service_id')->nullable()->default(null);
            $table->string('link_preview')->nullable()->default(null);
            $table->json('contact_tags')->nullable()->default(null);
            $table->dropColumn('message_template');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('video_campaigns', function (Blueprint $table) {
            //
        });
    }
}
