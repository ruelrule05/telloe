<template>
	<div class="p-12 h-full">
		<h1 class="font-serif font-bold text-xl uppercase mb-6">{{ bookingLink.name }}</h1>

		<div v-if="bookingLink.booking_link_contacts.length > 0">
			<div v-for="(date, dateKey) in bookingLink.dates" :key="dateKey" class="cursor-pointer border border-primary rounded-md text-center py-2 px-3 uppercase text-primary font-semibold font-serif text-xs tems-center inline-block mr-2" :class="{ 'bg-primary text-white': dateKey == selectedDate }" type="button" @click="selectedDate = dayjs(dateKey).format('YYYY-MM-DD')">
				<span class="-bottom-px relative"> {{ dayjs(dateKey).format('MMMM D YYYY') }} </span>
			</div>

			<div class="flex justify-end relative mt-10">
				<div class="overflow-x-scroll overflow-y-visible" style="margin-left: 200px">
					<table class="w-full timeslots-table" cellspacing="0" cellpadding="0">
						<tr v-if="bookingLink.user_id != auth.id">
							<td></td>
							<td v-for="(timeslot, timeslotIndex) in bookingLink.dates[selectedDate].timeslots" :key="timeslotIndex" class="border-right">
								<div class="text-center px-2 pb-2 bg-white">
									<VueCheckbox v-if="!bookingLink.dates[selectedDate].selectedTimeslots.find(x => x.time == timeslot.time)" v-model="timeslot.is_suggested" @input="toggleTimeslot($event, timeslot)"></VueCheckbox>
									<span v-else>&nbsp;</span>
								</div>
							</td>
						</tr>

						<tr v-for="contact in bookingLink.booking_link_contacts" :key="contact.id" class="relative">
							<td class="headcol contact-td mb-2 rounded-bl-lg rounded-tl-lg" :style="{ backgroundColor: contact.color }">
								<div class="flex items-center py-3 -ml-3">
									<div>
										<div class="profile-image profile-image-sm" :style="{ backgroundImage: 'url(' + contact.contact.profile_image + ')' }">
											<span v-if="!contact.contact.profile_image">{{ contact.contact.initials }}</span>
										</div>
									</div>
									<div class="pl-2">
										<p class="text-sm whitespace-nowrap">{{ contact.contact.full_name }}</p>
										<p class="flex items-center tracking-wide text-xxs text-muted">{{ contact.contact.contact_user.timezone }}</p>
									</div>
								</div>
							</td>
							<td v-for="(timeslot, timeslotIndex) in bookingLink.dates[selectedDate].timeslots" :key="timeslotIndex" class="border-right contact-td timeslot" :data-index="timeslotIndex">
								<div class="items-center column  mb-2 px-1" :style="{ backgroundColor: contact.color }">
									<div class="timeslot-content" :style="{ 'border-color': timeslot.is_suggested && contact.contact.contact_user_id == auth.id ? contact.color.replace('0.1', 1) : 'transparent' }" :class="{ selected: bookingLink.dates[selectedDate].selectedTimeslots.find(x => x.time == timeslot.time), suggested: timeslot.is_suggested }">
										<p class="text-sm font-bold text-center text-body">{{ timeslot['12hr'] }}</p>
										<p class="text-sm text-center text-muted uppercase">{{ timeslot.abbreviation }}</p>
									</div>
								</div>
							</td>
						</tr>
					</table>
				</div>
			</div>
		</div>

		<modal ref="loginModal" size="modal-sm" :close-button="false">
			<h4 class="font-heading mb-3">
				<span class="text-capitalize">{{ authAction }}</span> to continue
			</h4>
			<vue-form-validate @submit="login" v-if="authAction == 'login'">
				<div class="form-group mb-2">
					<input type="email" disabled readonly class="form-control" :value="email" data-required />
				</div>
				<div class="form-group">
					<input type="password" class="form-control" v-model="loginForm.password" placeholder="Password" data-required />
				</div>
				<button class="btn-block btn btn-primary" type="submit">Log In</button>
				<div class="text-center">
					<button class="btn" type="button" @click="authAction = 'register'">Sign Up</button>
				</div>
			</vue-form-validate>

			<vue-form-validate @submit="register" v-else-if="authAction == 'register'">
				<div class="form-group mb-2">
					<input type="email" disabled readonly class="form-control" :value="email" data-required />
				</div>
				<div class="form-group">
					<input type="text" class="form-control" v-model="signupForm.firstName" placeholder="First Name" data-required />
				</div>
				<div class="form-group">
					<input type="text" class="form-control" v-model="signupForm.lastName" placeholder="Last Name" data-required />
				</div>
				<div class="form-group">
					<input type="password" class="form-control" v-model="signupForm.password" placeholder="Password" data-required />
				</div>
				<button class="btn-block btn btn-primary" type="submit">Sign Up</button>
				<div class="text-center">
					<button class="btn" type="button" @click="authAction = 'login'">Log In</button>
				</div>
			</vue-form-validate>
		</modal>

		<chatroom :booking-link="bookingLink"></chatroom>
	</div>
</template>

<script type="text/javascript" src="./booking-link.js"></script>

<style lang="scss" scoped src="./booking-link.scss"></style>
