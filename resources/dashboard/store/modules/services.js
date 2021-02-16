const name = 'services';
const queryString = require('query-string');

const state = () => ({
	ready: false,
	index: []
});

const mutations = {
	index(state, data) {
		state.index = [];
		state.index.push.apply(state.index, data);
		state.ready = true;
	},

	store(state, data) {
		state.index.unshift(data);
	},

	show(state, data) {
		let service = state.index.find(x => x.id == data.id);
		if (service) Object.assign(service, data);
	},

	update(state, data) {
		let service = state.index.find(x => x.id == data.id);
		if (service) Object.assign(service, data);
	},

	delete(state, data) {
		let index = state.index.findIndex(x => x.id == data.id);
		if (index > -1) {
			state.index.splice(index, 1);
		}
	}
};

const actions = {
	async index({ commit }) {
		let response = await window.axios.get(`/${name}`);
		commit('index', response.data);
	},

	store({ commit }, data) {
		window.axios.post(`/${name}`, data).then(response => {
			commit('store', response.data);
		});
	},

	async show({ commit }, { service_id, params }) {
		params = queryString.stringify(params);
		let response = await window.axios.get(`/${name}/${service_id}?${params}`);
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
