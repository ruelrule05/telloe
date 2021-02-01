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
export default {
	components: { VueFormValidate, Modal, VCalendar, ChevronLeftIcon, ChevronRightIcon, VueSelect, CheckmarkIcon, Paginate, ShortcutIcon, MoreIcon, ArrowLeftIcon },

	directives: { tooltip },

	data: () => ({
		bookingLink: null,
		echo: echo,
		channel: null,
		users: {},
		highlighterWidth: 0,
		debounceFunc: null,
		selectedDate: null,
		currentTarget: null
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

	methods: {
		...mapActions({
			getBookingLink: 'booking_links/show'
		}),

		showHighlight(e) {
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
