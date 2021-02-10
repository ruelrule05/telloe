<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Migration auto-generated by Sequel Pro Laravel Export (1.7.0)
 * @see https://github.com/cviebrock/sequel-pro-laravel-export
 */
class CreateMembersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('members', function (Blueprint $table) {
            $table->nullableTimestamps();
            $table->softDeletes();
            $table->string('email', 191)->default('');
            $table->string('first_name', 191)->default('');
            $table->bigIncrements('id');
            $table->string('invite_token', 191)->default('');
            $table->tinyInteger('is_pending')->default(1);
            $table->string('last_name', 191)->default('');
            $table->unsignedBigInteger('member_user_id')->nullable();
            $table->unsignedBigInteger('user_id');

            $table->charset = 'utf8mb4';
            $table->collation = 'utf8mb4_unicode_ci';
        });
        
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('members');
    }
}
