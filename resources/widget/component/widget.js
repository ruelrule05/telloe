import CalendarIcon from '../../icons/calendar';
import CloseIcon from '../../icons/close';
export default {
	components: { CalendarIcon, CloseIcon },
	data: () => ({
		open: false, // false
		source: null
	}),
	created() {
		this.source = this.$root.endpoint + '/@' + this.$root.profile.username + '?widget=true';
	}
};
