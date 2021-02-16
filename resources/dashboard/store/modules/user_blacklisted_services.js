import Vue from 'vue';
const name = 'user_blacklisted_services';

const state = () => ({
	index: {}
});

const mutations = {
	index(state, data) {
		Vue.set(state.index, data.user_id, data.data);
	},

	store(state, data) {
		let user = state.index[data.user_id];
		if (user) {
			let index = user.findIndex(x => x.id == data.id);
			if (index > -1) {
				Vue.set(user, index, data);
			} else {
				user.push(data);
			}
		}
	}
};

const actions = {
	index({ commit }, user_id) {
		const user_query = user_id ? `?user_id=${user_id}` : '';
		window.axios.get(`/${name}${user_query}`).then(response => {
			commit('index', { user_id: user_id, data: response.data });
		});
	},

	store({ commit }, data) {
		window.axios.post(`/${name}`, data).then(response => {
			commit('store', response.data);
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
