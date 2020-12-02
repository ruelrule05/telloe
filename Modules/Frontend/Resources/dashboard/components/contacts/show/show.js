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
import PlusIcon from '../../../../icons/plus';

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
		MoveIcon,
		PlusIcon
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
		serviceMembers: [],
		addingNote: false,
		newNote: '',
		selectedNote: null,
		newBooking: {
			service: null,
			service_id: null,
			date: new Date(),
			timeslot: null
		}
	}),

	computed: {
		...mapState({
			services: state => state.services.index,
			user_custom_fields: state => state.user_custom_fields.fields
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
		selectedBooking: function(value) {
			this.getServiceMembers(value);
		},
		'newBooking.service': function(value) {
			this.newBooking.service_id = null;
			this.newBooking.timeslot = null;
			this.timeslots = [];
		},
		'newBooking.service_id': function(value) {
			this.getNewBookingServiceTimeslots();
		},
		'newBooking.date': function(value) {
			this.getNewBookingServiceTimeslots();
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
			storeBooking: 'bookings/store',
			updateBooking: 'bookings/update',
			deleteBooking: 'bookings/delete',
			storeConversation: 'conversations/store'
		}),

		async goToConversation() {
			let conversation = await this.storeConversation({ members: [this.contact.contact_user_id] });
			if (conversation) {
				this.$router.push(`/dashboard/conversations/${conversation.id}`);
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

		async addNewBooking() {
			if (this.newBooking.service_id && this.newBooking.date && this.newBooking.timeslot) {
				let data = this.newBooking;
				data.start = this.newBooking.timeslot;
				data.contact_id = this.contact.id;
				data.date = dayjs(this.newBooking.date).format('YYYY-MM-DD');
				let booking = await this.storeBooking(data);
				this.getContact();
				this.$refs['addBookingModal'].hide();
			}
		},

		async getNewBookingServiceTimeslots() {
			if (this.newBooking.service_id && this.newBooking.date) {
				let response = await axios.get(`/services/${this.newBooking.service_id}?date=${dayjs(this.newBooking.date).format('YYYY-MM-DD')}&single=1`);
				this.newBooking.timeslot = null;
				this.timeslots = response.data;
			}
		},

		async confirmUpdateNote(contactNote) {
			let response = await axios.put(`/contact_notes/${contactNote.id}`, { note: contactNote.new_note });
			let index = this.contact.contact_notes.findIndex(x => x.id == contactNote.id);
			if (index > -1) {
				this.contact.contact_notes[index] = response.data;
			}
			this.selectedNote = null;
		},

		deleteContactNote(contactNote, index) {
			this.contact.contact_notes.splice(index, 1);
			axios.delete(`/contact_notes/${contactNote.id}`);
		},

		async confirmAddNote() {
			if (this.newNote) {
				let response = await axios.post('/contact_notes', { contact_id: this.contact.id, note: this.newNote });
				this.contact.contact_notes.unshift(response.data);
				this.addingNote = false;
				this.newNote = '';
			}
		},

		async confirmDeleteBooking(booking) {
			await this.deleteBooking(booking);
			this.getContact();
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

		async updateSelectedBooking(selectedBooking) {
			this.bookingModalLoading = true;
			selectedBooking = JSON.parse(JSON.stringify(selectedBooking));
			selectedBooking.date = dayjs(selectedBooking.date).format('YYYY-MM-DD');
			selectedBooking.start = dayjs(selectedBooking.start).format('HH:mm');
			let updatedBooking = await this.updateBooking(selectedBooking).catch(() => {});
			this.bookingModalLoading = false;
			this.$refs['bookingModal'].hide();
			this.getContact();
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
			if (this.new_field.name) {
				this.new_field.is_visible = false;
				this.contact.custom_fields.push(this.new_field);
				this.updateContact(this.contact);
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
						blacklisted_services: [],
						sendToEmail: 1
					};
				});
				this.infoTab = '';
			}
		}
	}
};
