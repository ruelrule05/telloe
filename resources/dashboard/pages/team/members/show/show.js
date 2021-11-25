import { mapState, mapActions } from 'vuex';
import Modal from '../../../../../components/modal/modal.vue';
import CheckmarkCircleIcon from '../../../../../icons/checkmark-circle';
import MoreIcon from '../../../../../icons/more';
import ArrowLeftIcon from '../../../../../icons/arrow-left';
import ClockIcon from '../../../../../icons/clock';
import TrashIcon from '../../../../../icons/trash';
import dayjs from 'dayjs';
const IsSameOrBefore = require('dayjs/plugin/isSameOrBefore');
const IsSameOrAfter = require('dayjs/plugin/isSameOrAfter');
dayjs.extend(IsSameOrBefore);
dayjs.extend(IsSameOrAfter);
import Paginate from '../../../../../components/paginate/paginate.vue';
import VueSelect from '../../../../../components/vue-select/vue-select.vue';
const convertTime = require('convert-time');
import VCalendar from 'v-calendar';
import ToggleSwitch from '../../../../../components/toggle-switch/toggle-switch.vue';
import VueFormValidate from '../../../../../components/vue-form-validate.vue';
import VueButton from '../../../../../components/vue-button.vue';
import ZoomIcon from '../../../../../icons/zoom';
import ShortcutIcon from '../../../../../icons/shortcut';
import NoteIcon from '../../../../../icons/note';
import PencilIcon from '../../../../../icons/pencil';
import MoveIcon from '../../../../../icons/move';
import PlusIcon from '../../../../../icons/plus';
import draggable from 'vuedraggable';
import VueDropdown from '../../../../../components/vue-dropdown/vue-dropdown.vue';
import CogIcon from '../../../../../icons/cog';
import ChevronLeftIcon from '../../../../../icons/chevron-left';
import Booking from '../../../../components/Booking/Booking.vue';
import VueCheckbox from '../../../../../components/vue-checkbox/vue-checkbox.vue';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';

