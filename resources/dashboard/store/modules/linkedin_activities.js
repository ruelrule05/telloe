const name = 'linkedin_activities';

const state = () => ({
	index: [],
	ready: false
});

const mutations = {
	index(state, data) {
		state.index = data;
		state.ready = true;
	}
};

const actions = {
	async index({ commit }) {
		let response = await window.axios.get(`/${name}`);
		if (response) {
			commit('index', response.data);
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
