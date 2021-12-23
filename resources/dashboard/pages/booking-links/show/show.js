import { mapActions } from 'vuex';
import VueFormValidate from '../../../../components/vue-form-validate.vue';
import Modal from '../../../../components/modal/modal.vue';
import VCalendar from 'v-calendar';
import dayjs from 'dayjs';
import ChevronLeftIcon from '../../../../icons/chevron-left';
import ChevronRightIcon from '../../../../icons/chevron-right';
import VueSelect from '../../../../components/vue-select/vue-select.vue';
import CheckmarkIcon from '../../../../icons/checkmark';
import jstz from 'jstz';
const timezone = jstz.determine();
import Paginate from '../../../../components/paginate/paginate.vue';
import ShortcutIcon from '../../../../icons/shortcut';
import MoreIcon from '../../../../icons/more';
import ArrowLeftIcon from '../../../../icons/arrow-left';
import echo from '../../../../js/echo.js';
import Chatroom from '../chatroom/chatroom.vue';
import VueButton from '../../../../components/vue-button.vue';
import VueDropdown from '../../../../components/vue-dropdown/vue-dropdown.vue';
import copy from 'copy-text-to-clipboard';
import VueCheckbox from '../../../../components/vue-checkbox/vue-checkbox.vue';
const IsSameOrAfter = require('dayjs/plugin/isSameOrAfter');
dayjs.extend(IsSameOrAfter);
import ClockIcon from '../../../../icons/clock';
import CloseIcon from '../../../../icons/close';
import ToggleSwitch from '../../../../components/toggle-switch/toggle-switch.vue';

import { VTooltip } from 'v-tooltip';

