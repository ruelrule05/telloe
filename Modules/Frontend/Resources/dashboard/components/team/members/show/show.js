import { mapState, mapActions } from 'vuex';
import ArrowLeftIcon from '../../../../../icons/arrow-left';
import ClockIcon from '../../../../../icons/clock';
import CheckmarkCircleIcon from '../../../../../icons/checkmark-circle';
import MoreIcon from '../../../../../icons/more';
import ToggleSwitch from '../../../../../components/toggle-switch/toggle-switch.vue';
import Modal from '../../../../../components/modal/modal.vue';
import VueFormValidate from '../../../../../components/vue-form-validate.vue';
import Paginate from '../../../../../components/paginate/paginate.vue';
import dayjs from 'dayjs';
const convertTime = require('convert-time');
import VueSelect from '../../../../../components/vue-select/vue-select.vue';
const IsSameOrBefore = require('dayjs/plugin/isSameOrBefore');
const IsSameOrAfter = require('dayjs/plugin/IsSameOrAfter');
dayjs.extend(IsSameOrBefore);
dayjs.extend(IsSameOrAfter);
import VueButton from '../../../../../components/vue-button.vue';
import VCalendar from 'v-calendar';
window.Vue.use(VCalendar);
import ZoomIcon from '../../../../../icons/zoom';
import ShortcutIcon from '../../../../../icons/shortcut';

