<template>
	<div class="row h-100">
		<div v-if="ready" class="col-md-12 h-100 d-flex flex-column">
			<div class="border-bottom bg-white px-3 py-4">
				<h5 class="font-heading mb-0">Packages</h5>
			</div>

			<div v-if="packages.length == 0" class="py-5 text-center p-2 position-absolute-center">
				<h6 class="text-grayer mb-3 font-weight-light h5 text-secondary">
					You don't have any packages added yet
				</h6>
				<button
					class="btn btn-primary"
					@click="
						newPackage = {};
						$refs['addModal'].show();
					"
				>
					Add Package
				</button>
			</div>

			<div v-else class="d-flex flex-grow-1 overflow-hidden">
				<div class="flex-grow-1 py-4 overflow-auto container">
					<div class="row px-2">
						<div class="col-md-4 px-2" v-for="(packageItem, index) in packages" :key="packageItem.id">
							<div class="px-1 mb-4">
								<router-link :data-intro="index == 0 ? $root.intros.packages_index.steps[0] : null" :data-step="index == 0 ? 1 : null" :to="`/dashboard/packages/${packageItem.id}`" tag="div" class="card rounded service p-3 shadow-sm w-100 overflow-hidden cursor-pointer" :class="{ active: packageItem.is_available }">
									<div class="package-buttons position-absolute d-flex align-items-center">
										<div class="dropdown ml-2" @click.prevent>
											<button class="btn btn-sm btn-white bg-white p-1 line-height-0 shadow-none" type="button" data-toggle="dropdown" data-offset="-132, 0" :data-intro="index == 0 ? $root.intros.packages_index.steps[1] : null" :data-step="index == 0 ? 2 : null">
												<more-icon width="20" height="20" class="fill-gray-500" transform="scale(1.3)"></more-icon>
											</button>

											<div class="dropdown-menu">
												<div class="d-flex align-items-center px-2 py-1">
													<span>Available</span>
													<toggle-switch class="ml-auto" @click.native.stop @input="updatePackage(packageItem)" active-class="bg-primary" v-model="packageItem.is_available"></toggle-switch>
												</div>
												<span class="dropdown-item d-flex align-items-center px-2 cursor-pointer" @click="edit(packageItem, index)">Edit</span>
												<span
													class="dropdown-item d-flex align-items-center px-2 cursor-pointer"
													@click="
														selectedPackage = packageItem;
														$refs['deleteModal'].show();
													"
												>
													Delete
												</span>
											</div>
										</div>
									</div>
									<div class="mb-1">
										<h5 class="font-heading mb-0">
											{{ packageItem.name }}
										</h5>
									</div>
									<p class="text-muted mb-0 multiline-ellipsis xsmall mb-3">
										{{ packageItem.description }}
									</p>
									<div class="d-flex align-items-center">
										<package-icon width="17" height="17" fill="#888"></package-icon>
										<span class="ml-2">{{ packageItem.services.length }} services</span>
									</div>
									<div class="d-flex align-items-center mt-2">
										<coin-icon width="17" height="17" fill="#888"></coin-icon>
										<span class="ml-2">${{ parseFloat(packageItem.price).toFixed(2) }}</span>
									</div>
									<div class="d-flex align-items-center mt-2">
										<calendar-icon width="17" height="17" fill="#888"></calendar-icon>
										<span class="ml-2">Expires on {{ formatDate(packageItem.expiration_date) }}</span>
									</div>
								</router-link>
							</div>
						</div>

						<div class="col-md-4 px-2">
							<div class="position-relative h-100">
								<div class="h-100 position-relative pb-4">
									<div class="px-1 h-100">
										<button
											:data-intro="$root.intros.packages_index.steps[2]"
											class="py-5 btn btn-light btn-add btn-lg shadow-none w-100 h-100 text-muted"
											type="button"
											@click="
												newService = {};
												$refs['addModal'].show();
											"
										>
											<div class="d-flex align-items-center py-4 justify-content-center">
												<plus-icon class="fill-gray"></plus-icon>
												Add Package
											</div>
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<modal ref="editModal" :close-button="false" size="modal-lg">
			<h5 class="font-heading mb-3">Edit Package</h5>
			<vue-form-validate @submit="update" v-if="clonedPackage">
				<div class="row mx-0 mb-2">
					<div class="col-md-6 pl-0">
						<fieldset>
							<div class="form-group">
								<label class="form-label">Package name</label>
								<input type="text" class="form-control" v-model="clonedPackage.name" data-required />
							</div>
							<div class="form-group">
								<label class="form-label">Description</label>
								<textarea class="form-control resize-none" v-model="clonedPackage.description" data-required rows="3"></textarea>
							</div>

							<div class="form-group">
								<label class="form-label">Expires on</label>
								<v-date-picker :min-date="new Date()" :popover="{ placement: 'bottom', visibility: 'click' }" v-model="clonedPackage.expiration_date">
									<template v-slot="{ inputValue, inputEvents }">
										<div type="button" class="form-control" v-on="inputEvents">
											<span v-if="inputValue">{{ formatDate(inputValue) }}</span>
											<span v-else class="text-muted font-weight-normal">Set expiration date</span>
										</div>
									</template>
								</v-date-picker>
							</div>

							<div class="form-group">
								<label class="form-label">Package Total</label>
								<input type="number" step="0.01" class="form-control" v-model="clonedPackage.price" placeholder="Package Price" />
							</div>
						</fieldset>
					</div>
					<div class="col-md-6 border-left pr-0 border-gray-200">
						<h6 class="font-heading">Services</h6>
						<vue-select v-model="clonedPackage.services" :options="servicesList" multiple data-required placeholder="Select service"></vue-select>
						<div v-for="(service, index) in clonedPackage.services" :key="service.id" class="rounded bg-light px-3 py-2 mt-2 d-flex align-items-center">
							<h6 class="mb-1">{{ service.name }}</h6>
							<input type="number" class="form-control w-25 ml-auto" data-required placeholder="Bookings" min="1" v-model="clonedPackage.services[index].bookings" value="1" />
						</div>
					</div>
				</div>
				<div class="form-group">
					<vue-checkbox v-model="clonedPackage.in_widget" label="Available in widget"></vue-checkbox>
				</div>
				<div class="d-flex align-items-center">
					<button class="btn btn-light shadow-none" type="button" data-dismiss="modal">
						Cancel
					</button>
					<button class="ml-auto btn btn-primary" type="submit">Update</button>
				</div>
			</vue-form-validate>
		</modal>

		<modal ref="deleteModal" :close-button="false">
			<template v-if="selectedPackage">
				<h5 class="font-heading text-center">Delete Service</h5>
				<p class="text-center mt-3">
					Are you sure to delete the package
					<strong>{{ selectedPackage.name }}</strong>
					?
					<br />
					<span class="text-danger">This action cannot be undone</span>
				</p>
				<div class="d-flex">
					<button class="btn btn-light shadow-none" type="button" data-dismiss="modal">
						Cancel
					</button>
					<button
						class="btn btn-danger ml-auto"
						type="button"
						@click="
							deletePackage(selectedPackage);
							$refs['deleteModal'].hide();
						"
					>
						Delete
					</button>
				</div>
			</template>
		</modal>

		<modal ref="addModal" :close-button="false" size="modal-lg">
			<h5 class="font-heading mb-3">Add Package</h5>
			<vue-form-validate @submit="submit">
				<div class="row mx-0 mb-2">
					<div class="col-md-6 pl-0">
						<div class="form-group">
							<label class="form-label">Package Name</label>
							<input type="text" class="form-control" v-model="newPackage.name" data-required />
						</div>

						<div class="form-group">
							<label class="form-label">Description</label>
							<textarea type="text" class="form-control resize-none" rows="4" v-model="newPackage.description" data-required></textarea>
						</div>

						<div class="form-group">
							<label class="form-label">Expires on</label>
							<v-date-picker :min-date="new Date()" :popover="{ placement: 'bottom', visibility: 'click' }" v-model="newPackage.expiration_date">
								<template v-slot="{ inputValue, inputEvents }">
									<div type="button" class="form-control" v-on="inputEvents">
										<span v-if="inputValue">{{ formatDate(inputValue) }}</span>
										<span v-else class="text-muted font-weight-normal">Set expiration date</span>
									</div>
								</template>
							</v-date-picker>
						</div>

						<div class="form-group">
							<label class="form-label">Package Total</label>
							<input type="number" class="form-control" data-required placeholder="Package Price" min="1" v-model="newPackage.price" />
						</div>
					</div>

					<div class="col-md-6 border-left pr-0 border-gray-200">
						<h6 class="font-heading">Services</h6>
						<vue-select v-model="newPackage.services" :options="servicesList" button_class="form-control" multiple data-required placeholder="Select service"></vue-select>
						<div v-for="(service, index) in newPackage.services" :key="service.id" class="rounded bg-light p-3 mt-2 d-flex align-items-center">
							<h6 class="mb-1">{{ service.name }}</h6>
							<input type="number" class="form-control w-25 ml-auto" data-required placeholder="Bookings" min="1" v-model="newPackage.services[index].bookings" value="1" />
						</div>
					</div>
				</div>

				<div class="d-flex align-items-center mt-4">
					<button class="btn btn-light shadow-none mr-1" type="button" data-dismiss="modal">
						Cancel
					</button>
					<button class="ml-auto btn btn-primary" type="submit">Add</button>
				</div>
			</vue-form-validate>
		</modal>
	</div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped src="./index.scss"></style>
