import Vue from 'vue';
import Vuex from 'vuex';
import conversations from './modules/conversations';
import messages from './modules/messages';
import services from './modules/services';
import notes from './modules/notes';
import bookings from './modules/bookings';
import user_blacklisted_services from './modules/user_blacklisted_services';


Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		conversations,
		messages,
		services,
		notes,
		bookings,
		user_blacklisted_services,
	},
});
