const name = 'bookings';

const state = () => ({
	ready: false,
	upcoming: [],
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
		data.forEach(booking => {
			state.index.unshift(booking);
			state.paginated.data.unshift(booking);
		});
	},

	update(state, data) {
		data.forEach(d => {
			let booking = state.index.find(x => x.id == d.id);
			if (!booking) {
				booking = state.paginated.data.find(x => x.id == d.id);
			}
			if (booking) {
				Object.assign(booking, d);
			}
		});
	},

	delete(state, id) {
		state.index.splice(
			state.index.findIndex(x => x.id == id),
			1
		);
		state.paginated.data.splice(
			state.paginated.data.findIndex(x => x.id == id),
			1
		);
	},

	outlookCalendars(state, data) {
		state.outlookCalendarsReady = true;
		window.app.auth.outlook_calendars = data;
	},

	getUpcomingBookings(state, data) {
		state.upcoming = data;
	}
};

const actions = {
	async index({ commit }, params) {
		let response = await window.axios.get(`/${name}`, { params: params });
		if (!params || params.commit !== false) {
			commit('index', response.data);
		}
		return response;
	},

	async store({ commit }, data) {
		let response = await window.axios.post(`/${name}`, data, { toast: true });
		commit('store', response.data);

		return response.data;
	},

	async update({ commit }, data) {
		let response = await window.axios.put(`/${name}/${data.id}`, data, { toast: true });
		commit('update', response.data);

		return response.data;
	},

	async delete({ commit }, id) {
		await window.axios.delete(`/${name}/${id}`);
		commit('delete', id);
	},

	async getGoogleCalendars() {
		return await window.axios.get(`/google_calendar_list`);
	},

	async getOutlookCalendars() {
		return await window.axios.get(`/outlook_calendar_list`);
	},

	assignToMember({ commit }, data) {
		commit('assignToMember');
		window.axios.post(`/${name}/${data.id}/assign_to_member`, data);
	},

	async getUpcomingBookings({ commit }, data) {
		let response = await window.axios.get('/bookings/upcoming', { params: data });
		if (response) {
			commit('getUpcomingBookings', response.data);
		}
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
