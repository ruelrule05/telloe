<template>
	<div class="p-6">
		<h3 class="mb-10 font-serif font-extrabold tracking-tighter uppercase text-body text-xs">Create a custom link</h3>
		<vue-form-validate @submit="storeLink">
			<div class="form">
				<div class="grid grid-cols-2 gap-x-8 justify-between form-inline">
					<div class="form-field">
						<label>Name</label>
						<input type="text" v-model="name" placeholder="Enter a name for your custom link" data-required />
					</div>
					<div class="form-field">
						<label>Add Contacts</label>
						<multiselect v-model="selectedContacts" label="name" track-by="name" :options="contactsOptions" :showLabels="false" placeholder="" multiple>
							<template slot="singleLabel" slot-scope="{ option }">{{ option.name }}</template>
							<span slot="noResult" class="text-muted text-sm">No contacts found.</span>
						</multiselect>
					</div>
				</div>
			</div>

			<div class="flex items-center mt-4">
				<div v-for="(date, dateKey) in dates" :key="dateKey" class="mr-2 cursor-pointer border border-primary rounded-md text-center py-2 px-3 uppercase text-primary font-semibold font-serif text-xs flex items-center" :class="{ 'bg-primary text-white': dateKey == selectedDate }" type="button" @click="selectedDate = dayjs(dateKey).format('YYYY-MM-DD')">
					<span class="-bottom-px relative"> {{ dayjs(dateKey).format('MMMM D YYYY') }} </span>
					<div v-if="Object.keys(dates).length > 1" @click.stop="removeDate(dateKey)" class="ml-2">
						<CloseIcon class="fill-current"></CloseIcon>
					</div>
				</div>
				<v-date-picker :min-date="new Date()" :popover="{ placement: 'bottom', visibility: 'click' }" v-model="startDate">
					<template v-slot="data">
						<div class="bg-primary cursor-pointer mt-2 rounded-full p-2 text-white inline-block" v-on="data.inputEvents"><PlusIcon class="stroke-current"></PlusIcon></div>
					</template>
				</v-date-picker>
			</div>

			<div v-if="selectedContacts.length > 0">
				<div class="flex justify-end relative mt-4">
					<div class="overflow-x-scroll overflow-y-visible" style="margin-left: 200px">
						<table class="w-full timeslots-table" cellspacing="0" cellpadding="0">
							<tr>
								<td></td>
								<td v-for="(timeslot, timeslotIndex) in dates[selectedDate].timeslots" :key="timeslotIndex" class="border-right">
									<div class="text-center px-2 pb-2 bg-white">
										<VueCheckbox v-if="timeslot.is_available" v-model="timeslot.is_selected" @input="addTimeslot($event, timeslot)"></VueCheckbox>
									</div>
								</td>
							</tr>
							<tr v-for="contact in selectedContacts" :key="contact.id" class="relative">
								<td class="headcol contact-td mb-2 rounded-bl-lg rounded-tl-lg" :style="{ backgroundColor: contact.color }">
									<div class="flex items-center py-3 -ml-3">
										<div>
											<div class="profile-image profile-image-sm" :style="{ backgroundImage: 'url(' + contact.contact_user.profile_image + ')' }">
												<span v-if="!contact.contact_user.profile_image">{{ contact.contact_user.initials }}</span>
											</div>
										</div>
										<div class="pl-2">
											<p class="text-sm whitespace-nowrap">{{ contact.contact_user.full_name }}</p>
											<p class="flex items-center tracking-wide text-xxs text-muted">{{ contact.contact_user.timezone }}</p>
										</div>
									</div>
								</td>
								<td v-for="(timeslot, timeslotIndex) in dates[selectedDate].timeslots" :key="timeslotIndex" class="border-right contact-td timeslot" :class="{ disabled: !timeslot.is_available }">
									<div class="items-center column  mb-2 px-1" :style="{ backgroundColor: contact.color }">
										<div class="timeslot-content" :class="{ selected: dates[selectedDate].selectedTimeslots.find(x => x.time == timeslot.time) }">
											<p class="text-sm font-bold text-center text-body">{{ timeslot['12hr'] }}</p>
											<p class="text-sm text-center text-muted uppercase">{{ timeslot.abbreviation }}</p>
										</div>
									</div>
								</td>
							</tr>
						</table>
					</div>
				</div>
				<button type="submit" class="btn btn-md btn-primary mt-8"><span>Save</span></button>
			</div>
		</vue-form-validate>
	</div>
</template>

<script src="./add.js"></script>

<style lang="scss" scoped src="./add.scss"></style>
