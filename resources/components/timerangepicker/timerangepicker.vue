<template>
	<div>
		<div class="d-flex align-items-stretch">
			<div class="w-50 pr-2">
				<label>From</label>
				<div class="w-100 dropdown">
					<button class="form-control text-left d-flex align-items-center justify-content-between" data-toggle="dropdown" :class="{ 'text-gray': !time_start }" type="button">{{ time_start ? time_start.label : 'Set time' }} <chevron-down-icon class="mr-n2"></chevron-down-icon></button>
					<div class="dropdown-menu w-100 px-1 overflow-auto bg-light" ref="dropdown-start">
						<div v-if="startHours.length == 0" class="text-gray  small font-weight-light line-height-sm">There are no hours available</div>
						<div v-else class="d-flex flex-wrap">
							<div v-for="(hour, hourIndex) in startHours" :key="hourIndex" class="w-50 p-1">
								<button
									:id="`start-${hour.time.replace(':', '')}`"
									class="btn btn-white btn-sm btn-block p-1 border"
									type="button"
									:class="{ active: time_start == hour }"
									@click="
										time_start = hour;
										update();
									"
								>
									{{ hour.label }}
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="w-50 pl-2">
				<label>To</label>
				<div class="w-100 dropdown">
					<button class="form-control text-left d-flex align-items-center justify-content-between" data-toggle="dropdown" :class="{ 'text-gray': !time_end }" type="button">{{ time_end ? time_end.label : 'Set time' }} <chevron-down-icon class="mr-n2"></chevron-down-icon></button>
					<div class="dropdown-menu w-100 px-1 overflow-auto bg-light" ref="dropdown-end">
						<div v-if="endHours.length == 0" class="text-gray text-center small font-weight-light line-height-sm">There are no hours available</div>
						<div v-else class="d-flex flex-wrap">
							<div v-for="(hour, endHourIndex) in endHours" :key="endHourIndex" class="w-50 p-1">
								<button
									:id="`end-${hour.time.replace(':', '')}`"
									class="btn btn-white btn-sm btn-block p-1 border"
									:class="{ active: time_end == hour }"
									type="button"
									@click="
										time_end = hour;
										update();
									"
								>
									{{ hour.label }}
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script src="./timerangepicker.js"></script>
<style scoped lang="scss" src="./timerangepicker.scss"></style>
