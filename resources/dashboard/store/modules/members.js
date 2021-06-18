const name = 'members';

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

	update(state, data) {
		let member = state.index.find(x => x.id == data.id);
		if (member) Object.assign(member, data);
	},

	delete(state, data) {
		state.index.splice(
			state.index.findIndex(x => x.id == data.id),
			1
		);
	},

	store_service(state, data) {
		let index = state.index.findIndex(x => x.id == data.member_id);
		if (index > -1) {
			state.index[index].services = state.index[index].services || [];
			state.index[index].services.push(data);
		}
	},

	get_member_from_invite_token(state, data) {
		let member = state.index.find(x => x.id == data.id);
		if (member) {
			member.is_pending = data.is_pending;
		}
	}
};

const actions = {
	async index({ commit }, user_id) {
		const user_query = user_id ? `?user_id=${user_id}` : '';
		let response = await window.axios.get(`/${name}${user_query}`);
		commit('index', response.data);
	},

	async store({ commit }, data) {
		let response = await window.axios.post(`/${name}`, data, { toast: true });
		commit('store', response.data);
	},

	async update({ commit }, data) {
		let response = await window.axios.put(`/${name}/${data.id}`, data);
		commit('update', response.data);

		return response.data;
	},

	async store_service({ commit }, data) {
		let response = await window.axios.post(`/${name}/${data.id}/assign_service`, data);
		commit('store_service', response.data);
		return response.data;
	},

	async delete({ commit }, data) {
		await window.axios.delete(`/${name}/${data.id}`, data);
		commit('delete', data);
	},

	get_member_from_invite_token({ commit }, invite_token) {
		window.axios.post(`/${name}/get_member_from_invite_token`, { invite_token: invite_token }).then(response => {
			commit('get_member_from_invite_token', response.data);
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
