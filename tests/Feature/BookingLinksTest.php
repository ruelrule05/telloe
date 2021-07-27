<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Carbon\Carbon;

class BookingLinksTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testIndex()
    {
        $response = $this->actingAs($this->user)->get($this->app_url . '/ajax/booking-links', $this->headers);
        $response->assertStatus(200);
    }

    public function testGetAllTimeslots() 
    {
        $this->withoutMiddleware();
        $data = [
          'date' => '2021-07-10 08:00'
        ];
        $response = $this->actingAs($this->user)->get($this->app_url . "/ajax/booking-links/get_all_timeslots", $data, $this->headers);
        $response->assertStatus(302);
    }

    public function testStore() 
    {
        $dates = '{
            "2021-07-10": {
              "timeslots": [
                {
                  "time": "08:00",
                  "label": "08:00AM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "08:10",
                  "label": "08:10AM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "08:20",
                  "label": "08:20AM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "08:30",
                  "label": "08:30AM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "08:40",
                  "label": "08:40AM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "08:50",
                  "label": "08:50AM",
                  "is_booked": false,
                  "is_selected": true,
                  "is_available": true
                },
                {
                  "time": "09:00",
                  "label": "09:00AM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "09:10",
                  "label": "09:10AM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "09:20",
                  "label": "09:20AM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "09:30",
                  "label": "09:30AM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "09:40",
                  "label": "09:40AM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "09:50",
                  "label": "09:50AM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "10:00",
                  "label": "10:00AM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "10:10",
                  "label": "10:10AM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "10:20",
                  "label": "10:20AM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "10:30",
                  "label": "10:30AM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "10:40",
                  "label": "10:40AM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "10:50",
                  "label": "10:50AM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "11:00",
                  "label": "11:00AM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "11:10",
                  "label": "11:10AM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "11:20",
                  "label": "11:20AM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "11:30",
                  "label": "11:30AM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "11:40",
                  "label": "11:40AM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "11:50",
                  "label": "11:50AM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "12:00",
                  "label": "12:00PM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "12:10",
                  "label": "12:10PM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "12:20",
                  "label": "12:20PM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "12:30",
                  "label": "12:30PM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "12:40",
                  "label": "12:40PM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "12:50",
                  "label": "12:50PM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "13:00",
                  "label": "01:00PM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "13:10",
                  "label": "01:10PM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "13:20",
                  "label": "01:20PM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "13:30",
                  "label": "01:30PM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "13:40",
                  "label": "01:40PM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "13:50",
                  "label": "01:50PM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "14:00",
                  "label": "02:00PM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "14:10",
                  "label": "02:10PM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "14:20",
                  "label": "02:20PM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "14:30",
                  "label": "02:30PM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "14:40",
                  "label": "02:40PM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "14:50",
                  "label": "02:50PM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "15:00",
                  "label": "03:00PM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "15:10",
                  "label": "03:10PM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "15:20",
                  "label": "03:20PM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "15:30",
                  "label": "03:30PM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "15:40",
                  "label": "03:40PM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "15:50",
                  "label": "03:50PM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "16:00",
                  "label": "04:00PM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "16:10",
                  "label": "04:10PM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "16:20",
                  "label": "04:20PM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "16:30",
                  "label": "04:30PM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "16:40",
                  "label": "04:40PM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "16:50",
                  "label": "04:50PM",
                  "is_booked": false,
                  "is_available": false
                }
              ],
              "selectedTimeslots": [
                {
                  "time": "08:50",
                  "label": "08:50AM",
                  "is_booked": false,
                  "is_selected": true,
                  "is_available": true
                }
              ],
              "defaultTimeslotsAdded": true
            }
        }';
        $contacts = '[{
              "id": 1,
              "timezone": "Australia/Brisbane",
              "color": "rgba(239, 212, 2, 0.1)"
            }
          ]';
        $data = [
            'name' => 'My bespoke link',
            'contacts' => json_decode($contacts, TRUE),
            'dates' => json_decode($dates, TRUE),
            'duration' => 30,
        ];
        $response = $this->actingAs($this->user)->post($this->app_url . "/ajax/booking-links", $data, $this->headers);
        $response->assertStatus(200);
    }

    public function testUpdate() 
    {
        $dates = '{
            "2021-07-10": {
              "timeslots": [
                {
                  "time": "08:00",
                  "label": "08:00AM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "08:10",
                  "label": "08:10AM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "08:20",
                  "label": "08:20AM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "08:30",
                  "label": "08:30AM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "08:40",
                  "label": "08:40AM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "08:50",
                  "label": "08:50AM",
                  "is_booked": false,
                  "is_selected": true,
                  "is_available": true
                },
                {
                  "time": "09:00",
                  "label": "09:00AM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "09:10",
                  "label": "09:10AM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "09:20",
                  "label": "09:20AM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "09:30",
                  "label": "09:30AM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "09:40",
                  "label": "09:40AM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "09:50",
                  "label": "09:50AM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "10:00",
                  "label": "10:00AM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "10:10",
                  "label": "10:10AM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "10:20",
                  "label": "10:20AM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "10:30",
                  "label": "10:30AM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "10:40",
                  "label": "10:40AM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "10:50",
                  "label": "10:50AM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "11:00",
                  "label": "11:00AM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "11:10",
                  "label": "11:10AM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "11:20",
                  "label": "11:20AM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "11:30",
                  "label": "11:30AM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "11:40",
                  "label": "11:40AM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "11:50",
                  "label": "11:50AM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "12:00",
                  "label": "12:00PM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "12:10",
                  "label": "12:10PM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "12:20",
                  "label": "12:20PM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "12:30",
                  "label": "12:30PM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "12:40",
                  "label": "12:40PM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "12:50",
                  "label": "12:50PM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "13:00",
                  "label": "01:00PM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "13:10",
                  "label": "01:10PM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "13:20",
                  "label": "01:20PM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "13:30",
                  "label": "01:30PM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "13:40",
                  "label": "01:40PM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "13:50",
                  "label": "01:50PM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "14:00",
                  "label": "02:00PM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "14:10",
                  "label": "02:10PM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "14:20",
                  "label": "02:20PM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "14:30",
                  "label": "02:30PM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "14:40",
                  "label": "02:40PM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "14:50",
                  "label": "02:50PM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "15:00",
                  "label": "03:00PM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "15:10",
                  "label": "03:10PM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "15:20",
                  "label": "03:20PM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "15:30",
                  "label": "03:30PM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "15:40",
                  "label": "03:40PM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "15:50",
                  "label": "03:50PM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "16:00",
                  "label": "04:00PM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "16:10",
                  "label": "04:10PM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "16:20",
                  "label": "04:20PM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "16:30",
                  "label": "04:30PM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "16:40",
                  "label": "04:40PM",
                  "is_booked": false,
                  "is_available": false
                },
                {
                  "time": "16:50",
                  "label": "04:50PM",
                  "is_booked": false,
                  "is_available": false
                }
              ],
              "selectedTimeslots": [
                {
                  "time": "08:50",
                  "label": "08:50AM",
                  "is_booked": false,
                  "is_selected": true,
                  "is_available": true
                }
              ],
              "defaultTimeslotsAdded": true
            }
        }';
        $data = [
            'dates' => json_decode($dates, TRUE),
            'selected_timeslots' => []
        ];
        $this->bookingLink = \App\Models\BookingLink::latest('id')->first();
        $id = $this->bookingLink->id;
        $response = $this->actingAs($this->user)->put($this->app_url . "/ajax/booking-links/" . $id, $data, $this->headers);
        $response->assertStatus(200);
    }

    // Fixed
    public function testBook() 
    {
        $uuid = $this->user->bookingLinks()->latest('id')->first()->uuid;
        $data = [
            'email' => $this->user->email,
            'date' => '2021-08-10',
            'start' => Carbon::now()->addDay(1)->format('H:i'),
        ];
        $response = $this->actingAs($this->user)->post($this->app_url . "/ajax/booking-links/$uuid/book", $data, $this->headers);
        $response->assertStatus(200);
    }

    // Fixed
    public function testMessage() 
    {
        $id = $this->user->bookingLinks()->first()->id;
        $data = [
            'message' => 'Test message',
            'timestamp' => Carbon::now()->timestamp,
            'booking_link_id' => $id,
            'user_id' => $this->user->id,
        ];
        $response = $this->actingAs($this->user)->post($this->app_url . "/ajax/booking-links/$id/message", $data, $this->headers);
        $response->assertStatus(200);
    }

    public function testAssociateUser() 
    {
        $this->withoutMiddleware();
        $uuid = $this->user->bookingLinks()->latest('id')->first()->uuid;
        $response = $this->actingAs($this->user)->put($this->app_url . "/ajax/booking-links/$uuid/associate_user", $this->headers);
        $response->assertStatus(403);
    }

    public function testDestroy() 
    {   
        $this->withoutMiddleware();
        $this->bookingLink = \App\Models\BookingLink::latest('id')->first();
        $id = $this->bookingLink->id;
        $response = $this->actingAs($this->user)->delete($this->app_url . "/ajax/booking-links/" . $id, $this->headers);
        $response->assertStatus(200);
    }

}
