<template>
	<div>
		<div class="min-h-screen flex flex-col relative" v-if="ready">
			<div class="content-header border-bottom flex items-center justify-between lg:static fixed w-full bg-white z-10">
				<div class="ml-7 lg:ml-0">
					PACKAGES
				</div>
				<div>
					<button
						type="button"
						class="btn btn-md btn-primary flex items-center"
						@click="
							newPackage = {};
							$refs.addModal.show();
						"
					>
						<span>Add</span>
						<span class="hidden md:block ml-1">Package</span>
					</button>
				</div>
			</div>
			<div class="h-20 lg:hidden block" />
			<div v-if="banner" class="p-8 border-bottom">
				<div class="bg-primary-ultralight rounded-xl flex p-6 flex-col md:flex-row relative">
					<div class="font-serif w-4/5 md:w-1/4 font-semibold uppercase">
						CREATE A NEW PACKAGE
					</div>
					<div class="w-full md:w-7/12 ml-0 md:ml-20">
						<p class="text-muxted mb-4">
							Create packages of event types and assign them to contacts.
						</p>
						<button
							class="btn btn-md btn-outline-primary"
							type="button"
							@click="
								newPackage = {};
								$refs.addModal.show();
							"
						>
							<span>CREATE A NEW PACKAGE</span>
						</button>
					</div>
					<div class="font-serif absolute top-5 right-6">
						<button class="border border-primary rounded-full p-2 focus:outline-none transition-colors hover:bg-gray-100" type="button" @click="hideBanner()"><CloseIcon width="10" height="10" class="fill-current text-primary"></CloseIcon></button>
					</div>
				</div>
			</div>

			<div v-if="packages.length == 0" class="flex-grow p-8">
				<div class="absolute-center p-6 bg-secondary rounded-xl flex items-start lg:w-4/12 md:5/12 sm:w-6/12 w-10/12" :class="{ packages: banner }">
					<div class="text-primary">
						<InfoCircleIcon class="fill-current w-6 h-6"></InfoCircleIcon>
					</div>
					<div class="pl-4 -mt-1">
						<p class="font-bold text-sm">No packages added yet. Add a package to your directory by clicking the button below.</p>
						<button type="button" class="btn btn-outline-primary btn-md mt-4" @click="$refs.addModal.show()"><span>Add Package</span></button>
					</div>
				</div>
			</div>

			<div v-else class="flex-grow">
				<div class="grid grid-cols-1 gap-8 p-4 md:grid-cols-3 lg:grid-cols-4">
					<div v-for="packageItem in packages" class="rounded-2xl bg-secondary-light p-4 w-full" :key="packageItem.id">
						<div class="flex justify-between">
							<div class="overflow-hidden">
								<router-link :to="`/dashboard/packages/${packageItem.id}`" class="text-primary font-bold truncate">{{ packageItem.name }}</router-link>
								<p class="text-muted text-sm truncate">{{ packageItem.description }}</p>
							</div>
							<div>
								<VueDropdown :options="['Edit', 'Delete']" @click="packageAction($event, packageItem)" class="-mr-2 -mt-2">
									<template #button>
										<div class="transition-colors cursor-pointer rounded-full p-2 hover:bg-gray-100">
											<CogIcon class="fill-current text-gray-400"></CogIcon>
										</div>
									</template>
								</VueDropdown>
							</div>
						</div>

						<div class="flex items-center justify-between text-sm my-4">
							<div>
								<span class="text-muted">SERVICES</span>
								<div>{{ packageItem.services.length }}</div>
							</div>
							<div>
								<span class="text-muted">PRICE</span>
								<div>${{ parseFloat(packageItem.price).toFixed(2) }}</div>
							</div>
						</div>

						<div class="flex items-center">
							<span v-if="packageItem.is_available" class="text-xs mr-2">Active</span>
							<ToggleSwitch @click.native.stop @input="updatePackage(packageItem)" v-model="packageItem.is_available"></ToggleSwitch>
						</div>
					</div>
				</div>
			</div>
		</div>

		<Modal ref="editModal">
			<h6 class="font-serif font-semibold mb-5">EDIT PACKAGE</h6>
			<vue-form-validate @submit="update" v-if="clonedPackage">
				<fieldset>
					<div class="mb-4">
						<label required>Package name</label>
						<input type="text" v-model="clonedPackage.name" data-required />
					</div>
					<div class="mb-4">
						<label required>Description</label>
						<textarea class="form-control resize-none" v-model="clonedPackage.description" data-required rows="3"></textarea>
					</div>

					<div class="mb-4">
						<label required>Services</label>
						<multiselect ref="servicesEdit" v-model="clonedPackage.services" label="name" track-by="id" :options="servicesList" :showLabels="false" placeholder="" multiple>
							<template slot="singleLabel" slot-scope="{ option }">{{ option.name }}</template>
							<span slot="noResult" class="text-muted text-sm">No services found.</span>
						</multiselect>

						<div v-for="(service, index) in clonedPackage.services" :key="service.id" class="rounded-xl bg-gray-100 px-3 py-2 mt-2 flex items-center">
							<h6 class="text-sm text-primary font-semibold">{{ service.name }}</h6>
							<input type="number" class="w-1/3 ml-auto" data-required placeholder="Bookings" min="1" v-model="clonedPackage.services[index].bookings" value="1" />
						</div>
					</div>

					<div class="mb-4">
						<label required>Package Total</label>
						<input type="number" step="0.01" v-model="clonedPackage.price" placeholder="Package Price" />
					</div>
				</fieldset>
				<div class="flex items-center justify-between mt-6">
					<button class="btn btn-md btn-outline-primary" type="button" @click="$refs.editModal.hide()">
						<span>Cancel</span>
					</button>
					<button class="btn btn-md btn-primary" type="submit"><span>Update</span></button>
				</div>
			</vue-form-validate>
		</Modal>

		<Modal ref="deleteModal">
			<template v-if="selectedPackage">
				<h6 class="font-serif font-semibold mb-5 text-center">DELETE PACKAGE</h6>
				<p class="text-center mt-3">
					Are you sure to delete the package
					<strong>{{ selectedPackage.name }}</strong>
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
							deletePackage(selectedPackage);
							$refs.deleteModal.hide();
						"
					>
						<span>Delete</span>
					</button>
				</div>
			</template>
		</Modal>

		<Modal ref="addModal" :close-button="false" size="modal-lg">
			<h6 class="font-serif font-semibold mb-5">ADD PACKAGE</h6>

			<vue-form-validate @submit="submit">
				<fieldset>
					<div class="mb-4">
						<label required>Package name</label>
						<input type="text" v-model="newPackage.name" data-required />
					</div>
					<div class="mb-4">
						<label required>Description</label>
						<textarea class="form-control resize-none" v-model="newPackage.description" data-required rows="3"></textarea>
					</div>

					<div class="mb-4">
						<label required>Services</label>
						<multiselect ref="services" v-model="newPackage.services" label="name" track-by="id" :options="servicesList" :showLabels="false" placeholder="" multiple required>
							<template slot="singleLabel" slot-scope="{ option }">{{ option.name }}</template>
							<span slot="noResult" class="text-muted text-sm">No services found.</span>
						</multiselect>

						<div v-for="(service, index) in newPackage.services" :key="service.id" class="rounded-xl bg-gray-100 px-3 py-2 mt-2 flex items-center">
							<h6 class="text-sm text-primary font-semibold">{{ service.name }}</h6>
							<input type="number" min="1" max="50" class="w-1/3 ml-auto" data-required placeholder="Bookings" v-model="newPackage.services[index].bookings" value="1" />
						</div>
					</div>

					<div class="mb-4">
						<label required>Package Total</label>
						<input type="number" min="1" step="0.01" v-model="newPackage.price" data-required placeholder="Package Price" />
					</div>
				</fieldset>
				<div class="flex items-center justify-between mt-6">
					<button class="btn btn-md btn-outline-primary" type="button" @click="$refs.addModal.hide()">
						<span>Cancel</span>
					</button>
					<button class="btn btn-md btn-primary" type="submit"><span>Save</span></button>
				</div>
			</vue-form-validate>
		</Modal>
	</div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped src="./index.scss"></style>
