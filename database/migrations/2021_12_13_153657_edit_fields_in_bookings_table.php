<?php

use App\Models\Booking;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class EditFieldsInBookingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        foreach (Booking::withTrashed()->whereNotNull('google_event_id')->orWhereNotNull('outlook_event_id')->get() as $booking) {
            $data = [];
            if ($booking->google_event_id) {
                $data['google_event_id'] = json_encode([$booking->google_event_id]);
            }
            if ($booking->outlook_event_id) {
                $data['outlook_event_id'] = json_encode([$booking->outlook_event_id]);
            }
            $booking->update($data);
        }
        Schema::table('bookings', function (Blueprint $table) {
            //
            $table->json('google_event_id')->nullable()->default(NULL)->change();
            $table->json('outlook_event_id')->nullable()->default(NULL)->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('bookings', function (Blueprint $table) {
            //
        });
    }
}
