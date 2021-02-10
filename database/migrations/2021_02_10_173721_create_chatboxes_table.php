<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Migration auto-generated by Sequel Pro Laravel Export (1.7.0)
 * @see https://github.com/cviebrock/sequel-pro-laravel-export
 */
class CreateChatboxesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('chatboxes', function (Blueprint $table) {
            $table->unsignedBigInteger('chatbot_id');
            $table->nullableTimestamps();
            $table->increments('id');
            $table->enum('input_type', ['text', 'email', 'phone', 'options'])->nullable();
            $table->tinyInteger('is_start')->default(0);
            $table->double('left', 11, 3)->nullable()->default(0.000);
            $table->string('message', 255)->nullable();
            $table->json('metadata')->nullable();
            $table->unsignedBigInteger('target')->nullable();
            $table->double('top', 11, 3)->nullable()->default(0.000);
            $table->enum('type', ['buttons', 'user_input', 'quick_reply', 'action'])->nullable();
            $table->string('variable', 100)->nullable();
            $table->index('chatbot_id', 'chatbot_id');
            
            $table->charset = 'utf8mb4';
            $table->collation = 'utf8mb4_0900_ai_ci';
        });
        
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('chatboxes');
    }
}
