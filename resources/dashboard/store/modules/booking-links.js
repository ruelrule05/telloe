const name = 'booking-links';
const queryString = require('query-string');

const state = () => ({
	ready: false,
	index: [],
	paginated: { data: [] }
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

	show() {}
};

const actions = {
	async index({ commit }, params) {
		params = queryString.stringify(params);
		let response = await window.axios.get(`/${name}?${params}`);
		commit('index', response.data);
		return response;
	},

	async store({ commit }, data) {
		let response = await window.axios.post(`/${name}`, data, { toast: true });
		commit('store', response.data);

		return response.data;
	},

	async show({ commit }, id) {
		let response = await window.axios.get(`/${name}/${id}`);
		commit('show', response.data);

		return response.data;
	},

	async update({ commit }, data) {
		let response = await window.axios.put(`/${name}/${data.id}`, data);
		commit('update', response.data);

		return response.data;
	},

	async delete({ commit }, data) {
		await window.axios.delete(`/${name}/${data.id}`, data);
		commit('delete', data);
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
