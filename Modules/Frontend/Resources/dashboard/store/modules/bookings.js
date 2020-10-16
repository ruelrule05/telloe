const name = 'bookings';

const state = () => ({
	ready: false,
	index: [],

	googleClient: {},
	googleCalendarsReady: false,

	outlookClient: {},
	outlookCalendarsReady: false
});

const mutations = {
	index(state, data) {
		state.index = [];
		data.sort((a, b) => {
			return a.date > b.date ? 1 : b.date > a.date ? -1 : 0;
		});
		state.index.push.apply(state.index, data);
		state.ready = true;
	},

	store(state, data) {
		state.index.unshift(data);
	},

	update(state, data) {
		let booking = state.index.find(x => x.id == data.id);
		if (booking) Object.assign(booking, data);
	},

	delete(state, data) {
		state.index.splice(
			state.index.findIndex(x => x.id == data.id),
			1
		);
	},

	googleCalendars(state, data) {
		state.googleCalendarsReady = true;
		window.app.auth.google_calendars = data;
	},

	outlookCalendars(state, data) {
		state.outlookCalendarsReady = true;
		window.app.auth.outlook_calendars = data;
	}
};

const actions = {
	async index({ commit }, conversation) {
		let queryString = '';
		if (conversation) {
			if (conversation.id) {
				queryString = `?conversation_id=${conversation.id}`;
			} else if (conversation.members.length > 0 && conversation.member.contact) {
				queryString = `?contact_id=${conversation.member.contact.id}`;
			}
		}
		let response = await axios.get(`/${name}${queryString}`);
		commit('index', response.data);
		return response;
	},

	async store({ commit }, data) {
		let response = await axios.post(`/${name}`, data);
		commit('store', response.data);
		if (response.data.notification) window.app.socket.emit('new_notification', { user_id: response.data.notification.user_id, id: response.data.notification.id });
	},

	async update({ commit }, data) {
		let response = await axios.put(`/${name}/${data.id}`, data);
		commit('update', response.data);
		if (response.data.notification) window.app.socket.emit('new_notification', { user_id: response.data.notification.user_id, id: response.data.notification.id });

		return response;
	},

	delete({ commit }, data) {
		axios.delete(`/${name}/${data.id}`, data);
		commit('delete', data);
	},

	googleCalendars({ commit }, data) {
		axios.get(`/google_calendar_list`).then(response => {
			commit('googleCalendars', response.data);
		});
	},

	outlookCalendars({ commit }, data) {
		axios.get(`/outlook_calendar_list`).then(response => {
			commit('outlookCalendars', response.data);
		});
	},

	assignToMember({ commit }, data) {
		axios.post(`/${name}/${data.id}/assign_to_member`, data);
	}
};

const getters = {};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
};
