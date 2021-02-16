const name = 'user_custom_fields';

const state = () => ({
	fields: []
});

const mutations = {
	show(state, data) {
		state.fields = data.fields;
	},
	store() {}
};

const actions = {
	async show({ commit }) {
		let response = await window.axios.get(`/${name}`);
		commit('show', response.data);

		return response.data;
	},

	async store({ commit }, data) {
		commit('store');
		return await window.axios.post(`/${name}`, { fields: data });
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
