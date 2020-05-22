<template>
	<div class="px-3 pt-2 pb-3 h-100 d-flex flex-column">
		
		<div class="pb-3">
			<button class="btn btn-tab font-heading px-0" :class="{'tab-active': tab == 'calendar'}" @click="tab = 'calendar'">Calendar</button>
			<button class="btn btn-tab font-heading px-0 ml-3" :class="{'tab-active': tab == 'services'}" @click="tab = 'services'">Services</button>
		</div>
		
		<div class="flex-grow-1 row">
			

			<template v-else-if="tab == 'services'">
					<div class="col-md-12">
						<services></services>
					</div>
			</template>
		</div>
	</div>
</template>

<style lang="scss" src="./bookings.scss"></style>
<script src="./bookings.js"></script>