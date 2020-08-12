<template>
	<div>
		<div class="d-flex align-items-stretch">
			<div class="rounded border w-50 mr-1 flex-grow-1">
				<div class="position-relative dropdown d-flex align-items-stretch" ref="start">
					<div class="text-gray p-2 label">From</div>
					<div class="w-100 position-static">
						<button class="btn btn-white shadow-none border-0 h-100 btn-block" data-toggle="dropdown" data-offset="-50,0" :class="{'text-gray': !time_start}">{{ time_start ? time_start.label : 'Set time' }}</button>
						<div class="dropdown-menu w-100 px-1 overflow-auto bg-light" ref="dropdown-start">
							<div v-if="startHours.length == 0" class="text-gray text-center small font-weight-light line-height-sm">There are no hours available</div>
							<div v-else class="d-flex flex-wrap">
								<div v-for="hour in startHours" class="w-50 p-1">
									<button :id="`start-${hour.time.replace(':', '')}`" class="btn btn-white btn-sm btn-block p-1 border" :class="{'active': time_start == hour}" @click="time_start = hour; update()">
										{{ hour.label }}
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="rounded border w-50 mr-1 flex-grow-1">
				<div class="position-relative dropdown d-flex align-items-stretch" ref="end">
					<div class="text-gray p-2 label">To</div>
					<div class="w-100 position-static">
						<button class="btn btn-white shadow-none border-0 h-100 btn-block" data-toggle="dropdown" data-display="static" :class="{'text-gray': !time_end}">{{ time_end ? time_end.label : 'Set time' }}</button>
						<div class="dropdown-menu w-100 px-1 overflow-auto bg-light" ref="dropdown-end">
							<div v-if="endHours.length == 0" class="text-gray text-center small font-weight-light line-height-sm">There are no hours available</div>
							<div v-else class="d-flex flex-wrap">
								<div v-for="hour in endHours" class="w-50 p-1">
									<button :id="`end-${hour.time.replace(':', '')}`" class="btn btn-white btn-sm btn-block p-1 border" :class="{'active': time_end == hour}" @click="time_end = hour; update()">
										{{ hour.label }}
									</button>
								</div>
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