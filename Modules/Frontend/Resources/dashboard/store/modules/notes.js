const name = 'notes';

const state = () => ({});

const mutations = {};

const actions = {
	index({ commit, rootState }, conversation_id) {
		commit('index');
		let conversation = rootState.conversations.index.find(x => x.id == conversation_id);
		if (conversation) {
			window.axios.get(`/${name}?conversation_id=${conversation_id}`).then(response => {
				window.Vue.set(conversation, 'notes', response.data);
			});
		}
	},

	store({ commit, rootState }, data) {
		commit('store');
		let conversation = rootState.conversations.index.find(x => x.id == data.conversation_id);
		if (conversation) {
			window.axios.post(`/${name}`, data).then(response => {
				conversation.notes.unshift(response.data);
			});
		}
	},

	update({ commit }, data) {
		commit('update');
		window.axios.put(`/${name}/${data.id}`, data);
	},

	delete({ commit, rootState }, data) {
		commit('delete');
		let conversation = rootState.conversations.index.find(x => x.id == data.conversation_id);
		if (conversation) {
			conversation.notes.splice(
				conversation.notes.findIndex(x => x.id == data.id),
				1
			);
			window.axios.delete(`/${name}/${data.id}`);
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
