<template>
	<div v-if="packageItem">
		<div class="min-h-screen flex flex-col relative">
			<div class="content-header border-bottom uppercase lg:static fixed w-full bg-white md:z-0 z-10">
				<router-link to="/dashboard/packages" class="cursor-pointer rounded-full transition-colors hover:bg-gray-100 text-gray-600 p-1 mr-2"><ChevronLeftIcon class="fill-current"></ChevronLeftIcon></router-link>
				PACKAGE OVERVIEW
			</div>
			<div class="h-20 lg:hidden block" />

			<div class="border-bottom p-8 flex flex-col lg:grid grid-cols-12">
				<div class="col-span-5">
					<h1 class="text-2xl text-primary font-bold font-serif">{{ packageItem.name }}</h1>
					<p class="text-sm text-muted">{{ packageItem.description }}</p>
				</div>
				<div class="col-span-4 flex items-center justify-between text-sm px-0 lg:px-8 my-5 lg:my-0">
					<div>
						<span class="text-muted">SERVICES</span>
						<div>{{ packageItem.services.length }}</div>
					</div>
					<div class="px-8">
						<span class="text-muted">PRICE</span>
						<div>${{ parseFloat(packageItem.price).toFixed(2) }}</div>
					</div>
					<div>
						<span class="text-muted">EXPIRES</span>
						<div>{{ formatDate(packageItem.expiration_date) }}</div>
					</div>
				</div>
				<div class="col-span-3 flex items-center justify-end">
					<button type="button" class="btn btn-sm btn-primary" @click="$refs.editModal.show()"><span>Edit</span></button>
					<button type="button" class="btn btn-sm btn-outline-primary ml-3" @click="$refs.deleteModal.show()"><TrashIcon class="fill-current"></TrashIcon></button>
				</div>
			</div>

			<!-- Services -->
			<div class="px-6">
				<div class="border-bottom py-4" :class="{ active: selectedService.id == service.id }" v-for="(service, index) in packageItem.services" :key="service.id">
					<div class="flex items-center" :data-intro="index == 0 ? $root.intros.packages_show.steps[0] : null">
						<div>
							<h6 class="mb-1 font-bold">{{ service.name }}</h6>
							<span class="text-muted">Duration: {{ service.duration }} min</span>

							<div class="flex items-center mt-4 flex-wrap">
								<!-- <div class="mr-2 mb-2 inline-block" v-for="(block, index) in new Array(parseInt(selectedService.bookings - packageItem.contact_packages.filter(p => p.service.id == service.id).length))" :key="index"> -->

								<div class="mr-2 mb-2 inline-block" v-for="(block, index) in new Array(parseInt(service.bookings))" :key="index">
									<div class="bg-gray-100 rounded-xl py-2 px-3">
										<h6 class="font-bold">{{ service.duration }}min</h6>
									</div>
								</div>
								<!-- <template v-for="contactPackage in packageItem.contact_packages">
									<div class="mr-2 mb-2 inline-block" v-if="contactPackage.service.id == service.id" :key="contactPackage.id">
										<div class="bg-gray-100 rounded-xl py-2 px-3 flex items-center">
											<div class="profile-image profile-image-xs mr-2" :style="{ backgroundImage: 'url(' + contactPackage.contact.profile_image + ')' }">
												<span v-if="!contactPackage.contact.profile_image">{{ contactPackage.contact.initials }}</span>
												<i v-if="$root.isOnline(contactPackage.contact.contact_user_id)" class="online-status">&nbsp;</i>
											</div>
											<h6 class="font-bold">{{ service.duration }}min</h6>
										</div>
									</div>
								</template> -->
							</div>
						</div>

						<div class="hidden dropdown mr-1 pl-1 ml-auto service-dropdown">
							<button class="btn btn-white line-height-0 p-1 badge-pill shadow-none" data-toggle="dropdown" data-offset="-140, 0">
								<more-icon width="20" height="20" transform="scale(0.75)" class="fill-gray"></more-icon>
							</button>
							<div class="dropdown-menu">
								<router-link class="dropdown-item cursor-pointer" tag="span" :to="`/dashboard/bookings/services/${service.id}`"> View Service </router-link>
								<span class="dropdown-item cursor-pointer" @click="removeAssignedService(service, index)"> Remove </span>
							</div>
						</div>
					</div>
				</div>
				<!-- <div class="p-3 flex-1 bg-white shadow-sm position-relative rounded">
					<div class="px-1 mb-2 d-inline-block" v-for="(block, index) in new Array(parseInt(selectedService.bookings))" :key="index">
						<div class="bg-primary rounded text-white py-3 px-4 cursor-pointerx">
							<h6 class="font-heading mb-0">{{ selectedService.duration }} min</h6>
						</div>
					</div>
				</div> -->
			</div>
		</div>

		<Modal ref="editModal">
			<h6 class="font-serif font-semibold mb-5">EDIT PACKAGE</h6>
			<vue-form-validate @submit="update" v-if="clonedPackage">
				<fieldset>
					<div class="mb-4">
						<label>Package name</label>
						<input type="text" v-model="clonedPackage.name" data-required />
					</div>
					<div class="mb-4">
						<label>Description</label>
						<textarea class="form-control resize-none" v-model="clonedPackage.description" data-required rows="3"></textarea>
					</div>

					<div class="mb-4">
						<label>Expires on</label>
						<v-date-picker class="relative" :min-date="new Date()" :popover="{ placement: 'bottom', visibility: 'click' }" v-model="clonedPackage.expiration_date" :masks="masks">
							<template v-slot="{ inputValue, inputEvents }">
								<input type="text" readonly v-on="inputEvents" :value="inputValue" placeholder="Set expiration date" />
							</template>
						</v-date-picker>
					</div>

					<div class="mb-4">
						<label>Services</label>
						<multiselect v-model="clonedPackage.services" label="name" track-by="id" :options="servicesList" :showLabels="false" placeholder="" multiple>
							<template slot="singleLabel" slot-scope="{ option }">{{ option.name }}</template>
							<span slot="noResult" class="text-muted text-sm">No services found.</span>
						</multiselect>

						<div v-for="(service, index) in clonedPackage.services" :key="service.id" class="rounded-xl bg-gray-100 px-3 py-2 mt-2 flex items-center">
							<h6 class="text-sm text-primary font-semibold">{{ service.name }}</h6>
							<input type="number" class="w-1/3 ml-auto" data-required placeholder="Bookings" min="1" v-model="clonedPackage.services[index].bookings" value="1" />
						</div>
					</div>

					<div class="mb-4">
						<label>Package Total</label>
						<input type="number" step="0.01" v-model="clonedPackage.price" placeholder="Package Price" />
					</div>
				</fieldset>
				<div class="mb-4">
					<vue-checkbox v-model="clonedPackage.in_widget" label="Available in widget"></vue-checkbox>
				</div>
				<div class="flex items-center justify-between mt-6">
					<button class="btn btn-md btn-outline-primary" type="button" @click="$refs.editModal.hide()">
						<span>Cancel</span>
					</button>
					<button class="btn btn-md btn-primary" type="submit"><span>Update</span></button>
				</div>
			</vue-form-validate>
		</Modal>

		<Modal ref="deleteModal">
			<template v-if="packageItem">
				<h6 class="font-serif font-semibold mb-5 text-center">DELETE PACKAGE</h6>
				<p class="text-center mt-3">
					Are you sure to delete the package
					<strong>{{ packageItem.name }}</strong>
					?
					<br />
					<span class="text-red-600">This action cannot be undone</span>
				</p>
				<div class="flex justify-between items-center mt-4">
					<button class="btn btn-md btn-outline-primary" type="button" @click="$refs.deleteModal.hide()">
						<span>Cancel</span>
					</button>
					<button
						class="btn btn-md btn-red"
						type="button"
						@click="
							deletePackage(packageItem).then(() => $router.push('/dashboard/packages'));
							$refs.deleteModal.hide();
						"
					>
						<span>Delete</span>
					</button>
				</div>
			</template>
		</Modal>
	</div>
</template>

<script src="./show.js"></script>
<style lang="scss" scoped src="./show.scss"></style>
