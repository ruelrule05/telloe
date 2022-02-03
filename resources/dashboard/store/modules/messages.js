import Vue from 'vue';
const name = 'messages';
const extractUrls = require('extract-urls');

const state = () => ({});

const mutations = {
	store() {},
	update() {},
	delete() {}
};

const actions = {
	async store({ commit, rootState }, data) {
		commit('store');

		let newMessage = Object.assign({}, data);
		newMessage.message = escapeHTML(newMessage.message);

		let conversation = rootState.conversations.index.find(x => x.id == data.conversation_id);
		if (conversation) {
			conversation.paginated_messages.data.push(newMessage);
			Vue.set(conversation, 'last_message', newMessage);
		}

		data.metadata = JSON.stringify(data.metadata);
		let bodyFormData = new FormData();
		Object.keys(data).map(k => {
			bodyFormData.append(k, data[k]);
		});
		let response = await window.axios.post(`/${name}`, bodyFormData, { headers: { 'Content-Type': 'multipart/form-data' } });
		Vue.set(newMessage, 'id', response.data.id);
		Vue.set(newMessage, 'message', response.data.message);
		Vue.set(newMessage, 'preview', response.data.preview);
		Vue.set(newMessage, 'link_preview', response.data.link_preview);
		Vue.set(newMessage, 'source', response.data.source);
		Vue.set(newMessage, 'updated_at', response.data.updated_at);
		Vue.set(newMessage, 'metadata', response.data.metadata);
		Vue.set(newMessage, 'timestamp', response.data.timestamp);
		Vue.set(newMessage, 'created_at_format', response.data.created_at_format);
		Vue.set(newMessage, 'sending', false);

		let links = extractUrls(response.data.message);
		if (links && links.length > 0) {
			window.axios.get(`/messages/${response.data.id}/generate_link_preview`).then(response => {
				Vue.set(newMessage, 'link_preview', response.data);
			});
		}
		return response.data;
	},

	update({ commit }, data) {
		commit('update');
		window.axios.put(`/${name}/${data.id}`, data);
	},

	delete({ commit, rootState }, data) {
		commit('delete');
		window.axios.delete(`/${name}/${data.id}`, data);
		let conversation = rootState.conversations.index.find(x => x.id == data.conversation_id);
		if (conversation) {
			let index = conversation.paginated_messages.data.findIndex(x => x.id == data.id);
			if (index > -1) conversation.paginated_messages.data.splice(index, 1);
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

function escapeHTML(text) {
	let map = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&#34;',
		"'": '&#39;'
	};
	return text.replace(/[&<>"']/g, function (m) {
		return map[m];
	});
}
