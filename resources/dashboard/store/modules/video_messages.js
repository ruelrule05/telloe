const name = 'video_messages';

const state = () => ({
	index: [],
	ready: false,
	userVideos: []
});

const mutations = {
	index(state, data) {
		state.index = data;
		state.ready = true;
	},
	store(state, data) {
		state.index.unshift(data);
	},
	delete() {}
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
