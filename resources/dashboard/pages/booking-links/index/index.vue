<template>
	<div class="min-h-screen flex flex-col relative bespoke" v-if="$root.auth && ready">
		<div class="content-header border-bottom flex items-center justify-between lg:static fixed w-full bg-white z-10">
			<div class="ml-9 lg:ml-0">
				MATCH UP MEETINGS
			</div>
			<div>
				<button type="button" ref="toggleAddLinkBtn" class="btn btn-md whitespace-pre" :class="[addLink ? 'btn-outline-primary' : 'btn-primary']" @click="addLink = !addLink">
					<span>{{ addLink ? 'Cancel' : 'Add New' }}</span>
				</button>
			</div>
		</div>
		<div class="h-20 lg:hidden block" />

		<Add v-if="addLink"></Add>

		<template v-else>
			<div v-if="banner" class="p-4 lg:p-8 border-bottom relative" :class="booking_links.data.length == 0 ? 'border-b-0 sm:border-b' : 'border-bottom'">
				<div class="font-serif absolute lg:top-10 lg:right-10 top-6 right-6 z-10">
					<button class="border border-primary rounded-full p-2 focus:outline-none transition-colors hover:bg-gray-100" type="button" @click="hideBanner()"><CloseIcon width="10" height="10" class="fill-current text-primary"></CloseIcon></button>
				</div>
				<div class="bg-primary-ultralight rounded-xl flex p-6 flex-col md:flex-row relative">
					<div class="font-serif w-4/5 md:w-1/4 font-semibold uppercase">
						Collaborate and agree on a time.
					</div>
					<div class="w-full md:w-7/12 ml-0 md:ml-10">
						<p class="text-muxted mb-4">
							Create a Match Up suggested meeting time selector link that shows your available times, enables invited guests to select a time that works for them or suggest an alternative.
						</p>
						<button class="btn btn-md btn-outline-primary" type="button" @click="addLink = true"><span>CREATE A MATCH UP MEETING LINK</span></button>
					</div>
				</div>
			</div>

			<div v-if="booking_links.data.length == 0" class="relative flex-grow">
				<div class="absolute-center p-8 bg-secondary rounded-xl flex items-start lg:w-4/12 sm:w-6/12 w-10/12" :class="{ 'empty-list': banner }">
					<div class="text-primary">
						<InfoCircleIcon class="fill-current w-6 h-6"></InfoCircleIcon>
					</div>
					<div class="pl-4 -mt-1">
						<p class="font-bold text-sm">You haven't created any match up links yet. Use the custom links creation form to set up a new custom link.</p>
						<button type="button" class="btn btn-outline-primary btn-md mt-4 whitespace-pre" @click="addLink = true"><span>Add New</span></button>
					</div>
				</div>
			</div>
			<div v-else class="flex flex-grow flex-col lg:flex-row">
				<div class="w-full lg:w-4/12 p-8 border-r-0 lg:border-r border-b lg:border-b-0">
					<p class="text-muted text-sm">Match up meetings are a handy way to create a booking calendar with specific dates. Once you set up the link an invitation will be sent to the invited people. They will be able to confirm a meeting time that fits them according to your specified slots.</p>
				</div>

				<div class="w-full lg:w-8/12 px-6 py-2">
					<div v-for="booking_link in booking_links.data" :key="booking_link.id">
						<div class="border-bottom py-4">
							<div class="flex justify-between relative">
								<div class="lg:w-full w-6/12">
									<router-link :to="`/dashboard/booking-links/${booking_link.id}`" custom v-slot="{ navigate }">
										<div class="text-primary font-bold lg:w-6/12 w-auto cursor-pointer hover:underline" @click="navigate">
											{{ booking_link.name }}
										</div>
									</router-link>
									<div class="text-muted text-xs flex flex-col lg:flex-row lg:w-6/12 w-auto">
										Created: {{ formatDate(booking_link.created_at) }} <span class="ml-0 lg:ml-3">Duration: {{ booking_link.duration }} mins</span>
									</div>
								</div>
								<div class="flex lg:block items-start justify-end absolute lg:static right-0 top-0">
									<div class="flex items-center">
										<VueDropdown :options="['Send email invitation', 'Copy link', 'Delete']" @click="action($event, booking_link)">
											<template #button>
												<div class="transition-colors cursor-pointer rounded-full p-2 hover:bg-gray-100">
													<MoreIcon class="w-4 h-4"></MoreIcon>
												</div>
											</template>
										</VueDropdown>
									</div>
								</div>
							</div>
							<div class="flex mt-3 items-start">
								<div class="flex items-center">
									<div class="flex items-center">
										<template v-for="contact in booking_link.booking_link_contacts">
											<div v-if="contact.contact" :key="contact.id" class="-mr-2">
												<div class="profile-image profile-image-sm profile-image-gray relative z-0 border border-white" :style="{ backgroundImage: 'url(' + contact.contact.profile_image + ')' }">
													<span v-if="!contact.contact.profile_image">{{ contact.contact.initials }}</span>
												</div>
											</div>
										</template>
										<div v-for="email in booking_link.emails" :key="email.email" class="-mr-2">
											<div class="profile-image profile-image-sm profile-image-gray relative z-0 border border-white">
												<span class="uppercase">{{ email.email[0] }}</span>
											</div>
										</div>
									</div>
								</div>
								<div class="flex flex-col ml-4">
									<span class="text-muted text-sm">Dates:</span>
									<div class="flex items-center mt-1">
										<div v-for="(date, dateKey) in booking_link.dates" :key="dateKey" class="badge text-sm flex mr-1">
											{{ formatDate(dateKey) }}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</template>

		<Modal ref="deleteModal">
			<h6 class="font-serif font-semibold mb-5 uppercase text-center">Delete Match Up Link</h6>
			<p class="text-center mt-3">
				Are you sure to delete this match up link?
			</p>
			<div class="flex items-center justify-between mt-6">
				<button class="btn btn-outline-primary btn-md" type="button" @click="$refs.deleteModal.hide()">
					<span>Cancel</span>
				</button>
				<button class="btn btn-red btn-md" type="button" @click="destroy">
					<span>Delete</span>
				</button>
			</div>
		</Modal>

		<Modal ref="sendModal" :noBackdropHide="true">
			<template v-if="selectedLink">
				<h6 class="font-serif font-semibold mb-5 uppercase">Send Invitation Link</h6>
				<p class="mb-2">You are sending invitation link to these emails:</p>
				<span class="badge badge-secondary line-height-base mr-1" v-for="contact in selectedLink.booking_link_contacts" :key="contact.id">
					{{ contact.contact.contact_user.email }}
				</span>
				<span class="badge badge-secondary line-height-base mr-1" v-for="email in selectedLink.emails" :key="email.email">
					{{ email.email }}
				</span>
				<div class="flex items-center mt-6 justify-between">
					<button :disabled="sendingEmail" class="btn btn-outline-primary btn-md" type="button" @click="$refs.sendModal.hide(true)"><span>Cancel</span></button>
					<vue-button :loading="sendingEmail" button_class="btn btn-primary btn-md" type="button" @click="sendEmail"><span>Send</span></vue-button>
				</div>
			</template>
		</Modal>
	</div>
</template>

<script type="text/javascript" src="./index.js"></script>
<style lang="scss" scoped src="./index.scss"></style>
