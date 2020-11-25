import { mapState, mapActions } from 'vuex';
import Modal from '../../../../components/modal/modal.vue';
import CheckmarkCircleIcon from '../../../../icons/checkmark-circle';
import MoreIcon from '../../../../icons/more';
import ArrowLeftIcon from '../../../../icons/arrow-left';
import ClockIcon from '../../../../icons/clock';
import TrashIcon from '../../../../icons/trash';
import dayjs from 'dayjs';
const IsSameOrBefore = require('dayjs/plugin/isSameOrBefore');
const IsSameOrAfter = require('dayjs/plugin/IsSameOrAfter');
dayjs.extend(IsSameOrBefore);
dayjs.extend(IsSameOrAfter);
import Paginate from '../../../../components/paginate/paginate.vue';
import VueSelect from '../../../../components/vue-select/vue-select.vue';
const convertTime = require('convert-time');
import VCalendar from 'v-calendar';
Vue.use(VCalendar);
import ToggleSwitch from '../../../../components/toggle-switch/toggle-switch.vue';
import VueFormValidate from '../../../../components/vue-form-validate.vue';
import VueButton from '../../../../components/vue-button.vue';
import ZoomIcon from '../../../../icons/zoom';
import ShortcutIcon from '../../../../icons/shortcut';
import NoteIcon from '../../../../icons/note';
import PencilIcon from '../../../../icons/pencil';
import MoveIcon from '../../../../icons/move';
import draggable from 'vuedraggable';

export default {
	components: {
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
		MoveIcon
	},

	data: () => ({
		contact: null,
		clonedContact: null,
		filterServices: [],
		convertTime: convertTime,
		dayjs: dayjs,
		timeslots: [],
		newField: '',
		addField: false,
		selectedBooking: null,
		timeslots: [],
		bookingModalLoading: false,
		createZoomLoading: false,
		recentNotes: [],
		editFields: false,
		addField: false,
		new_field: {},
		serviceMembers: []
	}),

	computed: {
		...mapState({
			services: state => state.services.index
		}),

		servicesList() {
			let servicesList = [];
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
			(this.$root.auth.custom_fields || []).forEach(custom_field => {
				custom_fields.push({
					text: custom_field,
					value: custom_field
				});
			});
			return custom_fields;
		}
	},

	watch: {
		selectedBooking: function(value) {
			this.getServiceMembers(value);
		}
	},

	created() {
		this.getContact();
		this.getServices();
		this.showUserCustomFields();
	},

	mounted() {},

	methods: {
		...mapActions({
			getServices: 'services/index',
			storeUserCustomFields: 'user_custom_fields/store',
			showUserCustomFields: 'user_custom_fields/show',
			updateContact: 'contacts/update',
			updateBooking: 'bookings/update'
		}),

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
							text: assignedService.user.full_name,
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
							text: assignedService.user.full_name,
							value: assignedService.id
						});
					});
				}
				this.serviceMembers = serviceMembers;
			}
		},

		async updateSelectedBooking(selectedBooking) {
			this.bookingModalLoading = true;
			selectedBooking = JSON.parse(JSON.stringify(selectedBooking));
			selectedBooking.date = dayjs(selectedBooking.date).format('YYYY-MM-DD');
			selectedBooking.start = dayjs(selectedBooking.start).format('HH:mm');
			let updatedBooking = await this.updateBooking(selectedBooking).catch(() => {});
			this.bookingModalLoading = false;
			if (updatedBooking) {
				let booking = this.contact.bookings.data.find(x => x.id == updatedBooking.id);
				if (booking) {
					Object.assign(booking, updatedBooking);
				}
				this.$refs['bookingModal'].hide();
			}
		},

		async createZoomLink(booking) {
			this.createZoomLoading = true;
			if (this.$root.auth.zoom_token) {
				let response = await axios.get(`/zoom/create_meeting?booking_id=${booking.id}`);
				this.createZoomLoading = false;

				booking.zoom_link = response.data;
			}
		},

		editBooking(booking) {
			let selectedBooking = JSON.parse(JSON.stringify(booking));
			selectedBooking.start = dayjs(`${selectedBooking.date} ${selectedBooking.start}`).toDate();
			selectedBooking.isPrevious = dayjs(new Date()).isSameOrAfter(dayjs(selectedBooking.start));
			this.selectedBooking = selectedBooking;
			this.getSelectedBookingNewTimeslots(booking, selectedBooking.date);
			this.$refs['bookingModal'].show();
		},

		update() {
			this.updateContact(this.contact);
			this.$refs['editModal'].hide();
		},

		toggleContactServiceBlacklist(service) {
			let index = this.contact.blacklisted_services.findIndex(x => x == service.id);
			if (index > -1) {
				this.contact.blacklisted_services.splice(index, 1);
			} else {
				this.contact.blacklisted_services.push(service.id);
			}
		},

		async getSelectedBookingNewTimeslots(booking, date) {
			let response = await axios.get(`/services/${booking.service.id}?date=${dayjs(date).format('YYYY-MM-DD')}&single=1`);
			this.timeslots = response.data;
		},

		formatDate(date) {
			return dayjs(date).format('MMM D, YYYY');
		},

		async filterByServices(services) {
			let serviceIds = services.map(x => x.id);
			let response = await axios.get(`/contacts/${this.contact.id}?page=${this.contact.bookings.current_page}&services=${serviceIds}`);
			this.contact.bookings = response.data.bookings;
		},

		async getData(page) {
			let response = await axios.get(`/contacts/${this.contact.id}?page=${page}`);
			this.contact.bookings = response.data.bookings;
		},

		async getContact() {
			let response = await axios.get(`/contacts/${this.$route.params.id}`);
			let contact = response.data;
			contact.upcoming_bookings.forEach(booking => {
				booking.startDate = dayjs(`${booking.date} ${booking.start}`).toDate();
			});
			this.contact = contact;
			let clonedContact = JSON.parse(JSON.stringify(response.data));
			this.clonedContact = clonedContact;
			this.$root.contentloading = false;
			this.getRecentNotes();
		},

		async getRecentNotes() {
			if (this.contact) {
				let response = await axios.get(`/contacts/${this.contact.id}/recent_notes`);
				this.recentNotes = response.data;
			}
		},

		resendEmail(contact) {
			this.resendLoading = true;
			axios.post(`/contacts/${contact.id}/resend`).then(() => {
				this.resendLoading = false;
				this.$refs['resendModal'].hide();
				this.$toasted.show('Invitation email has been sent successfully.');
			});
		},

		toggleServiceBlacklist(service) {
			let index = this.newContact.blacklisted_services.findIndex(x => x == service.id);
			if (index > -1) {
				this.newContact.blacklisted_services.splice(index, 1);
			} else {
				this.newContact.blacklisted_services.push(service.id);
			}
		},

		openFile(file) {
			if (file.type == 'file') this.$root.downloadMedia(file);
			else this.selectedFile = file;
		},

		resetNewContact() {
			this.newContact = {
				custom_fields: {},
				blacklisted_services: []
			};
		},

		addNewField() {
			if (this.new_field.name && this.new_field.value) {
				this.new_field.is_visible = false;
				this.contact.custom_fields.push(this.new_field);
				this.updateContact(this.contact);
				this.new_field = {};
				this.addField = false;
			}
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
						blacklisted_services: [],
						sendToEmail: 1
					};
				});
				this.infoTab = '';
			}
		}
	}
};
