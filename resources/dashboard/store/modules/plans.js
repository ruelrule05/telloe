const name = 'plans';

const state = () => ({
	index: [],
	ready: false
});

const mutations = {
	index(state, data) {
		data.forEach(conversation => {
			if (!state.index.find(x => x.id == conversation.id)) state.index.push(conversation);
		});
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
