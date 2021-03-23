import Vue from 'vue';
const name = 'notes';

const state = () => ({});

const mutations = {
	store() {},
	delete() {}
};

const actions = {
	index({ commit, rootState }, conversation_id) {
		commit('index');
		let conversation = rootState.conversations.index.find(x => x.id == conversation_id);
		if (conversation) {
			window.axios.get(`/${name}?conversation_id=${conversation_id}`).then(response => {
				Vue.set(conversation, 'notes', response.data);
			});
		}
	},

	async store({ commit }, data) {
		let response = await window.axios.post(`/${name}`, data);
		if (response) {
			commit('store');
			return response.data;
		}
	},

	update({ commit }, data) {
		commit('update');
		window.axios.put(`/${name}/${data.id}`, data);
	},

	async delete({ commit }, data) {
		commit('delete');
		let response = await window.axios.delete(`/${name}/${data.id}`);
		if (response) {
			return response.data;
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
