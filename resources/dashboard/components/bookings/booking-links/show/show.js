import { mapActions } from 'vuex';
import VueFormValidate from '../../../../../components/vue-form-validate.vue';
import Modal from '../../../../../components/modal/modal.vue';
import VCalendar from 'v-calendar';
import dayjs from 'dayjs';
import ChevronLeftIcon from '../../../../../icons/chevron-left';
import ChevronRightIcon from '../../../../../icons/chevron-right';
import VueSelect from '../../../../../components/vue-select/vue-select.vue';
import CheckmarkIcon from '../../../../../icons/checkmark';
import jstz from 'jstz';
const timezone = jstz.determine();
import tooltip from '../../../../../js/directives/tooltip.js';
import Paginate from '../../../../../components/paginate/paginate.vue';
import ShortcutIcon from '../../../../../icons/shortcut';
import MoreIcon from '../../../../../icons/more';
import ArrowLeftIcon from '../../../../../icons/arrow-left';
import { debounce } from 'throttle-debounce';
import echo from '../../../../../js/echo.js';
import Chatroom from '../chatroom/chatroom.vue';
import VueButton from '../../../../../components/vue-button.vue';
export default {
	components: { VueFormValidate, Modal, VCalendar, ChevronLeftIcon, ChevronRightIcon, VueSelect, CheckmarkIcon, Paginate, ShortcutIcon, MoreIcon, ArrowLeftIcon, Chatroom, VueButton },

	directives: { tooltip },

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
		hoveredTimeslot: null
	}),

	computed: {
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
		selectedDate: function() {
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
			this.channel.listenForWhisper('move', data => {
				if (data.selectedDate == this.selectedDate) {
					this.highlighterWidth = `${document.querySelector('.timeslot-button').offsetWidth}px`;
					data.user.left = `${document.querySelector('.timeslot-button[data-index="' + data.index + '"]').offsetLeft}px`;
					this.$set(this.users, data.user.id, data.user);
				} else {
					data.user.left = '-100%';
				}
				this.$set(this.users, data.user.id, data.user);
			});
			this.channel.listenForWhisper('suggestTimeslot', data => {
				let timeslot = this.bookingLink.dates[this.selectedDate].timeslots.find(x => x.time == data.timeslot.time);
				if (timeslot) {
					this.$set(timeslot, 'isSuggested', data.timeslot.isSuggested);
				}
			});
			this.debounceFunc = debounce(350, false, e => {
				this.channel.whisper('move', {
					user: this.$root.auth,
					index: e.target.dataset.index,
					selectedDate: this.selectedDate
				});
			});
			this.$nextTick(() => {
				this.highlighterWidth = `${document.querySelector('.timeslot-button').offsetWidth}px`;
			});
		});
	},

	destroyed: function() {
		this.$root.showHelpWidget = true;
	},

	methods: {
		...mapActions({
			getBookingLink: 'booking_links/show',
			updateBookingLink: 'booking_links/update',
			deleteBookingLink: 'booking_links/delete'
		}),

		async destroy() {
			await this.deleteBookingLink(this.bookingLink);
			this.$refs['deleteModal'].hide();
			this.$router.push(`/dashboard/bookings/booking-links`);
		},

		async toggleTimeslot() {
			if (this.hoveredTimeslot) {
				let timeslot = this.bookingLink.dates[this.selectedDate].timeslots.find(x => x.time == this.hoveredTimeslot.time);
				if (timeslot) {
					let index = this.bookingLink.dates[this.selectedDate].selectedTimeslots.findIndex(x => x.time == timeslot.time);
					if (index == -1) {
						this.bookingLink.dates[this.selectedDate].selectedTimeslots.push(timeslot);
					} else {
						this.bookingLink.dates[this.selectedDate].selectedTimeslots.splice(index, 1);
					}

					// update bookingLink
					await this.updateBookingLink(this.bookingLink);

					this.channel.whisper('selectedTimeslots', {
						selectedDate: this.selectedDate,
						selectedTimeslots: this.bookingLink.dates[this.selectedDate].selectedTimeslots
					});
				}
			}
		},

		copyToClipboard() {
			this.$toasted.show('Copied to clipboard');
			let element = this.$refs['link'];
			let $temp = $('<input>');
			$('body').append($temp);
			$temp.val($(element).text()).select();
			document.execCommand('copy');
			$temp.remove();
			this.selectElementText(element);
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
				this.$refs['sendModal'].hide();
				this.$toasted.success('Invitation emails has been sent successfully.');
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

		timezoneTime(timezone, time) {
			let timezoneTime;
			if (timezone != this.timezone) {
				let profileTZ = this.getTimeZoneOffset(new Date(), timezone);
				let localTZ = this.getTimeZoneOffset(new Date(), this.timezone);
				let timeslotDate = `${dayjs(this.startDate).format('YYYY-MM-DD')} ${time}`;
				timezoneTime = dayjs(timeslotDate).add(profileTZ - localTZ, 'minute');
			} else {
				timezoneTime = dayjs(`${dayjs(this.startDate).format('YYYY-MM-DD')} ${time}`);
			}
			return timezoneTime.format('h:mm A');
		},

		getTimeZoneOffset(date, timeZone) {
			// Abuse the Intl API to get a local ISO 8601 string for a given time zone.
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
			const ms = date
				.getMilliseconds()
				.toString()
				.padStart(3, '0');
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
