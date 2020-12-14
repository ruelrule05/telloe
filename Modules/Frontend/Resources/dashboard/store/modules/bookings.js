const name = 'bookings';
const queryString = require('query-string');

const state = () => ({
	ready: false,
	index: [],
	paginated: { data: [] },

	googleClient: {},
	googleCalendarsReady: false,

	outlookClient: {},
	outlookCalendarsReady: false
});

const mutations = {
	index(state, data) {
		if (data.data) {
			state.paginated = data;
		} else {
			state.index = data;
		}
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
		state.paginated.data.splice(
			state.paginated.data.findIndex(x => x.id == data.id),
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
	async index({ commit }, params) {
		params = queryString.stringify(params);
		let response = await window.axios.get(`/${name}?${params}`);
		commit('index', response.data);
		return response;
	},

	async store({ commit }, data) {
		let response = await window.axios.post(`/${name}`, data, { toasted: true });
		commit('store', response.data);
		if (response.data.notification) window.app.socket.emit('new_notification', { user_id: response.data.notification.user_id, id: response.data.notification.id });

		return response.data;
	},

	async update({ commit }, data) {
		let response = await window.axios.put(`/${name}/${data.id}`, data, { toasted: true });
		commit('update', response.data);
		if (response.data.notification) window.app.socket.emit('new_notification', { user_id: response.data.notification.user_id, id: response.data.notification.id });

		return response.data;
	},

	async delete({ commit }, data) {
		await window.axios.delete(`/${name}/${data.id}`, data);
		commit('delete', data);
	},

	googleCalendars({ commit }) {
		window.axios.get(`/google_calendar_list`).then(response => {
			commit('googleCalendars', response.data);
		});
	},

	outlookCalendars({ commit }) {
		window.axios.get(`/outlook_calendar_list`).then(response => {
			commit('outlookCalendars', response.data);
		});
	},

	assignToMember({ commit }, data) {
		commit('assignToMember');
		window.axios.post(`/${name}/${data.id}/assign_to_member`, data);
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
