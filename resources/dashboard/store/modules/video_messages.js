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
	update(state, data) {
		let videoMessage = state.index.find(x => x.id == data.id);
		if (videoMessage) Object.assign(videoMessage, data);
	},
	delete(state, data) {
		state.index.splice(
			state.index.findIndex(x => x.id == data.id),
			1
		);
	}
};

const actions = {
	async index({ commit }) {
		let response = await window.axios.get(`/${name}`);
		if (response) {
			commit('index', response.data);
		}
	},
	async store({ commit }, data) {
		let response = await window.axios.post(`/${name}`, data, { toast: true });
		if (response) {
			commit('store', response.data);
		}
		return response;
	},

	async update({ commit }, data) {
		let response = await window.axios.put(`/${name}/${data.id}`, data, { toast: true });
		if (response) {
			commit('update', response.data);
		}
	},

	async delete({ commit }, data) {
		let response = await window.axios.delete(`/${name}/${data.id}`, { toast: true });
		if (response) {
			commit('delete', data);
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