export default {
	components: { VueFormValidate, Modal, VCalendar, ChevronLeftIcon, ChevronRightIcon, CheckmarkIcon, Paginate, ShortcutIcon, MoreIcon, ArrowLeftIcon, Chatroom, VueButton, VueSelect, VueDropdown, VueCheckbox, ClockIcon, CloseIcon, ToggleSwitch },
	directives: { tooltip: VTooltip },

	data: () => ({
		bookingLink: null,
		echo: echo,
		channel: null,
		users: {},
		highlighterWidth: 0,
		debounceFunc: null,
		selectedDate: null,
		currentTarget: null,
		sendingEmail: false,
		hoveredTimeslot: null,
		dayjs: dayjs,
		booking: null
	}),

	computed: {
		editable() {
			if (!this.selectedDate || this.bookingLink.is_booked) return false;
			return dayjs(this.selectedDate).isSameOrAfter(dayjs());
		},

		dateOptions() {
			let dateOptions = [];
			if (this.bookingLink) {
				Object.keys(this.bookingLink.dates).forEach(key => {
					dateOptions.push({
						text: this.formatDate(key),
						value: key
					});
				});
			}
			return dateOptions;
		},

		bookingLinkUrl() {
			return window.location.origin + '/booking-links/' + this.bookingLink.uuid;
		},

		timeslotStatusText() {
			let status = 'Enable';
			if (this.hoveredTimeslot && this.bookingLink && this.selectedDate && this.bookingLink.dates[this.selectedDate].selectedTimeslots.find(x => x.time == this.hoveredTimeslot.time)) {
				status = 'Disable';
			}
			return status;
		}
	},

	watch: {
		selectedDate: function () {
			if (this.currentTarget) {
				this.channel.whisper('move', {
					user: this.auth,
					index: this.currentTarget.dataset.index,
					selectedDate: this.selectedDate
				});
			}
		}
	},

	created() {
		this.$root.showHelpWidget = false;
		this.timezone = timezone.name();
		this.getBookingLink(this.$route.params.id).then(data => {
			this.bookingLink = data;
			this.selectedDate = Object.keys(this.bookingLink.dates)[0];
			this.$root.contentloading = false;
			this.channel = this.echo.join(`bookingLinks.${this.bookingLink.id}`);

			this.channel.listenForWhisper('suggestTimeslot', data => {
				let contact = this.bookingLink.booking_link_contacts.find(c => c.contact.contact_user_id == data.userId);
				if (contact) {
					if (!contact.suggestedTimeslots) {
						this.$set(contact, 'suggestedTimeslots', []);
					}
					let index = contact.suggestedTimeslots.findIndex(t => t.time == data.timeslot.time);
					if (data.is_suggested) {
						if (index == -1) {
							contact.suggestedTimeslots.push(data.timeslot);
						}
					} else {
						if (index > -1) {
							contact.suggestedTimeslots.splice(index, 1);
						}
					}
				}
			});

			this.channel.listenForWhisper('selectTimeslot', data => {
				this.$set(this.bookingLink.selected_timeslots, data.key, data.value);
			});
		});
	},

	mounted() {
		let style = document.createElement('style');
		style.appendChild(document.createTextNode('.helpcrunch-iframe-wrapper iframe{visibility: hidden !important}'));
		document.head.appendChild(style);

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

	destroyed: function () {
		this.$root.showHelpWidget = true;
	},

	methods: {
		...mapActions({
			getBookingLink: 'booking_links/show',
			updateBookingLink: 'booking_links/update',
			deleteBookingLink: 'booking_links/delete'
		}),

		hasSelected(user, timeslot) {
			let emailData = this.bookingLink.emails.find(x => x.email == user.email);
			let userID = emailData ? emailData.id : user.id;
			return (this.bookingLink.selected_timeslots || [])[`${userID}-${this.selectedDate}`] == timeslot.time;
		},

		async book(timeslot) {
			this.channel.whisper('creatingBooking', {});

			let data = {
				date: dayjs(this.selectedDate).format('YYYY-MM-DD'),
				start: timeslot.time
			};
			let response = await window.axios.post(`/booking-links/${this.bookingLink.uuid}/book`, data);
			if (response.data) {
				this.booking = response.data;
				this.$refs.bookingSuccessModal.show();
				this.bookingLink.is_booked = true;
				this.channel.whisper('bookingSuccess', {
					booking: this.booking
				});
			}
		},

		isBookable(timeslot) {
			let isBookable = true;
			if (!this.editable) {
				isBookable = false;
			} else {
				// You
				let propName = `${this.$root.auth.id}-${this.selectedDate}`;
				if (!this.bookingLink.selected_timeslots[propName] || this.bookingLink.selected_timeslots[propName] != timeslot.time) {
					isBookable = false;
				}

				// Contacts
				this.bookingLink.booking_link_contacts.forEach(bookingLinkContact => {
					let propName = `${bookingLinkContact.contact.contact_user_id}-${this.selectedDate}`;
					if (!this.bookingLink.selected_timeslots[propName] || this.bookingLink.selected_timeslots[propName] != timeslot.time) {
						isBookable = false;
					}
				});
				this.bookingLink.emails.forEach(email => {
					let propName = `${email}-${this.selectedDate}`;
					if (!this.bookingLink.selected_timeslots[propName] || this.bookingLink.selected_timeslots[propName] != timeslot.time) {
						isBookable = false;
					}
				});

				// Emails
			}
			return isBookable;
		},

		toggleSelectTimeslot(state, timeslot) {
			let propName = `${this.$root.auth.id}-${this.selectedDate}`;
			if (state) {
				this.$set(this.bookingLink.selected_timeslots, propName, timeslot.time);
			} else {
				this.$delete(this.bookingLink.selected_timeslots, propName);
			}
			this.updateBookingLink(this.bookingLink);
			this.channel.whisper('selectTimeslot', {
				key: propName,
				value: timeslot.time,
				selected: state
			});
		},

		timeslotTime(time, timezone) {
			let timezoneTime = this.timezoneTime(time, timezone);
			return `<span class="text-sm font-bold text-body block -mb-1">${timezoneTime.replace('AM', '').replace('PM', '')}</span><span class="text-sm text-muted uppercase">${timezoneTime.slice(-2)}</span>`;
		},

		action(action) {
			switch (action) {
				case 'Send email invitation':
					this.$refs.sendModal.show();
					break;

				case 'Copy link':
					this.copyToClipboard();
					break;

				case 'Delete':
					this.$refs.deleteModal.show();
					break;
			}
		},

		async destroy() {
			await this.deleteBookingLink(this.bookingLink);
			this.$router.push(`/dashboard/booking-links`);
		},

		async toggleTimeslot(timeslot) {
			let index = this.bookingLink.dates[this.selectedDate].timeslots.findIndex(x => x.time == timeslot.time);
			if (index != -1) {
				this.bookingLink.dates[this.selectedDate].timeslots[index].is_available = !this.bookingLink.dates[this.selectedDate].timeslots[index].is_available;
			}

			// update bookingLink
			await this.updateBookingLink(this.bookingLink);

			this.channel.whisper('selectedTimeslots', {
				selectedDate: this.selectedDate,
				selectedTimeslots: this.bookingLink.dates[this.selectedDate].selectedTimeslots,
				timeslots: this.bookingLink.dates[this.selectedDate].timeslots
			});
		},

		copyToClipboard() {
			if (copy(this.bookingLinkUrl)) {
				this.$toast.open('Copied to clipboard');
			}
		},

		selectElementText(el) {
			let win = window;
			var doc = win.document,
				sel,
				range;
			if (win.getSelection && doc.createRange) {
				sel = win.getSelection();
				range = doc.createRange();
				range.selectNodeContents(el);
				sel.removeAllRanges();
				sel.addRange(range);
			} else if (doc.body.createTextRange) {
				range = doc.body.createTextRange();
				range.moveToElementText(el);
				range.select();
			}
		},

		async sendEmail() {
			this.sendingEmail = true;
			let response = await window.axios.post(`/booking-links/${this.bookingLink.id}/send_invitation`);
			if (response) {
				this.$refs.sendModal.hide(true);
				this.$toast.success('Invitation emails has been sent successfully.');
			}
			this.sendingEmail = false;
		},

		showHighlight(e) {
			let timeslot = e.target.dataset.timeslot;
			if (timeslot) {
				this.hoveredTimeslot = JSON.parse(timeslot);
			}
			let x = `${e.target.offsetLeft}px`;
			this.$refs['highlighter'].style.left = x;
			setTimeout(() => {
				this.$refs['highlighter'].style.opacity = 1;
			}, 50);
			this.debounceFunc(e);
		},

		timezoneTime(time, userTimezone) {
			let userTZ = this.getTimeZoneOffset(new Date(), userTimezone);
			let localTZ = this.getTimeZoneOffset(new Date(), this.timezone);
			let timeslotDate = `${dayjs(this.selectedDate).format('YYYY-MM-DD')} ${time}`;
			let timezoneTime = dayjs(timeslotDate).add(localTZ - userTZ, 'minute');
			return timezoneTime.format('hh:mmA');
		},

		getTimeZoneOffset(date, timeZone) {
			const options = { timeZone, calendar: 'iso8601', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
			const dateTimeFormat = new Intl.DateTimeFormat(undefined, options);
			const parts = dateTimeFormat.formatToParts(date);
			const map = new Map(parts.map(x => [x.type, x.value]));
			const year = map.get('year');
			const month = map.get('month');
			const day = map.get('day');
			let hour = map.get('hour');
			const minute = map.get('minute');
			const second = map.get('second');
			const ms = date.getMilliseconds().toString().padStart(3, '0');
			if (hour == '24') hour = '00';
			const iso = `${year}-${month}-${day}T${hour}:${minute}:${second}.${ms}`;
			const lie = new Date(iso + 'Z');
			return -(lie - date) / 60 / 1000;
		},

		formatDate(date) {
			return dayjs(date).format('MMMM D, YYYY');
		}
	}
};
