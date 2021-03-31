<template>
	<div>
		<vue-form-validate class="flex min-h-screen flex-col" v-if="clonedService" @submit="update">
			<div class="content-header border-bottom">
				EDITING: {{ service.name }}
				<div class="ml-auto">
					<button type="button" class="btn btn-md btn-outline-primary" @click="$emit('close')">
						<span>Cancel</span>
					</button>
					<button type="submit" class="btn btn-md btn-primary">
						<span>Save</span>
					</button>
				</div>
			</div>

			<div class="flex flex-grow">
				<div class="sidebar border-right px-6">
					<div v-for="(menu, menuIndex) in menus" :key="menuIndex" class="sidebar-menu-item" :class="{ active: activeMenu == menu }" @click="activeMenu = menu">{{ menu }}</div>
				</div>
				<div class="flex-grow p-6">
					<!-- General Settings -->
					<div v-show="activeMenu == 'General Settings'">
						<div class="font-serif uppercase font-semibold text-xs mb-10">{{ activeMenu }}</div>
						<div class="w-6/12">
							<div class="mb-5">
								<label>Name</label>
								<input type="text" v-model="clonedService.name" required />
							</div>
							<div class="mb-5">
								<label>Description</label>
								<textarea rows="6" v-model="clonedService.description" required class="resize-none"></textarea>
							</div>
							<div class="mb-5">
								<label>Duration</label>
								<input type="number" v-model="clonedService.duration" required />
							</div>
							<div>
								<label>Interval</label>
								<input type="number" v-model="clonedService.interval" required />
							</div>
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
							<div class="mb-5 flex items-center">
								<vue-checkbox v-model="clonedService.ask_skype" label="Ask for Skype ID in booking"></vue-checkbox>
								<div class="ml-auto flex items-center">
									<span v-if="clonedService.ask_skype" class="text-xs mr-2">Required</span>
									<toggle-switch :disabled="!clonedService.ask_skype" v-model="clonedService.require_skype"></toggle-switch>
								</div>
							</div>
							<div class="mb-5 flex items-center">
								<vue-checkbox v-model="clonedService.ask_phone" label="Ask for phone number in booking"></vue-checkbox>
								<div class="ml-auto flex items-center">
									<span v-if="clonedService.require_phone" class="text-xs mr-2">Required</span>
									<toggle-switch :disabled="!clonedService.ask_phone" v-model="clonedService.require_phone"></toggle-switch>
								</div>
							</div>
							<div class="mb-5">
								<vue-checkbox v-model="clonedService.in_widget" label="Available in widget"></vue-checkbox>
							</div>
							<div class="mb-5">
								<vue-checkbox :disabled="!$root.auth.zoom_token" v-model="clonedService.create_zoom_link" label="Create Zoom link on booking"></vue-checkbox>
							</div>
							<vue-checkbox v-model="clonedService.require_payment" label="Require payment on booking"></vue-checkbox>
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
									<label class="form-label">Currency</label>
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
