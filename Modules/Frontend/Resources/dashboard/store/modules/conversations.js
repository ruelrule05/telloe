const name = 'conversations';

const state = () => ({
	ready: false,
	index: []
});

const mutations = {
	index(state, data) {
		data.forEach(conversation => {
			if (!state.index.find(x => x.id == conversation.id)) state.index.push(conversation);
		});
		// state.index = [];
		//state.index.push.apply(state.index, data);
		state.ready = true;
	},

	async show(state, data) {
		return new Promise((resolve, reject) => {
			let conversation = state.index.find(x => x.id == data.id);
			if (conversation) {
				if (!conversation.paginated_messages) {
					Vue.set(conversation, 'paginated_messages', data.paginated_messages);
				} else {
					if (data.page == 1) conversation.paginated_messages.data = [];
					conversation.paginated_messages.data = conversation.paginated_messages.data.concat(data.paginated_messages.data);
					conversation.paginated_messages.next_page_url = data.paginated_messages.next_page_url;
				}
				Vue.set(conversation, 'user', data.user);
				Vue.set(conversation, 'contact', data.contact);
				Vue.set(conversation, 'ready', true);
				Vue.set(conversation.last_message, 'is_read', true);
			} else {
				Vue.set(data, 'ready', true);
				Vue.set(data.last_message, 'is_read', true);
				state.index.push(data);
			}
			resolve();
		});
	},

	update(state, data) {
		let conversation = state.index.find(x => x.id == data.id);
		if (conversation) {
			conversation.archive_users = data.archive_users;
		}
	}
};

const actions = {
	async index({ commit }) {
		let response = await axios.get(`/${name}`);
		commit('index', response.data);
	},

	async show({ commit, state }, data) {
		let conversation = state.index.find(x => x.id == data.id);
		const page = data.page || 1;
		if (conversation && page == 1) {
			Vue.set(conversation, 'files', null);
			Vue.set(conversation, 'ready', false);
		}
		let response = await axios.get(`/${name}/${data.id}?page=${page}`);
		response.data.page = page;
		await commit('show', response.data);
	},

	async store({ commit }, data) {
		let response = await axios.post(`/${name}`, data, { toasted: true });
		return response.data;
	},

	async update({ commit }, data) {
		let response = await axios.put(`/${name}/${data.id}`, data);
		await commit('update', response.data);
	}
};

const getters = {
	show: state => id => {
		return state.index.find(x => x.id == id);
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
};
