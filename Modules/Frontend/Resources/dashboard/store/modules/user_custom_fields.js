const name = 'user_custom_fields';

const state = () => ({
	fields: []
});

const mutations = {
	show(state, data) {
		state.fields = data.fields;
	}
};

const actions = {
	async show({ commit, rootState }, data) {
		let response = await axios.get(`/${name}`);
		commit('show', response.data);

		return response.data;
	},

	async store({ commit }, data) {
		return await axios.post(`/${name}`, { fields: data });
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
