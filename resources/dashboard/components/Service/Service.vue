<template>
	<div>
		<vue-form-validate v-if="clonedService" class="flex min-h-screen flex-col" @submit="update">
			<div class="content-header border-bottom">
				<span v-if="createService">CREATE EVENT TYPE</span>
				<span v-else> EDITING: {{ service.name }}</span>
				<div class="ml-auto">
					<button type="button" class="btn btn-md btn-outline-primary" @click="$emit('close')">
						<span>Cancel</span>
					</button>
					<button v-if="$root.auth.is_premium || !createService" type="submit" class="btn btn-md btn-primary">
						<span>{{ createService ? 'Create' : 'Save' }}</span>
					</button>
				</div>
			</div>

			<div v-if="createService && !$root.auth.is_premium && servicesCount > 0">
				<div class="absolute-center p-6 bg-secondary rounded-xl flex items-start w-4/12">
					<div class="pl-4 -mt-1">
						<p class="font-bold text-sm">Please upgrade your account to create more event types.</p>
						<button type="button" class="btn btn-outline-primary btn-md mt-4" @click="goToPlans()"><span>View Plans</span></button>
					</div>
				</div>
			</div>

			<div v-else class="flex flex-grow">
				<div class="sidebar border-right px-6">
					<div v-for="(menu, menuIndex) in menus" :key="menuIndex" class="sidebar-menu-item" :class="{ active: activeMenu == menu }" @click="activeMenu = menu">{{ menu }}</div>
				</div>
				<div class="flex-grow p-6">
					<!-- General Settings -->
					<div v-show="activeMenu == 'General Settings'">
						<div class="font-serif uppercase font-semibold text-xs mb-10">{{ activeMenu }}</div>
						<div class="w-6/12">
							<div class="mb-5">
								<label required>Name</label>
								<input type="text" v-model="clonedService.name" data-required />
							</div>
							<div class="mb-5">
								<label required>Description</label>
								<textarea rows="6" v-model="clonedService.description" data-required class="resize-none"></textarea>
							</div>
							<div class="mb-5">
								<label required>Meeting length (in minutes)</label>
								<input type="number" min="5" max="360" v-model="clonedService.duration" data-required />
							</div>
							<div>
								<label required>Time gap between meetings (in minutes)</label>
								<input type="number" min="5" v-model="clonedService.interval" data-required />
							</div>
						</div>
						<div class="font-serif uppercase font-semibold text-xs mt-10">MEETING TYPE</div>
						<template v-if="clonedService.types">
							<div v-for="(type, typeIndex) in clonedService.types" class="mt-6" :key="typeIndex">
								<div class="text-muted text-sm mb-1">Type of meeting</div>
								<div class="flex">
									<div class="w-6/12 rounded-md border overflow-hidden">
										<div class="py-2 px-4">
											{{ type.type }}
										</div>
										<div v-if="type.type == 'Face-to-face'" class="p-4 bg-gray-100 border-top">
											<label required class="text-muted text-sm mb-1">Location/details</label>
											<input type="text" v-model="type.data" placeholder="Location/details.." data-required />
										</div>

										<div v-else-if="type.type == 'Zoom'" class="p-4 bg-gray-100 border-top">
											<label required class="text-muted text-sm mb-1">Zoom meeting link</label>
											<input type="text" v-model="type.data" placeholder="Zoom meeting link.." data-required />
										</div>

										<div v-else-if="type.type == 'Phone' || type.type == 'Skype'" class="text-muted text-sm  px-4 pb-2">{{ type.type }} will be data-required before placing a booking.</div>

										<div v-else-if="type.type == 'Telloe Video Call'" class="text-muted text-sm  px-4 pb-2">A conversation will be created for the video call.</div>

										<div v-else class="text-muted text-sm  px-4 pb-2">{{ type.type }} link will be created for each booking.</div>
									</div>
									<div class="pl-2">
										<button class="focus:outline-none rounded-full p-2 border text-gray-400 transition-colors hover:bg-gray-400 hover:text-white" type="button" @click="clonedService.types.splice(typeIndex, 1)"><CloseIcon class="fill-current"></CloseIcon></button>
									</div>
								</div>
							</div>
						</template>
						<div class="relative mt-6">
							<VueDropdown :options="types" drop-position="top" @click="selectType" ref="meetingTypes">
								<template #button>
									<div class="btn cursor-pointer btn-md btn-outline-primary inline-flex items-center"><PlusIcon class="stroke-current mr-2"></PlusIcon><span>Add Type</span></div>
								</template>
							</VueDropdown>
						</div>
					</div>

					<!-- Availability -->
					<div v-if="mounted" v-show="activeMenu == 'Availability'">
						<div class="w-8/12">
							<div class="flex justify-between">
								<div class="font-serif uppercase font-semibold text-xs mb-10">{{ activeMenu }}</div>
								<span v-if="activeMenu == 'Availability'" class="text-muted text-sm">Select your available timeslots.</span>
							</div>
							<div v-for="day in days" :key="day" class="mb-16">
								<div class="flex justify-between">
									<div class="font-semibold text-muted uppercase text-xs font-serif">{{ day }}</div>
									<div>
										<div class="flex items-center">
											<span v-if="clonedService.days[day].isOpen" class="text-xs mr-2">Enabled</span>
											<toggle-switch class="ml-auto" v-model="clonedService.days[day].isOpen"></toggle-switch>
										</div>
									</div>
								</div>
								<div class="flex">
									<div class="w-1/2 pr-6">
										<label>Available Time</label>
										<timerangepicker no-label hide-clear-button @change="availableTimeChange($event, day)" :start="clonedService.days[day].start" :end="clonedService.days[day].end" class="mb-2"></timerangepicker>
									</div>
									<div class="w-1/2 pl-6">
										<label>Break Time</label>
										<timerangepicker no-label @change="breaktimeChange($event, day)" :start="clonedService.days[day].breaktimeStart" :end="clonedService.days[day].breaktimeEnd" class="mb-2"></timerangepicker>
									</div>
								</div>
							</div>
						</div>
					</div>

					<!-- Advanced -->
					<div v-show="activeMenu == 'Advanced'">
						<div class="font-serif uppercase font-semibold text-xs mb-10">{{ activeMenu }}</div>
						<div class="w-9/12">
							<div class="mb-5">
								<vue-checkbox v-model="clonedService.in_widget" label="Available in widget"></vue-checkbox>
							</div>
							<div class="mb-5">
								<vue-checkbox :disabled="!$root.auth.zoom_token" v-model="clonedService.create_zoom_link" label="Create Zoom link on booking"></vue-checkbox>
							</div>
							<vue-checkbox v-model="clonedService.require_payment" label="Require payment on booking"></vue-checkbox>

							<div class="my-4">
								<label>Starts At</label>
								<v-date-picker :min-date="new Date()" :max-date="clonedService.ends_at || null" :popover="{ placement: 'bottom', visibility: 'click' }" v-model="clonedService.starts_at" :masks="masks">
									<template v-slot="{ inputValue, inputEvents }">
										<input type="text" class="w-1/3" readonly v-on="inputEvents" :placeholder="clonedService.starts_at ? dayjs(clonedService.starts_at).format('MMMM D, YYYY') : ''" :value="inputValue" />
									</template>
								</v-date-picker>
							</div>
							<div class="mb-4">
								<label>Ends At</label>
								<v-date-picker :min-date="clonedService.starts_at || new Date()" :popover="{ placement: 'bottom', visibility: 'click' }" v-model="clonedService.ends_at" :masks="masks">
									<template v-slot="{ inputValue, inputEvents }">
										<input type="text" class="w-1/3" readonly v-on="inputEvents" :placeholder="clonedService.ends_at ? dayjs(clonedService.ends_at).format('MMMM D, YYYY') : ''" :value="inputValue" />
									</template>
								</v-date-picker>
							</div>
							<div>
								<label>Timezone</label>
								<VueSelect class="w-1/3" :required="activeMenu == 'Advanced'" :options="availableTimezones" drop-position="top" searchable v-model="clonedService.timezone" placeholder="Select timezone"></VueSelect>
							</div>
						</div>
					</div>

					<!-- Payment -->
					<div v-show="activeMenu == 'Payment'">
						<div class="font-serif uppercase font-semibold text-xs mb-10">{{ activeMenu }}</div>
						<div class="w-5/12">
							<div class="flex items-center">
								<div class="flex-grow-1 pr-2 w-1/2">
									<label class="form-label">Default Rate</label>
									<input type="number" step="0.01" min="0.00" class="form-control" v-model="clonedService.default_rate" placeholder="$0.00" />
								</div>
								<div class="flex-grow-1 pl-2 w-1/2">
									<label class="form-label" data-required>Currency</label>
									<vue-select v-model="clonedService.currency" button_class="form-control" :options="currencies" data-required placeholder="Select currency"></vue-select>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</vue-form-validate>
	</div>
</template>

<script src="./Service.js"></script>

<style lang="scss" scoped src="./Service.scss"></style>
