import { mapActions, mapState } from 'vuex';
import CalendarIcon from '../../../icons/calendar.vue';
import CloseIcon from '../../../icons/close.vue';
import WarningIcon from '../../../icons/warning.vue';
import Timerangepicker from '../../../components/timerangepicker/timerangepicker.vue';
import dayjs from 'dayjs';
import VueSelect from '../../../components/vue-select/vue-select.vue';
import VueFormValidate from '../../../components/vue-form-validate.vue';
import Modal from '../../../components/modal/modal.vue';
export default {
	props: {
		booking: {},
		newEvent: {
			type: Boolean,
			default: false
		}
	},

	components: { CalendarIcon, CloseIcon, Timerangepicker, VueSelect, VueFormValidate, Modal, WarningIcon },

	data: () => ({
		clonedBooking: {},
		open: false,
		masks: {
			input: 'MMM D, YYYY'
		},
		selectedContacts: []
	}),

	computed: {
		...mapState({
			services: state => state.services.index,
			contacts: state => state.contacts.index
		}),

		servicesOptions() {
			return this.services.map(service => {
				return { text: service.name, value: service };
			});
		},

		contactsOptions() {
			return this.contacts
				.filter(contact => {
					return !this.selectedContacts.find(x => x.id == contact.id);
				})
				.map(contact => {
					return { text: contact.full_name, value: contact };
				});
		}
	},

	watch: {
		booking: function(booking) {
			if (booking) {
				this.open = true;
				this.clonedBooking = JSON.parse(JSON.stringify(this.booking));
			}
		},
		newEvent: function(value) {
			if (value) {
				this.open = true;
				this.getServices();
				this.getContacts({ nopaginate: true });
			} else {
				this.selectedContacts = [];
			}
		},
		'clonedBooking.service': function(service) {
			if (this.newEvent && service) {
				let start = dayjs(`${this.clonedBooking.date} ${this.clonedBooking.start}`);
				this.clonedBooking.end = start.add(service.duration, 'minute').format('HH:mm');
			}
		}
	},

	created() {
		this.clonedBooking = JSON.parse(JSON.stringify(this.booking));
		if (this.newEvent) {
			this.getServices();
			this.getContacts({ nopaginate: true });
		}
	},

	methods: {
		...mapActions({
			storeBooking: 'bookings/store',
			updateBooking: 'bookings/update',
			deleteBooking: 'bookings/delete',
			getServices: 'services/index',
			getContacts: 'contacts/index'
		}),

		confirmDeleteBooking() {
			this.deleteBooking(this.booking.id);
			this.close();
			this.$refs.deleteModal.hide();
		},

		confirmDelete() {
			this.$refs.deleteModal.show();
		},

		createBooking() {
			let data = JSON.parse(JSON.stringify(this.clonedBooking));
			data.service_id = data.service.id;
			data.contact_ids = this.selectedContacts.map(x => x.id);
			data.date = dayjs(data.date).format('YYYY-MM-DD');
			this.storeBooking(data);
		},

		update() {
			this.open = false;
			let newData = JSON.parse(JSON.stringify(this.clonedBooking));
			newData.date = dayjs(newData.date).format('YYYY-MM-DD');
			this.updateBooking(newData);
			setTimeout(() => {
				this.$emit('update', newData);
			}, 150);
		},

		updateTime(time) {
			this.clonedBooking.start = time.start;
			this.clonedBooking.end = time.end;
		},

		close() {
			this.open = false;
			this.$emit('close');
			setTimeout(() => {
				this.selectedContacts = [];
			}, 150);
		},

		contactSelected(contact) {
			let exists = this.selectedContacts.find(x => x.id == contact.id);
			if (!exists) {
				this.selectedContacts.push(contact);
			}
		},

		emitNewBookingDateChange(time) {
			if (this.newEvent) {
				let clonedNewBooking = JSON.parse(JSON.stringify(this.clonedBooking));
				clonedNewBooking.start = time.start;
				clonedNewBooking.end = time.end;
				clonedNewBooking.date = dayjs(clonedNewBooking.date).format('YYYY-MM-DD');
				this.$emit('newBookingChange', clonedNewBooking);
			}
		}
	}
};