export default {
	components: {
		Multiselect,
		VueCheckbox,
		Booking,
		CogIcon,
		ChevronLeftIcon,
		VueDropdown,
		VCalendar,
		Modal,
		CheckmarkCircleIcon,
		MoreIcon,
		ArrowLeftIcon,
		ClockIcon,
		Paginate,
		VueSelect,
		TrashIcon,
		ToggleSwitch,
		VueFormValidate,
		VueButton,
		ZoomIcon,
		ShortcutIcon,
		NoteIcon,
		PencilIcon,
		MoveIcon,
		PlusIcon,
		draggable
	},

	data: () => ({
		addingPackage: false,
		selectedPackage: null,
		selectedPackageService: null,
		selectedService: null,
		member: null,
		clonedMember: null,
		filterServices: [],
		convertTime: convertTime,
		dayjs: dayjs,
		timeslots: [],
		newField: '',
		addField: false,
		selectedBooking: null,
		bookingModalLoading: false,
		createZoomLoading: false,
		recentNotes: [],
		editFields: false,
		new_field: {},
		serviceMembers: [],
		addingNote: false,
		newNote: '',
		selectedNote: null,
		newBooking: {
			service: null,
			service_id: null,
			date: new Date(),
			timeslot: null
		},
		orders: [
			{
				text: 'Newest',
				value: 'desc'
			},
			{
				text: 'Oldest',
				value: 'asc'
			}
		],
		order: 'desc',
		notesOrder: 'desc',
		masks: {
			input: 'MMMM D, YYYY'
		},
		newEvent: false,
		activeTab: 'notes',
		page: 1,
		packageService: null,
		contactPackageIndex: 0,
		tagOptions: [],
		resendLoading: false
	}),

	computed: {
		...mapState({
			services: state => state.services.index,
			user_custom_fields: state => state.user_custom_fields.fields,
			packages: state => state.packages.index
		}),

		availableServices() {
			return this.services.filter(service => {
				return this.member.assigned_services.find(x => x == service.id) ? false : true && service.is_available;
			});
		},

		servicesList() {
			let servicesList = [{ text: 'All', value: { id: 0 } }];
			this.services.forEach(service => {
				servicesList.push({
					text: service.name,
					value: service
				});
			});
			return servicesList;
		},

		customFields() {
			let custom_fields = [];
			(this.user_custom_fields || []).forEach(custom_field => {
				custom_fields.push({
					text: custom_field,
					value: custom_field
				});
			});
			return custom_fields;
		},

		newBookingServicesList() {
			let newBookingServicesList = [];
			if (this.newBooking.service) {
				newBookingServicesList.push({
					text: this.newBooking.service.coach.full_name,
					value: this.newBooking.service.id
				});
				this.newBooking.service.assigned_services.forEach(service => {
					newBookingServicesList.push({
						text: service.coach.full_name,
						value: service.id
					});
				});
			}
			return newBookingServicesList;
		},

		availableTimeslots() {
			let availableTimeslots = [];
			this.timeslots.forEach(timeslot => {
				if (timeslot.is_available) {
					availableTimeslots.push(timeslot);
				}
			});
			return availableTimeslots;
		}
	},

	watch: {
		page: function () {
			this.getMember();
		}
	},

	created() {
		this.getMember();
		this.getServices();
	},

	mounted() {
		let helpcrunch = document.querySelector('.helpcrunch-iframe-wrapper iframe');
		if (helpcrunch) {
			helpcrunch.style.setProperty('visibility', 'hidden');
		}
	},
	beforeDestroy: function () {
		let helpcrunch = document.querySelector('.helpcrunch-iframe-wrapper iframe');
		if (helpcrunch) {
			helpcrunch.style.setProperty('visibility', 'visible', 'important');
		}
	},

	methods: {
		...mapActions({
			getServices: 'services/index',
			storeUserCustomFields: 'user_custom_fields/store',
			showUserCustomFields: 'user_custom_fields/show',
			updateMember: 'members/update',
			deleteMember: 'members/delete',
			storeBooking: 'bookings/store',
			storeConversation: 'conversations/store',
			getPackages: 'packages/index'
		}),

		confirmDeleteMember() {
			this.deleteMember(this.member);
		},

		toggleMemberAssignedService(service) {
			let index = this.clonedMember.assigned_services.findIndex(x => x == service.id);
			if (index > -1) {
				this.clonedMember.assigned_services.splice(index, 1);
			} else {
				this.clonedMember.assigned_services.push(service.id);
			}
		},

		memberAction(action) {
			let clonedMember = JSON.parse(JSON.stringify(this.member));
			switch (action) {
				case 'Edit':
					clonedMember.assigned_services = clonedMember.assigned_services.map(x => x.parent_service_id);
					this.clonedMember = clonedMember;
					this.$refs.editModal.show();
					break;
				case 'Resend Invitation':
					this.$refs.resendModal.show();
					break;
				case 'Delete':
					this.$refs.deleteModal.show();
					break;
			}
		},

		actions() {
			let actions = ['Edit', 'Delete'];
			if (this.member.is_pending) {
				actions = ['Edit', 'Resend Invitation', 'Delete'];
			}
			return actions;
		},

		removeTag() {
			this.$nextTick(() => {
				this.updateMember(this.member);
			});
		},

		addTag(newTag) {
			let exists = this.member.tags.find(x => x == newTag);
			if (!exists) {
				this.tagOptions.push(newTag);
				this.member.tags.push(newTag);
				this.updateMember(this.member);
			}
		},

		newBookingStored(bookings) {
			bookings.forEach(booking => {
				this.member.bookings.data.unshift(booking);
			});
		},

		createNewEvent() {
			this.newEvent = true;
			this.selectedBooking = { date: dayjs().format('YYYY-MM-DD'), start: '02:00', end: '03:00' };
		},

		bookingDeleted(booking) {
			let index = this.member.bookings.data.findIndex(b => b.id == booking.id);
			if (index >= -1) {
				this.member.bookings.data.splice(index, 1);
			}
		},

		bookingUpdated(booking) {
			if (booking.id == this.selectedBooking.id) {
				this.selectedBooking.date = dayjs(booking.date).format('YYYY-MM-DD');
				this.selectedBooking.start = booking.start;
				this.selectedBooking.end = booking.end;
				this.selectedBooking.notes = booking.notes;
			}
			this.selectedBooking = null;
		},

		bookingAction(action, booking) {
			switch (action) {
				case 'Edit':
					this.selectedBooking = booking;
					break;
				case 'Delete':
					break;
			}
		},

		resetNewBooking() {
			this.newBooking = {
				service: null,
				service_id: null,
				date: new Date(),
				timeslot: null
			};
		},

		async confirmDeleteBooking(booking) {
			await this.deleteBooking(booking);
			this.getMember();
		},

		async updateSelectedBooking(selectedBooking) {
			this.bookingModalLoading = true;
			selectedBooking = JSON.parse(JSON.stringify(selectedBooking));
			selectedBooking.date = dayjs(selectedBooking.date).format('YYYY-MM-DD');
			selectedBooking.start = dayjs(selectedBooking.start).format('HH:mm');
			await this.updateBooking(selectedBooking).catch(() => {});
			this.bookingModalLoading = false;
			this.$refs['bookingModal'].hide();
			this.getMember();
		},

		editBooking(booking) {
			let selectedBooking = JSON.parse(JSON.stringify(booking));
			this.selectedBooking = selectedBooking;
			this.$refs['bookingModal'].show();
		},

		async update() {
			let member = await this.updateMember(this.clonedMember);
			this.member = member;
			this.$refs['editModal'].hide();
		},

		toggleContactServiceBlacklist(service) {
			let index = this.member.assigned_services.findIndex(x => x == service.id);
			if (index > -1) {
				this.member.assigned_services.splice(index, 1);
			} else {
				this.member.assigned_services.push(service.id);
			}
		},

		async getSelectedBookingNewTimeslots(booking, date) {
			let response = await window.axios.get(`/services/${booking.service.id}?date=${dayjs(date).format('YYYY-MM-DD')}&single=1`);
			this.timeslots = response.data;
		},

		formatDate(date) {
			return dayjs(date).format('MMM D, YYYY');
		},

		async filterBookings() {
			let serviceIds = this.selectedService ? [this.selectedService.id] : [];
			let response = await window.axios.get(`/members/${this.member.id}?page=${this.member.bookings.current_page}&services=${serviceIds}&order=${this.order}`);
			this.member.bookings = response.data.bookings;
		},

		async getData(page) {
			let response = await window.axios.get(`/members/${this.member.id}?page=${page}`);
			this.member.bookings = response.data.bookings;
		},

		async getMember() {
			let response = await window.axios.get(`/members/${this.$route.params.id}`, { params: { page: this.page } });
			let member = response.data;
			member.bookings.data.forEach(booking => {
				booking.startDate = dayjs(`${booking.date} ${booking.start}`).toDate();
			});
			this.member = member;
			let clonedMember = JSON.parse(JSON.stringify(response.data));
			this.clonedMember = clonedMember;
			this.$root.contentloading = false;
		},

		resendEmail(member) {
			this.resendLoading = true;
			window.axios.post(`/members/${member.id}/resend`).then(() => {
				this.resendLoading = false;
				this.$refs['resendModal'].hide();
				this.$toasted.show('Invitation email has been sent successfully.');
			});
		},

		toggleServiceBlacklist(service) {
			let index = this.newContact.assigned_services.findIndex(x => x == service.id);
			if (index > -1) {
				this.newContact.assigned_services.splice(index, 1);
			} else {
				this.newContact.assigned_services.push(service.id);
			}
		},

		openFile(file) {
			if (file.type == 'file') this.$root.downloadMedia(file);
			else this.selectedFile = file;
		},

		resetNewContact() {
			this.newContact = {
				custom_fields: {},
				assigned_services: []
			};
		},

		addNewField() {
			if (this.new_field.name) {
				this.new_field.is_visible = false;
				this.member.custom_fields.push(this.new_field);
				this.updateMember(this.member);
				this.new_field = {};
				this.addField = false;
			}
			this.editFields = false;
		},

		updateCustomField(index) {
			this.$root.auth.custom_fields[index] = this.editCustomField;
			this.storeUserCustomFields();
			this.$refs['customFieldsLabel'].click();
		},

		store() {
			if (this.newContact.email) {
				this.storeContact(this.newContact).then(() => {
					this.newContact = {
						custom_fields: {},
						assigned_services: [],
						sendToEmail: 1
					};
				});
				this.infoTab = '';
			}
		}
	}
};
