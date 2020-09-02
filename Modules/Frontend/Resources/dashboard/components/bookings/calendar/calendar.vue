<template>
	<div class="h-100 d-flex flex-column overflow-hidden" ref="calendar">
		<div class="border-bottom bg-white p-3 d-flex align-items-center">
			<h5 class="font-heading mb-0">Calendar</h5>
			<div class="ml-auto d-flex align-items-center">
                <button class="btn btn-light shadow-none d-flex align-items-center" type="button" @click="selectedDate = null; infoTab = 'settings'">
                    <cog-icon class="btn-icon"></cog-icon>
                    Settings
                </button>
			</div>
		</div>

		<div class="h-100 d-flex overflow-auto">
			<div class="h-100 d-flex flex-column flex-grow-1 p-4">
				<div class="bg-white rounded shadow-sm h-100 p-1 flex-grow-1">
					<div class="h-100 position-relative">
						<div class="calendar-buttons position-absolute">
							<button class="btn btn-white border" @click="goToDate('today')">Today</button>
							<button class="btn btn-white border line-height-1 badge-pill p-1" @click="goToDate('prev')">
								<chevron-left width="28" height="28" transform="scale(1.5)"></chevron-left>
							</button>
							<button class="btn btn-white border line-height-1 badge-pill p-1" @click="goToDate('next')">
								<chevron-right width="28" height="28" transform="scale(1.5)"></chevron-right>
							</button>
						</div>
						<!-- <FullCalendar ref="fullCalendar" themeSystem="bootstrap" :header="header" :buttonText="buttonText" eventColor="#FBBC1B" :displayEventTime="false" @dateClick="dateClick" defaultView="dayGridMonth" :plugins="calendarPlugins" height="parent" :dayRender="dayRender"></FullCalendar> -->

						<v-calendar class="v-calendar h-100 border-0" is-expanded :attributes="calendarAttributes" ref="v-calendar">
							<div slot="day-content" slot-scope="{day, dayEvents, attributes}">
								<div class="day-content text-center">
									<div class="day-label" :class="{active: selectedDate && selectedDate.toString() == day.date.toString(), 'is-today': day.isToday}" @click="dayclick(day.date); infoTab = 'bookings'">
										<span>{{ day.label }}</span>
										<div v-if="attributes" class="d-flex align-items-center vc-badge-container">
											<div class="vc-badge vc-bookings">{{ countBookings(attributes) }}</div>
											<div class="vc-badge vc-events">{{ countEvents(attributes) }}</div>
										</div>
									</div>
								</div>
							</div>
						</v-calendar>
					</div>
				</div>
			</div>

			<div class="info bg-white h-100 border-left overflow-auto" :class="{'open': infoTab}">
			    <div class="d-flex align-items-center border-bottom py-3 px-3">
	                <strong class="text-capitalize">{{ infoTab }}</strong>
	                <button class="btn btn-white p-0 ml-auto" @click="selectedDate = null; infoTab = ''"><close-icon height="30" width="30"></close-icon></button>
	            </div>


				<!-- Bookings -->
	            <div v-if="infoTab == 'bookings'" class="p-3">
					<div class="h-100 position-relative overflow-auto">
						<div v-if="selectedDate">
							<div v-if="selectedDateBookingsEvents.length > 0">
								<template v-if="!selectedBooking || !selectedBooking.edit">
									<div class="h6 font-heading">{{ dayjs(selectedDate).format('MMMM D, YYYY') }}</div>
									<div v-for="item in selectedDateBookingsEvents" :key="item.id" class="p-2 mt-3 rounded bg-light booking">

										<!-- Booking -->
										<template v-if="item.type == 'booking'">
											<div class="d-flex position-relative booking" :class="{'expired': item.is_expired}">
												<div class="user-profile-image user-profile-image-sm mr-2" :style="{backgroundImage: 'url(' + (item.user || item.contact).profile_image + ')'}">
													<span v-if="!(item.user || item.contact).profile_image">{{ (item.user || item.contact).initials }}</span>
												</div>

												<div>
													<div class="mb-1">{{ formatTime(item.start) }} - {{ formatTime(item.end) }}</div>
													<strong class="d-block font-heading">{{ (item.user ||item.contact).full_name }}</strong>
													<div>{{ item.service.name }} ({{ item.service.duration }} minutes)</div>
												</div>
												<div v-if="!item.is_expired" class="position-absolute booking-actions" :class="{'opacity-0': !selectedBooking || selectedBooking.id != item.id}">
									                <button type="button" class="btn btn-sm btn-white p-1 line-height-0 border badge-pill" @click="edit(item)">
									                	<pencil-icon width="15" height="15"></pencil-icon>
									                </button>
									                <button type="button" class="btn btn-sm btn-white p-1 line-height-0 border badge-pill" @click="selectedBooking = item; $refs['deleteBooking'].show()">
									                	<trash-icon width="15" height="15" fill="red"></trash-icon>
									                </button>
									            </div>
											</div>
										</template>

										<!-- Google event -->
										<template v-else-if="item.type == 'google-event'">
											<div class="d-flex">
												<img src="/images/brands/google-calendar.svg" alt="" height="20" class="mt-1">
												<div class="ml-3">
													{{ item.summary }}
													<div class="text-muted font-weight-light small">
														{{ (item.start.dateTime && item.end.dateTime) ? `${dayjs(item.start.dateTime).format('hh:mmA')} - ${dayjs(item.end.dateTime).format('hh:mmA')}` : 'Whole day event' }}
													</div>
												</div>
												<div class="ml-auto position-relative">
													<div class="position-absolute-center pb-2 eye-icon">
														<eye-slash-icon v-if="$root.auth.ignored_calendar_events.find((x) => x == `${item.type}-${item.id}`)" width="18" height="18" fill="red"></eye-slash-icon>
													</div>
													<div class="position-relative opacity-0">
														<button type="button" v-if="item.start.date && item.end.date" class="btn btn-sm border btn-white line-height-0 p-1 badge-pill" @click="toggleIgnoreEvent(item)">
															<eye-slash-icon width="18" height="18" :fill="$root.auth.ignored_calendar_events.find((x) => x == `${item.type}-${item.id}`) ? 'red' : ''"></eye-slash-icon>
														</button>
														<a target="_blank" :href="item.htmlLink" class="btn btn-sm border btn-white line-height-0 p-1 badge-pill"><shortcut-icon width="18" height="18"></shortcut-icon></a>
													</div>
												</div>
											</div>
										</template>

										<!-- Outlook event -->
										<template v-else-if="item.type == 'outlook-event'">
											<div class="d-flex">
												<img src="/images/brands/outlook.svg" alt="" height="20" class="mt-1">
												<div class="ml-3">
													{{ item.subject }}
													<div class="text-muted font-weight-light small">
														{{ (item.isAllDay) ? 'Whole day event' : `${parseTimezone(item.start)} - ${parseTimezone(item.end)}` }}
													</div>
												</div>
												<div class="ml-auto position-relative">
													<div class="position-absolute-center pb-2 eye-icon">
														<eye-slash-icon v-if="$root.auth.ignored_calendar_events.find((x) => x == `${item.type}-${item.id}`)" width="18" height="18" fill="red"></eye-slash-icon>
													</div>
													<div class="position-relative opacity-0">
														<button type="button" v-if="item.isAllDay" class="btn btn-sm border btn-white line-height-0 p-1 badge-pill" @click="toggleIgnoreEvent(item)">
															<eye-slash-icon width="18" height="18" :fill="$root.auth.ignored_calendar_events.find((x) => x == `${item.type}-${item.id}`) ? 'red' : ''"></eye-slash-icon>
														</button>
														<a target="_blank" :href="item.webLink" class="btn btn-sm border btn-white line-height-0 p-1 badge-pill"><shortcut-icon width="18" height="18"></shortcut-icon></a>
													</div>
												</div>
											</div>
										</template>
									</div>
								</template>

								<!-- Edit booking -->
					            <div v-else class="overflow-hidden">
					            	<strong class="mb-2 d-block">Edit Booking</strong>
						            <div class="d-flex align-items-center mb-2 rounded p-3 bg-blue text-white">
						                <div>
						                    <h6 class="font-heading mb-0">{{ selectedBooking.service.name }}</h6>
						                    <small class="d-block">{{ selectedBooking.service.duration }} minutes</small>
						                </div>
						            </div>
					            	<div class="d-flex align-items-center">
					            		<strong class="mb-2 d-block">Choose a date</strong>
					            		<button class="ml-auto btn d-flex align-items-center" type="button" @click="calendarView = (calendarView == 'month') ? 'week' : 'month'; calcSliderTranslate()">
					            			<calendar-month-icon width="18" height="18" class="mr-1"></calendar-month-icon>
					            			<small class="text-capitalize">{{ calendarView }} view</small>
					            		</button>
					            	</div>

									<div class="align-items-center mt-2" :class="[calendarView == 'month' ? 'd-none' : 'd-flex']">
										<button class="btn p-0 ml-n2" type="button" @click="adjustSlider(-1)"><chevron-left-icon transform="scale(1.6)"></chevron-left-icon></button>
										<div class="flex-grow-1 overflow-hidden">
											<div class="weekday-slider d-flex align-items-center position-relative" :style="{'transform': `translate(${sliderTranslate - (sliderNavIndex * 95)}px, 0px)`}" ref="weekday-slider">
												<div v-for="(date, index) in weekDayOptions" :key="index" class="px-1 weekday-day" :id="date.id" :class="{'disabled': disabledDate(date)}">
													<div class="py-1 px-2 rounded weekday-container cursor-pointer" :class="{'bg-primary text-white': sliderActiveDate(date)}" @click="selectedBooking.date_object = date.date">
														{{ date.title }}
														<strong class="text-uppercase d-block">{{ date.description }}</strong>
													</div>
												</div>
											</div>
										</div>
										<button class="btn p-0 mr-n2" type="button" @click="adjustSlider(1)"><chevron-right-icon transform="scale(1.6)"></chevron-right-icon></button>
									</div>

									<v-date-picker :select-attribute="selectAttribute" :disabled-dates="formattedHolidays" is-required :class="{'d-none': calendarView == 'week'}" class="v-calendar border" v-model="selectedBooking.date_object" is-expanded is-inline :min-date="new Date()" @input="dateSelected">
									</v-date-picker>
									
									<strong class="my-2 d-block">Select a timeslot</strong>
									<div class="position-relative overflow-auto timeslots-container" :class="{'py-4': timeslotsLoading}">
										<div v-if="timeslotsLoading" class="position-absolute-center">
											<div class="spinner-border spinner-border-sm text-primary" role="status"></div>
										</div>
										<div :class="{'d-none': timeslotsLoading}">
											<div v-if="timeslots.length == 0" class="text-gray text-center w-100 position-absolute-center">
												<span>There are no timeslots available for the selected date.</span>
											</div>
											<div v-else>
												<div class="d-flex flex-wrap pb-2 pr-2">
													<div v-for="(timeslot, index) in timeslots" :key="index" class="mb-2 w-100">
														<div class="p-3 rounded cursor-pointer mb-1" :class="[timeslot == selectedTimeslot ? 'bg-primary text-white' : 'bg-light']" @click="selectedTimeslot = timeslot; timeslotDropdown = false;">
															<div class="rounded border p-2">
																<small class="d-block">Your time: {{ $root.auth.timezone }}</small>
																{{ timeslot.label }}
															</div>
															<div v-if="$root.auth.timezone != (selectedBooking.user || selectedBooking.contact).timezone && (selectedBooking.user || selectedBooking.contact).timezone" class="rounded border p-2 mt-2">
																<small class="d-block">Client's time: {{ (selectedBooking.user || selectedBooking.contact).timezone }}</small>
																{{ timezoneTime($root.auth.timezone, (selectedBooking.user || selectedBooking.contact).timezone, timeslot.time) }}
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>

									<div class="d-flex">
										<button type="button" class="btn btn-white border btn-sm" @click="resetBookingForm()">Cancel</button>
										<button type="button" class="ml-auto btn btn-primary btn-sm" :disabled="!selectedTimeslot || !selectedBooking" @click="$refs['confirmBooking'].show()">Update Booking</button>
									</div>
					            </div>
							</div>
							<div v-else class="position-absolute-center text-center text-secondary w-100">
								There are no bookings or events for this date
							</div>
						</div>
					</div>
	            </div>
				

				<!-- Settings -->
	            <div v-else-if="infoTab == 'settings'" class="p-3">
	            	<strong>Sync Calendar</strong>
					<div class="dropdown mt-2" ref="googleCalendarDropdown">
						<button type="button" class="btn btn-white border d-inline-flex align-items-center" @click="googleCalendarDropdownToggle" data-toggle="dropdown" data-display="static">
							<img src="/images/brands/google-calendar.svg" height="18" class="mr-2">
							Google Calendar
						</button>
						<div class="dropdown-menu" :class="{'d-none': googleAuthUrl}" @click.stop>
							<div v-if="!googleCalendarsReady" class="text-center">
								<div class="spinner-border spinner-border-sm text-primary"></div>
								<div class="small text-muted font-weight-light mt-2">Getting calendars...</div>
							</div>
							<div v-else>
								<div class="form-group mb-0">
									<label class="form-label">Choose a calendar</label>
									<select :value="$root.auth.google_calendar_id" class="form-control form-control-sm cursor-pointer w-auto" :class="{'text-gray': !($root.auth.google_calendar_id || '').trim().length}" @change.prevent="changeGoogleCalendar($event)">
										<option value="" selected disabled>- Select calendar -</option>
										<option :value="calendar.id" v-for="calendar in $root.auth.google_calendars">{{ calendar.summary }}</option>
									</select>
									<button type="button" class="btn btn-sm btn-link p-0 texxt-muted" @click="removeCalendarConfirm('google')">Remove calendar</button>
								</div>
							</div>
						</div>
					</div>

					<div class="dropdown mt-2" ref="outlookCalendarDropdown">
						<button type="button" class="btn btn-white border d-inline-flex align-items-center" @click="outlookCalendarDropdownToggle" data-toggle="dropdown" data-display="static">
							<img src="/images/brands/outlook.svg" height="18" class="mr-2">
							Outlook
						</button>
						<div class="dropdown-menu" :class="{'d-none': outlookAuthUrl}" @click.stop>
							<div v-if="!outlookCalendarsReady" class="text-center">
								<div class="spinner-border spinner-border-sm text-primary"></div>
								<div class="small text-muted font-weight-light mt-2">Getting calendars...</div>
							</div>
							<div v-else>
								<div class="form-group mb-0">
									<label class="form-label">Choose a calendar</label>
									<select :value="$root.auth.outlook_calendar_id" class="form-control form-control-sm cursor-pointer w-auto" :class="{'text-gray': !($root.auth.outlook_calendar_id || '').trim().length}" @change.prevent="changeOutlookCalendar($event)">
										<option value="" selected disabled>- Select calendar -</option>
										<option :value="calendar.id" v-for="calendar in $root.auth.outlook_calendars">{{ calendar.name }}</option>
									</select>
									<button type="button" class="btn btn-sm btn-link p-0 texxt-muted" @click="removeCalendarConfirm('outlook')">Remove calendar</button>
								</div>
							</div>
						</div>
					</div>
	            </div>
			</div>
		</div>


		<modal ref="deleteBooking" :close-button="false" @hidden="resetBookingForm">
			<div class="text-center">
				<h5 class="font-heading">Delete Booking</h5>
				<p class="mb-0">Are you sure to delete this booking?</p>
			</div>
			<div class="d-flex mt-4">
				<button type="button" class="btn btn-white border" @click="$refs['deleteBooking'].hide()">Cancel</button>
				<button type="button" class="ml-auto btn btn-danger" @click="deleteBooking(selectedBooking); $refs['deleteBooking'].hide()">Delete Booking</button>
			</div>
		</modal>



		<modal ref="confirmBooking" :close-button="false">
			<template v-if="selectedBooking && selectedTimeslot">
				<div v-if="!bookingCreated">
					<h4 class="font-heading text-center mb-3">Review Booking Details</h4>
					<div class="bg-light rounded py-2 px-3">
						<div class="d-flex">
							<div class="w-25">Service</div>
							<strong>{{ selectedBooking.service.name }}</strong>
						</div>
						<div class="d-flex">
							<div class="w-25">Date</div>
							<strong>{{ formatDate(selectedBooking.date_object) }}</strong>
						</div>
						<div class="d-flex">
							<div class="w-25">Time</div>
							<strong>{{ selectedTimeslot.label }}</strong>
						</div>
					</div>
					<div class="text-danger text-center mt-2">
						&nbsp; {{ error }} &nbsp;
					</div>


					<div class="d-flex mt-3">
						<button type="button" :disabled="loading" class="btn btn-white border" @click="$refs['confirmBooking'].hide(); error = ''">Cancel</button>
						<vue-button type="button" :loading="loading" button_class="ml-auto btn btn-primary" @click="submit()">Update</vue-button>
					</div>
				</div>


				<div v-else class="py-5 text-center">
					<checkmark-circle-icon class="fill-success" width="50" height="50"></checkmark-circle-icon>
					<h5 class="font-heading text-center mb-4 mt-2">Booking has been successfully {{ selectedBooking ? 'updated' : 'placed' }}</h5>
					<button type="button" class="btn btn-white border" @click="$refs['confirmBooking'].hide(); resetBookingForm()">Close</button>
				</div>
			</template>
		</modal>


		<modal ref="removeCalendar" :close-button="false">
			<div class="text-center">
				<info-circle-icon fill="red" width="50" height="50" class="d-inline-block"></info-circle-icon>
				<p class="mb-0 mt-2">
					Are you sure to remove <strong>{{ calendarToRemove }} Calendar</strong>? 
					<br />
					This action will delete all booking events from this calendar.
				</p>
				
				<div class="d-flex align-items-center mt-5">
					<button class="btn btn-white border mr-2" type="button" data-dismiss="modal" :disabled="removeCalendarLoading">Cancel</button>
					<vue-button button_class="btn btn-primary ml-auto" type="button" :loading="removeCalendarLoading" @click.native="removeCalendar()">Continue</vue-button>
				</div>
			</div>
		</modal>

		<modal ref="changeGoogleCalendar" :close-button="false">
			<div class="text-center" v-if="newGoogleCalendarId">
				<info-circle-icon fill="#ffc107" width="50" height="50" class="d-inline-block"></info-circle-icon>
				<p class="mb-0 mt-2">
					Are you sure to use Google Calendar <strong>{{ $root.auth.google_calendars.find((x) => x.id == newGoogleCalendarId).summary }}</strong>? 
					<br />
					This action will populate your existing bookings to the selected calendar as events.
				</p>
				
				<div class="d-flex align-items-center mt-5">
					<button class="btn btn-white border mr-2" type="button" data-dismiss="modal" :disabled="confirmCalendarLoading">Cancel</button>
					<vue-button button_class="btn btn-primary ml-auto" type="button" :loading="confirmCalendarLoading" @click.native="setGoogleCalendar">Continue</vue-button>
				</div>
			</div>
		</modal>

		<modal ref="changeOutlookCalendar" :close-button="false">
			<div class="text-center" v-if="newOutlookCalendarId">
				<info-circle-icon fill="#ffc107" width="50" height="50" class="d-inline-block"></info-circle-icon>
				<p class="mb-0 mt-2">
					Are you sure to use Outlook Calendar <strong>{{ $root.auth.outlook_calendars.find((x) => x.id == newOutlookCalendarId).name }}</strong>? 
					<br />
					This action will populate your existing bookings to the selected calendar as events.
				</p>
				
				<div class="d-flex align-items-center mt-5">
					<button class="btn btn-white border mr-2" type="button" data-dismiss="modal" :disabled="confirmCalendarLoading">Cancel</button>
					<vue-button button_class="btn btn-primary ml-auto" type="button" :loading="confirmCalendarLoading" @click.native="setOutlookCalendar">Continue</vue-button>
				</div>
			</div>
		</modal>
	</div>
</template>

<script src="./calendar.js"></script>
<style src="./calendar.scss" lang="scss"></style>
