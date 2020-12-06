const name = 'users';

const state = () => ({
	ready: false,
	index: []
});

const mutations = {
	index(state, data) {
		state.index = [];
		state.index.push.apply(state.index, data);
		state.ready = true;
	}
};

const actions = {
	index({ commit }) {
		window.axios.get(`/${name}`).then(response => {
			commit('index', response.data);
		});
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
