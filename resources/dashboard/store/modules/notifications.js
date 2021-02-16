const name = 'notifications';

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

	clear(state) {
		state.index = [];
	},

	update() {}
};

const actions = {
	async index({ commit }) {
		let response = await window.axios.get(`/${name}`);
		commit('index', response.data);
	},

	update({ commit }, data) {
		commit('update');
		window.axios.put(`/${name}/${data.id}`, data);
	},

	clear({ commit }) {
		window.axios.post(`/${name}/clear`);
		commit('clear');
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
