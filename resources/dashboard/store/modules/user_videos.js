const name = 'user_videos';

const state = () => ({
	index: []
});

const mutations = {
	index(state, data) {
		state.index = data;
	},
	store(state, data) {
		state.index.unshift(data);
	},
	delete(state, data) {
		state.index.splice(
			state.index.findIndex(x => x.id == data.id),
			1
		);
	},
};

const actions = {
	async index({ commit }) {
		let response = await window.axios.get(`/${name}`);
		if (response) {
			commit('index', response.data);
		}
	},
	async store({ commit }, data) {
		let response = await window.axios.post(`/${name}`, data);
		if (response) {
			commit('store', response.data);
		}

		return response;
	},
	async delete({ commit }, data) {
		let response = await window.axios.delete(`/${name}/${data.id}`, { toast: true });
		if (response) {
			commit('delete', data);
		}
	},
};

const getters = {};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
};
