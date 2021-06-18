const name = 'pending_subscriptions';

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

	delete(state, data) {
		state.index.splice(
			state.index.findIndex(x => x.id == data.id),
			1
		);
	}
};

const actions = {
	index({ commit }) {
		window.axios.get(`/${name}`).then(response => {
			commit('index', response.data);
		});
	},

	async store({ commit }, data) {
		let response = await window.axios.post(`/${name}`, data, { toast: true });
		commit('store', response.data);
		return response.data;
	},

	delete({ commit }, data) {
		window.axios.delete(`/${name}/${data.id}`, data);
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
