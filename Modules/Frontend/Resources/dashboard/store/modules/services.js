const name = 'services';

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
		let response = await axios.get(`/${name}`);
		commit('index', response.data);
	},

	store({ commit }, data) {
		axios.post(`/${name}`, data).then(response => {
			commit('store', response.data);
		});
	},

	async show({ commit }, service_id) {
		let response = await axios.get(`/${name}/${service_id}`);
		commit('show', response.data);
		return response.data;
	},

	async update({ commit }, data) {
		let response = await axios.put(`/${name}/${data.id}`, data);
		commit('update', data);
		return response.data;
	},

	async delete({ commit }, data) {
		await axios.delete(`/${name}/${data.id}`, data);
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
