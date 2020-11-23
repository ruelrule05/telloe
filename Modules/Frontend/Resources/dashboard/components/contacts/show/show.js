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
		VueFormValidate
	},

	data: () => ({
		contact: null,
		clonedContact: null,
		filterServices: [],
		convertTime: convertTime,
		dayjs: dayjs,
		timeslots: [],
		newField: '',
		addField: false
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
		}
	},

	watch: {},

	created() {
		this.getContact();
		this.getServices();
	},

	mounted() {},

	methods: {
		...mapActions({
			getServices: 'services/index',
			storeUserCustomFields: 'user_custom_fields/store',
			updateContact: 'contacts/update'
		}),

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

		async getSelectedBookingNewTimeslots(date) {
			let timeslot = this.timeslots[this.selectedTimeslot.dayName][this.selectedTimeslot.index];
			if (timeslot) {
				let response = await axios.get(`/services/${this.selectedService.id}?date=${dayjs(date).format('YYYY-MM-DD')}&single=1`);
				this.selectedTimeslot.timeslots = response.data;
			}
		},

		formatDate(date) {
			return dayjs(date).format('MMMM D, YYYY');
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
				booking.start = dayjs(`${booking.date} ${booking.start}`).toDate();
			});
			this.contact = contact;
			let clonedContact = JSON.parse(JSON.stringify(response.data));
			this.clonedContact = clonedContact;
			this.$root.contentloading = false;
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
			if (this.newField.trim().length > 0) {
				this.$root.auth.custom_fields.push(this.newField);
				this.newField = '';
				this.addField = false;
			}
			this.storeUserCustomFields();
			this.$toasted.show('Fields saved successfully.');
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
