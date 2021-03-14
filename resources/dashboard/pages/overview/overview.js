import CloseIcon from '../../../icons/close.vue';
import { mapState, mapActions } from 'vuex';
import UpcomingBookings from '../../components/UpcomingBookings/UpcomingBookings.vue';
export default {
	components: { CloseIcon, UpcomingBookings },

	data: () => ({
		banner: false
	}),

	computed: {
		...mapState({
			upcomingBookings: state => state.bookings.upcoming
		})
	},

	created() {
		this.getUpcomingBookings();
	},

	methods: {
		...mapActions({
			getUpcomingBookings: 'bookings/getUpcomingBookings'
		})
	}
};
