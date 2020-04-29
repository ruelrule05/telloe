<template>
	<div class="p-3 row h-100">
		<div class="col-md-9">
			<div class="bg-white rounded shadow-sm h-100 p-4">
				<div class="h-100">
					<FullCalendar :events="events" defaultView="dayGridMonth" :plugins="calendarPlugins" height="parent"></FullCalendar>
				</div>
			</div>
		</div>
		
		<div class="col-md-3 overflow-auto">
			<div class="bg-white rounded shadow-sm h-100 p-3">
  				<business-hours :switchWidth="70" type="select" :days="days" color="#4d65e5"></business-hours>
			</div>
		</div>
	</div>
</template>


<script>
	import FullCalendar from '@fullcalendar/vue';
	import dayGridPlugin from '@fullcalendar/daygrid';
	import BusinessHours from '../vue-business-hours/BusinessHours';
	export default {
		components: {FullCalendar, BusinessHours},

		data: () => ({
			events: [
				{
					title : 'Sunny Out of Office',
				    start : '2020-04-29',
				    end : '2020-04-29',
				}
			],
			calendarPlugins: [ dayGridPlugin ],
			days: {
				sunday: [
				    {
				      open: '0800',
				      close: '1700',
				      id: 'sunday',
				      isOpen: true
				    }
				  ],
				monday: [
				    {
				      open: '',
				      close: '',
				      id: 'monday',
				      isOpen: true
				    }
				  ],
			}
		}),

		computed: {
		},

		created() {
			this.$root.heading = 'Bookings';
		},

		mounted() {
			this.$root.contentloading = false;
		},

		methods: {
		}
	}
</script>

<style lang="scss">
@import '~@fullcalendar/core/main.css';
@import '~@fullcalendar/daygrid/main.css';
</style>