export default {
	components: {
		ArrowLeftIcon,
		ClockIcon,
		CheckmarkCircleIcon,
		ToggleSwitch,
		MoreIcon,
		Modal,
		VueFormValidate,
		Paginate,
		VueSelect,
		VueButton,
		ZoomIcon,
		ShortcutIcon
	},

	data: () => ({
		member: null,
		convertTime: convertTime,
		clonedMember: null,
		filterServices: [],
		selectedBooking: null,
		dayjs: dayjs,
		timeslots: [],
		bookingModalLoading: false,
		createZoomLoading: false,
		serviceMembers: []
	}),

	computed: {
		...mapState({
			services: state => state.services.index
		}),

		servicesList() {
			let servicesList = [];
			this.member.assigned_services.forEach(service => {
				servicesList.push({
					text: service.name,
					value: service
				});
			});
			return servicesList;
		}
	},

	watch: {
		selectedBooking: function(value) {
			this.getServiceMembers(value);
		}
	},

	created() {
		this.getServices();
		this.getMember();
	},

	mounted() {
		if (this.$root.intros.members_show.enabled) {
			setTimeout(() => {
				if (!document.querySelector('.introjs-overlay')) {
					this.$root.intros.members_show.intro.start();
				}
			}, 500);
		}
	},

	methods: {
		...mapActions({
			getServices: 'services/index',
			storeMemberService: 'members/store_service',
			updateMember: 'members/update',
			deleteMember: 'members/delete',
			updateService: 'services/update',
			deleteService: 'services/delete',
			updateBooking: 'bookings/update',
			deleteBooking: 'bookings/delete'
		}),

		confirmDeleteBooking(booking) {
			this.deleteBooking(booking);
			let index = this.member.bookings.data.findIndex(x => x.id == booking.id);
			if (index > -1) {
				this.member.bookings.data.splice(index, 1);
			}
		},

		getServiceMembers(booking) {
			if (booking) {
				let serviceMembers = [];
				if (booking.service.parent_service) {
					serviceMembers.push({
						text: this.$root.auth.full_name,
						value: booking.service.parent_service_id
					});
					booking.service.parent_service.assigned_services.forEach(assignedService => {
						serviceMembers.push({
							text: assignedService.coach.full_name,
							value: assignedService.id
						});
					});
				} else {
					serviceMembers.push({
						text: this.$root.auth.full_name,
						value: booking.service_id
					});
					booking.service.assigned_services.forEach(assignedService => {
						serviceMembers.push({
							text: assignedService.coach.full_name,
							value: assignedService.id
						});
					});
				}
				this.serviceMembers = serviceMembers;
			}
		},

		async updateSelectedBooking(booking) {
			this.bookingModalLoading = true;
			booking = JSON.parse(JSON.stringify(booking));
			booking.date = dayjs(booking.date).format('YYYY-MM-DD');
			booking.start = dayjs(booking.start).format('HH:mm');
			let updatedBooking = await this.updateBooking(booking).catch(() => {});
			if (updatedBooking) {
				let index = this.member.bookings.data.findIndex(x => x.id == updatedBooking.id);
				if (index > -1) {
					this.$set(this.member.bookings.data, index, updatedBooking);
				}
				await this.getMember();
				this.$refs['bookingModal'].hide();
			}
			this.bookingModalLoading = false;
		},

		async createZoomLink(booking) {
			this.createZoomLoading = true;
			if (this.$root.auth.zoom_token) {
				let response = await window.axios.get(`/zoom/create_meeting?booking_id=${booking.id}`);
				this.createZoomLoading = false;

				let index = this.member.bookings.data.findIndex(x => x.id == booking.id);
				if (index > -1) {
					booking.zoom_link = response.data;
					this.$set(this.member.bookings.data[index], 'zoom_link', response.data);
				}
			}
		},

		editBooking(booking) {
			let selectedBooking = JSON.parse(JSON.stringify(booking));
			selectedBooking.start = dayjs(`${selectedBooking.date} ${selectedBooking.start}`).toDate();
			selectedBooking.isPrevious = dayjs(new Date()).isSameOrAfter(dayjs(selectedBooking.start));
			this.selectedBooking = selectedBooking;
			this.getSelectedBookingNewTimeslots(selectedBooking.date);
			this.$refs['bookingModal'].show();
		},

		filterAvailableTimeslots(timeslots) {
			return timeslots.filter(x => x.is_available);
		},

		async getSelectedBookingNewTimeslots(date) {
			let response = await window.axios.get(`/services/${this.selectedBooking.service.id}?date=${dayjs(date).format('YYYY-MM-DD')}&single=1`);
			this.timeslots = response.data;
		},

		async filterByServices(services) {
			let serviceIds = services.map(x => x.id);
			let response = await window.axios.get(`/members/${this.member.id}?page=${this.member.bookings.current_page}&services=${serviceIds}`);
			this.member.bookings = response.data.bookings;
		},

		async getData(page) {
			let response = await window.axios.get(`/members/${this.member.id}?page=${page}`);
			this.member.bookings = response.data.bookings;
		},

		toggleMemberAssignedService(service) {
			let index = this.clonedMember.assigned_services.findIndex(x => x == service.id);
			if (index > -1) {
				this.clonedMember.assigned_services.splice(index, 1);
			} else {
				this.clonedMember.assigned_services.push(service.id);
			}
		},

		async update() {
			let member = await this.updateMember(this.clonedMember);
			this.member = member;
			this.$refs['editModal'].hide();
		},

		formatDate(date) {
			return dayjs(date).format('MMMM D, YYYY');
		},

		async memberToggleManageBookings(value, service) {
			service.manage_bookings = value;
			this.updateService(service);
		},

		async memberToggleAssignedService(value, service) {
			this.$set(service, 'is_loading', true);
			let assigned_service = this.member.services.find(x => x.parent_service_id == service.id);

			if (assigned_service && !assigned_service.deleted_at) {
				await this.deleteService(assigned_service);
				assigned_service.deleted_at = 'deleted';
			} else {
				let data = {
					id: this.member.id,
					service_id: service.id
				};
				await this.storeMemberService(data).then(() => {
					if (assigned_service) assigned_service.deleted_at = null;
				});
			}
			this.$set(service, 'is_loading', false);
		},

		async getMember() {
			let response = await window.axios.get(`/members/${this.$route.params.id}`);
			this.member = response.data;
			let clonedMember = JSON.parse(JSON.stringify(response.data));
			clonedMember.assigned_services = clonedMember.assigned_services.map(x => x.parent_service_id);
			this.clonedMember = clonedMember;
			this.$root.contentloading = false;
		}
	}
};
