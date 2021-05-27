const name = 'services';
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

	show(state, data) {
		let service = state.index.find(x => x.id == data.id);
		if (service) Object.assign(service, data);
	},

	update(state, data) {
		let service = state.index.find(x => x.id == data.id);
		if (service) {
			Object.assign(service, data);
			if (service.in_widget) {
				state.index.forEach(s => {
					if (s.id != service.id) {
						s.in_widget = false;
					}
				});
			}
		}
	},

	delete(state, data) {
		let index = state.index.findIndex(x => x.id == data.id);
		if (index > -1) {
			state.index.splice(index, 1);
		}
	}
};

const actions = {
	async index({ commit }, params) {
		let response = await window.axios.get(`/${name}`, { params: params });
		commit('index', response.data);
	},

	async store({ commit }, data) {
		let response = await window.axios.post(`/${name}`, data, { toast: true });
		commit('store', response.data);
		return response.data;
	},

	async show({ commit }, { service_id, params }) {
		params = queryString.stringify(params);
		let response = await window.axios.get(`/${name}/${service_id}?${params}`);
		commit('show', response.data);
		return response.data;
	},

	async update({ commit }, data) {
		let response = await window.axios.put(`/${name}/${data.id}`, data, { toast: true });
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
