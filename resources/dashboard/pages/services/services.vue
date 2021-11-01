<template>
	<div>
		<div v-show="!serviceToEdit" class="min-h-screen flex flex-col relative">
			<div class="content-header border-bottom lg:static fixed w-full bg-white z-20">
				<div class="ml-7 lg:ml-0 absolute lg:static top-7">
					EVENT TYPES
				</div>
				<div class="ml-auto">
					<button
						type="button"
						class="btn btn-md btn-outline-primary flex items-center justify-center"
						@click="
							resetNewService();
							createService = true;
							serviceToEdit = newService;
						"
					>
						<span>Add</span>
						<span class="hidden md:block ml-1">Event type</span>
					</button>
				</div>
			</div>
			<div class="h-20 lg:hidden block" />

			<div v-if="banner" class="p-4 lg:p-8 border-bottom relative">
				<div class="font-serif absolute lg:top-10 lg:right-10 top-6 right-6 z-10">
					<button class="border border-primary rounded-full p-2 focus:outline-none transition-colors hover:bg-gray-100" type="button" @click="hideBanner()"><CloseIcon width="10" height="10" class="fill-current text-primary"></CloseIcon></button>
				</div>
				<div class="bg-primary-ultralight rounded-xl flex p-6 flex-col md:flex-row relative">
					<div class="font-serif w-4/5 md:w-1/4 font-semibold uppercase">
						CREATE EVENT TYPES TO ENABLE SELF-SERVE BOOKINGS.
					</div>
					<div class="w-full md:w-2/4 ml-0 md:ml-10">
						<p class="text-muxted mb-4">
							Change the Event Types visible to clients on your public page. Adjust your available times for event types to suit you.
						</p>
						<button
							class="btn btn-md btn-outline-primary"
							type="button"
							@click="
								resetNewService();
								createService = true;
								serviceToEdit = newService;
							"
						>
							<span>ADD EVENT TYPE</span>
						</button>
					</div>
				</div>
			</div>

			<div v-show="ready" class="flex-grow flex flex-col lg:flex-row">
				<!-- Services list -->
				<template>
					<template v-if="services.length > 0">
						<div class="w-full lg:w-7/12 border-r-0 lg:border-r border-bottom lg:border-b-0 p-6 md:p-8">
							<div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
								<div v-for="service in services" :key="service.id">
									<ServiceCard :service="service" @click="serviceAction($event, service)"></ServiceCard>
								</div>
							</div>
						</div>
						<div class="w-full lg:w-5/12 p-6 md:p-">
							<h6 class="font-serif font-semibold text-xs">YOUR PUBLIC PAGE</h6>
							<div class="services-card card card-secondary mt-4">
								<p class="text-sm text-muted">
									Your public page shows all your active events in one place.
								</p>

								<strong class="text-primary text-sm font-bold block my-5">
									<a :href="`/@${$root.auth.username}`" target="_blank" class="hover:underline">{{ `${$root.app_url.replace('https://', '')}/@${$root.auth.username}` }}</a>
								</strong>
								<button type="button" class="btn btn-sm btn-primary" @click="copyLink"><span>Copy Link</span></button>
							</div>

							<div v-if="widgetService" class="mt-8">
								<h6 class="font-serif font-semibold text-xs">WIDGET EVENT</h6>
								<div class="card mt-4">
									<strong class="text-primary text-sm font-bold block mb-1">{{ widgetService.name }}</strong>
									<strong class="text-gray-400 font-bold block mb-5 text-sm">{{ widgetService.duration }} min</strong>
									<button type="button" class="btn btn-sm btn-outline-primary" @click="embedModal"><span>EMBED</span></button>
								</div>
							</div>
						</div>
					</template>

					<div v-else class="relative flex-grow">
						<div class="absolute-center p-8 bg-secondary rounded-xl flex items-start lg:w-6/12 md:5/12 sm:w-6/12 w-10/12">
							<div class="text-primary">
								<InfoCircleIcon class="fill-current w-6 h-6"></InfoCircleIcon>
							</div>
							<div class="pl-4 -mt-1">
								<p>You haven't created any event types yet. Create your first event type by clicking the button below.</p>
								<button
									type="button"
									class="btn btn-outline-primary btn-md mt-4"
									@click="
										resetNewService();
										createService = true;
										serviceToEdit = newService;
									"
								>
									<span>Add New</span>
								</button>
							</div>
						</div>
					</div>
				</template>
			</div>
		</div>

		<!-- Edit service -->
		<Service
			v-show="serviceToEdit"
			:createService="createService"
			:service="serviceToEdit"
			:servicesCount="services.length"
			@close="
				serviceToEdit = null;
				resetNewService();
				createService = false;
			"
		></Service>

		<Modal ref="addServiceModal">
			<h6 class="font-serif font-semibold mb-5">ADD EVENT TYPE</h6>
			<vue-form-validate @submit="confirmAddService">
				<div class="mb-5">
					<label>Name</label>
					<input type="text" v-model="newService.name" required />
				</div>
				<div class="mb-5">
					<label>Description</label>
					<textarea rows="6" v-model="newService.description" required class="resize-none"></textarea>
				</div>
				<div class="mb-5">
					<label>Duration</label>
					<input type="number" v-model="newService.duration" required />
				</div>
				<div>
					<label>Interval</label>
					<input type="number" v-model="newService.interval" required />
				</div>
				<div class="flex justify-between mt-6">
					<button class="btn btn-sm btn-outline-primary" type="button" @click="$refs.addServiceModal.hide()">
						<span>Cancel</span>
					</button>
					<button class="btn btn-sm btn-primary" type="submit"><span>Add</span></button>
				</div>
			</vue-form-validate>
		</Modal>

		<Modal ref="embedModal" size="sm">
			<div>
				<h6 class="font-serif font-semibold">EMBED YOUR EVENT WIDGET</h6>
				<p class="text-sm mt-6">Click to copy and paste this code as the first item into the &lt;HEAD&gt; of every webpage you want to show the booking widget.</p>

				<div class="rounded-2xl p-4 bg-gray-100 mt-5 text-muted text-sm">
					{{ scriptCode }}
				</div>
				<button type="button" class="btn btn-mdx btn-outline-primary mt-4 w-full" @click="copySCriptCode"><span>COPY LINK</span></button>
			</div>
		</Modal>

		<Modal ref="deleteServiceModal">
			<div v-if="serviceToDelete">
				<div class="text-center">
					<WarningIcon class="fill-current text-red-600 h-8 w-8 inline-block mb-4"></WarningIcon>
					<p>
						Are you sure you want to delete the event type <strong>{{ serviceToDelete.name }}</strong
						>?
					</p>
				</div>
				<div class="flex justify-between mt-6">
					<button class="btn btn-sm btn-outline-primary" type="button" @click="$refs.deleteServiceModal.hide()"><span>Cancel</span></button>
					<button class="btn btn-sm btn-red" type="button" @click="confirmDeleteService"><span>Delete</span></button>
				</div>
			</div>
		</Modal>
	</div>
</template>

<script src="./services.js"></script>

<style lang="scss" scoped src="./services.scss"></style>
