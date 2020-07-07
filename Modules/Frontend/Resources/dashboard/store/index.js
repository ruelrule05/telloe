import Vue from 'vue';
import Vuex from 'vuex';
import conversations from './modules/conversations';
import messages from './modules/messages';
import services from './modules/services';
import notes from './modules/notes';
import bookings from './modules/bookings';
import user_blacklisted_services from './modules/user_blacklisted_services';
import contacts from './modules/contacts';
import users from './modules/users';
import user_custom_fields from './modules/user_custom_fields';
import plans from './modules/plans';



Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		conversations,
		messages,
		services,
		notes,
		bookings,
		user_blacklisted_services,
		contacts,
		users,
		user_custom_fields,
		plans,
	},
});
