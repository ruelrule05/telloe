<template>
	<div class="p-8">
		<h3 class="mb-5 lg:mb-10 font-serif font-extrabold tracking-tighter uppercase text-body text-xs">Create a match up meeting link</h3>
		<vue-form-validate @submit="storeLink">
			<div class="form">
				<div class="flex flex-col lg:grid grid-cols-12 gap-x-8 justify-between form-inline">
					<div class="col-span-3 form-field mb-3 lg:mb-0">
						<label>Name</label>
						<input type="text" v-model="name" placeholder="Enter a name for your custom link" data-required />
					</div>
					<div class="col-span-4 form-field mb-3 lg:mb-0">
						<label>Add Contacts or email</label>
						<multiselect v-model="selectedContacts" ref="selectedContacts" label="name" track-by="id" :options="contactsOptions" :showLabels="false" placeholder="" multiple clearOnSelect>
							<div slot="noResult" slot-scope="data" class="text-muted text-sm text-center">
								<button
									v-if="isEmail.validate(data.search)"
									type="button"
									@click="
										emailToAdd.email = data.search;
										emailToAdd.timezone = $root.auth.timezone;
										$refs.addEmailModal.show();
									"
									class="btn btn-sm btn-outline-primary"
								>
									<span>Add this email</span>
								</button>
								<span v-else>No contacts found.</span>
							</div>
						</multiselect>
					</div>
					<div class="col-span-2 form-field">
						<label>Duration (min)</label>
						<input type="number" min="1" max="360" v-model="duration" placeholder="Duration" data-required />
					</div>
					<div class="col-span-3">
						<timerangepicker hideClearButton @change="updateTimeslots" :start="start" :end="end"></timerangepicker>
					</div>
				</div>
			</div>

			<div class="grid grid-cols-3 gap-2 lg:flex items-center mt-4">
				<div v-for="(date, dateKey) in dates" :key="dateKey" class="mr-2 cursor-pointer border border-primary rounded-md text-center py-2 px-3 uppercase text-primary font-semibold font-serif text-xs flex items-center" :class="{ 'bg-primary text-white': dateKey == selectedDate }" type="button" @click="selectedDate = dayjs(dateKey).format('YYYY-MM-DD')">
					<span class="-bottom-px relative"> {{ dayjs(dateKey).format('MMMM D YYYY') }} </span>
					<div v-if="Object.keys(dates).length > 1" @click.stop="removeDate(dateKey)" class="ml-2">
						<CloseIcon class="fill-current"></CloseIcon>
					</div>
				</div>
				<v-date-picker class="relative" :min-date="new Date()" :popover="{ placement: 'bottom', visibility: 'click' }" v-model="startDate">
					<template v-slot="data">
						<div class="bg-primary cursor-pointer mt-2 rounded-full p-2 text-white inline-block" v-on="data.inputEvents"><PlusIcon class="stroke-current"></PlusIcon></div>
					</template>
				</v-date-picker>
			</div>

			<div class="relative">
				<div v-if="timeslotsLoading" class="bg-white z-50 w-full h-full absolute-center py-36">
					<div class="absolute-center">
						<div class="spinner spinner-sm"></div>
					</div>
				</div>
				<div class="relative mt-4" :class="{ 'opacity-0': timeslotsLoading }">
					<div class="overflow-x-scroll overflow-y-visible booking-links__timeslots">
						<table class="timeslots-table" cellspacing="0" cellpadding="0">
							<tr>
								<td></td>
								<template v-if="dates[selectedDate]">
									<td v-for="(timeslot, timeslotIndex) in dates[selectedDate].timeslots" :key="timeslotIndex" class="border-right">
										<div class="text-center px-2 pb-2 bg-white">
											<toggle-switch v-model="timeslot.is_available"></toggle-switch>
											<span v-if="timeslot.is_booked" class="text-xxs text-muted">Booked</span>
										</div>
									</td>
								</template>
							</tr>

							<!-- You -->
							<tr>
								<td class="headcol contact-td mb-4 rounded-bl-lg rounded-tl-lg bg-primary-ultralight">
									<div class="flex items-center py-3 -ml-3">
										<div>
											<div class="profile-image profile-image-sm" :style="{ backgroundImage: 'url(' + $root.auth.profile_image + ')' }">
												<span v-if="!$root.auth.profile_image">{{ $root.auth.initials }}</span>
											</div>
										</div>
										<div class="pl-2">
											<p class="text-sm whitespace-nowrap">You</p>
											<p class="flex items-center tracking-wide text-xxs text-muted">{{ $root.auth.timezone }}</p>
										</div>
									</div>
								</td>
								<template v-if="dates[selectedDate]">
									<td v-for="(timeslot, timeslotIndex) in dates[selectedDate].timeslots" :key="timeslotIndex" class="border-right contact-td timeslot relative" :data-index="timeslotIndex" :class="{ disabled: !timeslot.is_available && timeslot.is_booked }">
										<div class="items-center column mb-2 px-1 bg-primary-ultralight">
											<div class="timeslot-content selectable" :class="{ selected: timeslot.is_available }">
												<p class="text-center" v-html="timeslotTime(timeslot.time, $root.auth.timezone)"></p>
											</div>
										</div>
									</td>
								</template>
							</tr>

							<!-- Selected contacts -->
							<tr v-for="contact in selectedContacts" :key="contact.id">
								<td class="headcol contact-td mb-2 rounded-bl-lg rounded-tl-lg" :style="{ backgroundColor: contact.color }">
									<div class="flex items-center py-3 -ml-3">
										<div>
											<div class="profile-image profile-image-sm" :style="{ backgroundImage: 'url(' + contact.contact_user.profile_image + ')' }">
												<span v-if="!contact.contact_user.profile_image">{{ contact.contact_user.initials }}</span>
											</div>
										</div>
										<div class="pl-2 overflow-hidden">
											<p class="text-sm whitespace-nowrap truncate">{{ contact.contact_user.full_name }}</p>
											<p class="flex items-center tracking-wide text-xxs text-muted">{{ contact.contact_user.timezone }}</p>
										</div>
									</div>
								</td>
								<template v-if="dates[selectedDate]">
									<td v-for="(timeslot, timeslotIndex) in dates[selectedDate].timeslots" :key="timeslotIndex" class="border-right contact-td timeslot" :class="{ disabled: !timeslot.is_available && timeslot.is_booked }">
										<div class="items-center column mb-2 px-1" :style="{ backgroundColor: contact.color }">
											<div class="timeslot-content" :class="{ selected: timeslot.is_available }">
												<p class="text-center" v-html="timeslotTime(timeslot.time, contact.contact_user.timezone)"></p>
											</div>
										</div>
									</td>
								</template>
							</tr>
						</table>
					</div>
				</div>

				<label class="mt-6">Invitation Message</label>
				<textarea v-model="message" :placeholder="`${$root.auth.full_name} has sent you a range of times to select that match up with your time zone and when ${$root.auth.first_name} is available to meet.`" class="resize-none lg:w-4/12" rows="4"></textarea>
				<button type="submit" class="btn btn-md btn-primary mt-8"><span>Save</span></button>
			</div>
		</vue-form-validate>

		<Modal ref="addEmailModal" size="sm">
			<h6 class="font-serif font-semibold mb-5 uppercase">Add Email</h6>
			<vue-form-validate @submit="addEmail">
				<label required>Email</label>
				<input type="text" v-model="emailToAdd.email" data-required />

				<label class="mt-4" required>Timezone</label>
				<VueSelect drop-position="w-full" required :options="availableTimezones" searchable v-model="emailToAdd.timezone" placeholder="Select timezone"></VueSelect>

				<div class="mt-8 flex justify-between">
					<button class="btn btn-outline-primary btn-md" type="button" @click="$refs.addEmailModal.hide()">
						<span>Cancel</span>
					</button>
					<button class="btn btn-primary btn-md" type="submit">
						<span>Add</span>
					</button>
				</div>
			</vue-form-validate>
		</Modal>
	</div>
</template>

<script src="./add.js"></script>

<style lang="scss" scoped src="./add.scss"></style>
