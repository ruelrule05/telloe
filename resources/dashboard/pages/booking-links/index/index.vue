<template>
	<div class="min-h-screen flex flex-col relative" v-if="$root.auth && ready">
		<div class="content-header border-bottom flex items-center justify-between">
			<div>
				CUSTOM LINKS
			</div>
			<div>
				<button type="button" ref="toggleAddLinkBtn" class="btn btn-md" :class="[addLink ? 'btn-outline-primary' : 'btn-primary']" @click="addLink = !addLink">
					<span>{{ addLink ? 'Cancel' : 'Add New' }}</span>
				</button>
			</div>
		</div>

		<Add v-if="addLink"></Add>

		<template v-else>
			<div v-if="booking_links.data.length == 0" class="absolute-center p-6 bg-secondary rounded-xl flex items-start w-4/12">
				<div class="text-primary">
					<InfoCircleIcon class="fill-current w-6 h-6"></InfoCircleIcon>
				</div>
				<div class="pl-4 -mt-1">
					<p class="font-bold text-sm">You haven't created any custom links yet. Use the custom links creation form to set up a new custom link.</p>
					<button type="button" class="btn btn-outline-primary btn-md mt-4" @click="addLink = true"><span>Add New</span></button>
				</div>
			</div>

			<div v-else class="flex flex-grow">
				<div class="w-4/12 p-6 border-right">
					<p class="text-muted text-sm">Custom links are a handy way to create a booking calendar with specific dates. Once you set up the link an invitation will be sent to the invited people. They will be able to confirm a meeting time that fits them according to your specified slots.</p>
				</div>

				<div class="w-8/12 p-6">
					<router-link :to="`/dashboard/booking-links/${booking_link.id}`" v-for="booking_link in booking_links.data" :key="booking_link.id" custom v-slot="{ navigate }">
						<div @click="navigate" class="cursor-pointer border-bottom pb-4 transition-colors hover:bg-gray-50">
							<div class="text-primary font-bold">
								{{ booking_link.name }}
							</div>
							<div class="text-muted text-xs">
								Created: {{ formatDate(booking_link.created_at) }} <span class="ml-3">Duration: {{ booking_link.duration }} mins</span>
							</div>
							<div class="flex items-center mt-3">
								<div class="flex items-center">
									<div v-for="contact in booking_link.booking_link_contacts" :key="contact.id" class="-mr-2">
										<div class="profile-image profile-image-sm profile-image-gray relative z-0 border border-white" :style="{ backgroundImage: 'url(' + contact.contact.profile_image + ')' }">
											<span v-if="!contact.contact.profile_image">{{ contact.contact.initials }}</span>
										</div>
									</div>
									<div v-for="email in booking_link.emails" :key="email.email" class="-mr-2">
										<div class="profile-image profile-image-sm profile-image-gray relative z-0 border border-white">
											<span class="uppercase">{{ email.email[0] }}</span>
										</div>
									</div>
								</div>
								<span class="text-muted text-sm ml-4">Custom link dates:</span>
								<div class="flex items-center">
									<div v-for="(date, dateKey, dateIndex) in booking_link.dates" :key="dateKey" class="text-sm">
										<span v-if="dateIndex > 0" class="text-muted">|</span>
										<span class="mx-2">{{ formatDate(dateKey) }} </span>
									</div>
								</div>
							</div>
						</div>
					</router-link>
				</div>
			</div>
		</template>
	</div>
</template>

<script type="text/javascript" src="./index.js"></script>
<style lang="scss" scoped src="./index.scss"></style>
