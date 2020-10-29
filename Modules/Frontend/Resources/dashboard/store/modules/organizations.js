const name = 'organizations';

const state = () => ({
	ready: false,
	index: []
});

const mutations = {
	index(state, data) {
		state.index = [];
		data.sort((a, b) => {
			return a.date > b.date ? 1 : b.date > a.date ? -1 : 0;
		});
		state.index.push.apply(state.index, data);
		state.ready = true;
	},

	store(state, data) {
		state.index.unshift(data);
	},

	show(state, data) {
		let packageItem = state.index.find(x => x.id == data.id);
		if (packageItem) Object.assign(packageItem, data);
	},

	update(state, data) {
		let booking = state.index.find(x => x.id == data.id);
		if (booking) Object.assign(booking, data);
	},

	delete(state, data) {
		state.index.splice(
			state.index.findIndex(x => x.id == data.id),
			1
		);
	}
};

const actions = {
	async index({ commit }, conversation) {
		let response = await axios.get(`/${name}`);
		commit('index', response.data);
		return response;
	},

	async store({ commit }, data) {
		let response = await axios.post(`/${name}`, data);
		commit('store', response.data);
	},

	async show({ commit }, package_id) {
		let response = await axios.get(`/${name}/${package_id}`);
		commit('show', response.data);
		return response.data;
	},

	async update({ commit }, data) {
		let response = await axios.put(`/${name}/${data.id}`, data);
		commit('update', response.data);

		return response;
	},

	delete({ commit }, data) {
		axios.delete(`/${name}/${data.id}`, data);
		commit('delete', data);
	},

	delete_member({ commit }, data) {
		axios.delete(`/${name}/${data.organization_id}/delete_member?id=${data.id}`);
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
