import { mapState, mapActions } from 'vuex';
import Modal from '../../../../components/modal/modal.vue';
import CheckmarkCircleIcon from '../../../../icons/checkmark-circle';
import MoreIcon from '../../../../icons/more';
import ArrowLeftIcon from '../../../../icons/arrow-left';
import ClockIcon from '../../../../icons/clock';
import TrashIcon from '../../../../icons/trash';
import dayjs from 'dayjs';
const IsSameOrBefore = require('dayjs/plugin/isSameOrBefore');
const IsSameOrAfter = require('dayjs/plugin/isSameOrAfter');
dayjs.extend(IsSameOrBefore);
dayjs.extend(IsSameOrAfter);
import Paginate from '../../../../components/paginate/paginate.vue';
import VueSelect from '../../../../components/vue-select/vue-select.vue';
const convertTime = require('convert-time');
import VCalendar from 'v-calendar';
import ToggleSwitch from '../../../../components/toggle-switch/toggle-switch.vue';
import VueFormValidate from '../../../../components/vue-form-validate.vue';
import VueButton from '../../../../components/vue-button.vue';
import ZoomIcon from '../../../../icons/zoom';
import ShortcutIcon from '../../../../icons/shortcut';
import NoteIcon from '../../../../icons/note';
import PencilIcon from '../../../../icons/pencil';
import MoveIcon from '../../../../icons/move';
import PlusIcon from '../../../../icons/plus';
import draggable from 'vuedraggable';
import VueDropdown from '../../../../components/vue-dropdown/vue-dropdown.vue';
import CogIcon from '../../../../icons/cog';
import ChevronLeftIcon from '../../../../icons/chevron-left';
import Booking from '../../../components/Booking/Booking.vue';
import axios from 'axios';
import VueCheckbox from '../../../../components/vue-checkbox/vue-checkbox.vue';
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
		contact: null,
		clonedContact: null,
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
		tagOptions: []
	}),

	computed: {
		...mapState({
			services: state => state.services.index,
			user_custom_fields: state => state.user_custom_fields.fields,
			packages: state => state.packages.index
		}),

		notes() {
			let notes = this.contact.contactNotes || [];
			this.contact.bookings.data.forEach(booking => {
				let index = notes.findIndex(x => x.type == 'booking-note' && x.booking && x.booking.id == booking.id);
				if (index == -1) {
					if (booking.notes && booking.notes.trim().length > 0) {
						notes.push({
							type: 'booking-note',
							note: booking.notes,
							booking: booking,
							created_at: booking.updated_at
						});
					}
				} else {
					notes[index].note = booking.notes;
				}
			});
			if (this.notesOrder == 'desc') {
				return notes.sort((a, b) => {
					return a.created_at > b.created_at ? -1 : 1;
				});
			} else if (this.notesOrder == 'asc') {
				return notes.sort((a, b) => {
					return b.created_at > a.created_at ? -1 : 1;
				});
			}
			return notes;
		},

		selectedPackageOptions() {
			let selectedPackageOptions = [];
			if (this.selectedPackage) {
				this.selectedPackage.services.forEach(service => {
					selectedPackageOptions.push({
						text: service.name,
						value: service
					});
				});
			}
			return selectedPackageOptions;
		},

		packagesOptions() {
			let packagesOptions = [];
			this.packages.forEach(packageItem => {
				packagesOptions.push({
					text: packageItem.name,
					value: packageItem
				});
			});
			return packagesOptions;
		},

		availableServices() {
			return this.services.filter(service => {
				return this.contact.blacklisted_services.find(x => x == service.id) ? false : true && service.is_available;
			});
		},

		servicesList() {
			let servicesList = [{ text: 'All', value: 0 }];
			this.services.forEach(service => {
				servicesList.push({
					text: service.name,
					value: service.id
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
		selectedBooking: function (value) {
			this.getServiceMembers(value);
		},
		'newBooking.service': function () {
			this.newBooking.service_id = null;
			this.newBooking.timeslot = null;
			this.timeslots = [];
		},
		'newBooking.service_id': function () {
			this.getNewBookingServiceTimeslots();
		},
		'newBooking.date': function () {
			this.getNewBookingServiceTimeslots();
		},
		page: function () {
			this.getContact();
		}
	},

	created() {
		this.getContact();
		this.getServices();
		this.showUserCustomFields();
		this.getPackages();
	},

	mounted() {},

	methods: {
		...mapActions({
			getServices: 'services/index',
			storeUserCustomFields: 'user_custom_fields/store',
			showUserCustomFields: 'user_custom_fields/show',
			updateContact: 'contacts/update',
			storeBooking: 'bookings/store',
			storeConversation: 'conversations/store',
			getPackages: 'packages/index'
		}),

		removeTag() {
			this.$nextTick(() => {
				this.updateContact(this.contact);
			});
		},

		addTag(newTag) {
			let exists = this.contact.tags.find(x => x == newTag);
			if (!exists) {
				this.tagOptions.push(newTag);
				this.contact.tags.push(newTag);
				this.updateContact(this.contact);
			}
		},

		toggleBlockStatus(state, block, contactPackage) {
			if (!contactPackage.service.completed) {
				this.$set(contactPackage.service, 'completed', []);
			}
			let index = contactPackage.service.completed.findIndex(x => x == block);
			if (state && index < 0) {
				contactPackage.service.completed.push(block);
			} else if (!state && index >= 0) {
				contactPackage.service.completed.splice(index, 1);
			}
			axios.put(`/contacts/${this.contact.id}/package`, { completed: contactPackage.service.completed, contact_package_id: contactPackage.id });
		},

		deleteContactPackage(contactPackage, index) {
			this.contact.contact_packages.splice(index, 1);
			axios.delete(`/contacts/${this.contact.id}/package`, { params: { package_id: contactPackage.id } });
		},

		async addPackageService() {
			this.addingPackage = false;
			let response = await axios.post(`/contacts/${this.contact.id}/package`, { package_id: this.selectedPackage.id, service: this.selectedPackageService });
			this.contact.contact_packages = this.contact.contact_packages.concat(response.data);
			this.selectedPackage = null;
			this.selectedPackageService = null;
		},

		newBookingStored(bookings) {
			if (this.packageService) {
				bookings.forEach(booking => {
					this.contact.contact_packages[this.contactPackageIndex].bookings.unshift(booking);
				});
			}
			bookings.forEach(booking => {
				this.contact.bookings.data.unshift(booking);
			});
		},

		createNewEvent() {
			this.newEvent = true;
			this.selectedBooking = { date: dayjs().format('YYYY-MM-DD'), start: '02:00', end: '03:00' };
		},

		bookPackage(contactPackage, contactPackageIndex) {
			this.newEvent = true;
			this.packageService = contactPackage.service;
			this.contactPackageIndex = contactPackageIndex;
			this.selectedBooking = { date: dayjs().format('YYYY-MM-DD'), start: '02:00', end: '03:00', contact_package_id: contactPackage.id };
		},

		bookingDeleted(booking) {
			let index = this.contact.bookings.data.findIndex(b => b.id == booking.id);
			if (index >= -1) {
				this.contact.bookings.data.splice(index, 1);
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

		noteAction(action, note) {
			switch (action) {
				case 'Edit':
					this.selectedNote = note;
					this.selectedNote.new_note = note.note;
					break;
				case 'Delete':
					this.deleteContactNote(note);
					break;

				case 'View Booking':
					this.selectedBooking = note.booking;
					break;
			}
		},

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
				this.bookingModalLoading = true;
				let data = Object.assign({}, this.newBooking);
				data.start = this.newBooking.timeslot;
				data.contact_id = this.contact.id;
				data.date = dayjs(this.newBooking.date).format('YYYY-MM-DD');
				let booking = await this.storeBooking(data).catch(() => {});
				if (booking) {
					this.getContact();
					this.$refs['add'].hide();
				}
				this.bookingModalLoading = false;
			}
		},

		async getNewBookingServiceTimeslots() {
			if (this.newBooking.service_id && this.newBooking.date) {
				let response = await window.axios.get(`/services/${this.newBooking.service_id}?date=${dayjs(this.newBooking.date).format('YYYY-MM-DD')}&single=1`);
				this.newBooking.timeslot = null;
				this.timeslots = response.data;
			}
		},

		async confirmUpdateNote(contactNote) {
			let response = await window.axios.put(`/contact_notes/${contactNote.id}`, { note: contactNote.new_note });
			let index = this.contact.contactNotes.findIndex(x => x.id == contactNote.id);
			if (index > -1) {
				this.contact.contactNotes[index] = response.data;
			}
			this.selectedNote = null;
		},

		deleteContactNote(contactNote, index) {
			this.contact.contactNotes.splice(index, 1);
			window.axios.delete(`/contact_notes/${contactNote.id}`);
		},

		async confirmAddNote() {
			if (this.newNote) {
				let response = await window.axios.post('/contact_notes', { contact_id: this.contact.id, note: this.newNote });
				this.contact.contactNotes.unshift(response.data);
				this.addingNote = false;
				this.newNote = '';
			}
		},

		async confirmDeleteBooking(booking) {
			await this.deleteBooking(booking);
			this.getContact();
		},

		getServiceMembers(booking) {
			if (booking && booking.id) {
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
			await this.updateBooking(selectedBooking).catch(() => {});
			this.bookingModalLoading = false;
			this.$refs['bookingModal'].hide();
			this.getContact();
		},

		async createZoomLink(booking) {
			this.createZoomLoading = true;
			if (this.$root.auth.zoom_token) {
				let response = await window.axios.get(`/zoom/create_meeting?booking_id=${booking.id}`);
				this.createZoomLoading = false;

				booking.zoom_link = response.data;
			}
		},

		editBooking(booking) {
			let selectedBooking = JSON.parse(JSON.stringify(booking));
			this.selectedBooking = selectedBooking;
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
			let response = await window.axios.get(`/services/${booking.service.id}?date=${dayjs(date).format('YYYY-MM-DD')}&single=1`);
			this.timeslots = response.data;
		},

		formatDate(date) {
			return dayjs(date).format('MMM D, YYYY');
		},

		async filterBookings() {
			let serviceIds = this.selectedService ? [this.selectedService.id] : [];
			let response = await window.axios.get(`/contacts/${this.contact.id}?page=${this.contact.bookings.current_page}&services=${serviceIds}&order=${this.order}`);
			this.contact.bookings = response.data.bookings;
		},

		async getData(page) {
			let response = await window.axios.get(`/contacts/${this.contact.id}?page=${page}`);
			this.contact.bookings = response.data.bookings;
		},

		async getContact() {
			let response = await window.axios.get(`/contacts/${this.$route.params.id}`, { params: { page: this.page } });
			let contact = response.data;
			contact.upcoming_bookings.forEach(booking => {
				booking.startDate = dayjs(`${booking.date} ${booking.start}`).toDate();
			});
			this.contact = contact;
			let clonedContact = JSON.parse(JSON.stringify(response.data));
			this.clonedContact = clonedContact;
			this.$root.contentloading = false;
			this.getRecentNotes();
			this.getContactNotes();
		},

		async getContactNotes(order = 'desc') {
			if (this.contact) {
				let response = await window.axios.get(`/contacts/${this.contact.id}/contact_notes?order=${order}`);
				this.$set(this.contact, 'contactNotes', response.data);
			}
		},

		async getRecentNotes() {
			if (this.contact) {
				// let response = await window.axios.get(`/contacts/${this.contact.id}/recent_notes`);
				// this.recentNotes = response.data;
			}
		},

		resendEmail(contact) {
			this.resendLoading = true;
			window.axios.post(`/contacts/${contact.id}/resend`).then(() => {
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
