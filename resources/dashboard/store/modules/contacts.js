const name = 'contacts';
const queryString = require('query-string');

const state = () => ({
	ready: false,
	hasContacts: false,
	index: [],
	paginated: { data: [] }
});

const mutations = {
	index(state, data) {
		if (data.data) {
			state.paginated = data;
			if (data.data.length > 0) {
				state.hasContacts = true;
			}
		} else {
			state.index = data;
			if (data.length > 0) {
				state.hasContacts = true;
			}
		}
		state.ready = true;
	},

	store(state, data) {
		state.index.unshift(data);
		state.paginated.data.unshift(data);
	},

	update(state, data) {
		let contact = state.index.find(x => x.id == data.id);
		if (contact) Object.assign(contact, data);
		contact = state.paginated.data.find(x => x.id == data.id);
		if (contact) Object.assign(contact, data);
	},

	delete(state, data) {
		state.index.splice(
			state.index.findIndex(x => x.id == data.id),
			1
		);
		state.paginated.data.splice(
			state.paginated.data.findIndex(x => x.id == data.id),
			1
		);
	},

	create_invoice(state, data) {
		let contact = state.index.find(x => x.id == data.contact_id);
		if (contact) {
			contact.invoices.push(data);
		}
	},

	finalize_invoice(state, data) {
		let contact = state.index.find(x => x.id == data.contact_id);
		if (contact) {
			let invoice = contact.invoices.find(x => x.id == data.id);
			if (invoice) Object.assign(invoice, data);
		}
	},

	create_subscription(state, data) {
		let contact = state.index.find(x => x.id == data.contact_id);
		if (contact) {
			contact.subscriptions.push(data);
		}
	},

	cancel_subscription(state, data) {
		let contact = state.index.find(x => x.id == data.contact_id);
		if (contact) {
			let subscription = contact.subscriptions.find(x => x.id == data.id);
			if (subscription) {
				subscription.status = data.status;
			}
		}
	},

	get_contact_from_invite_token(state, data) {
		let contact = state.index.find(x => x.id == data.id);
		if (contact) {
			contact.is_pending = data.is_pending;
		}
	},

	bulkStore() {}
};

const actions = {
	index({ commit }, params) {
		params = queryString.stringify(params);
		window.axios.get(`/${name}?${params}`).then(response => {
			commit('index', response.data);
		});
	},

	async store({ commit }, data) {
		let response = await window.axios.post(`/${name}`, data, { toast: true });
		commit('store', response.data);
		return response.data;
	},

	async bulkStore({ commit }, data) {
		let response = await window.axios.post(`/${name}/bulk`, data, { toast: true });
		commit('bulkStore', response.data);
		return response.data;
	},

	async update({ commit }, data) {
		let response = await window.axios.put(`/${name}/${data.id}`, data);
		commit('update', response.data);
		return response.data;
	},

	delete({ commit }, data) {
		window.axios.delete(`/${name}/${data.id}`, data);
		commit('delete', data);
	},

	async create_invoice({ commit }, data) {
		let response = await window.axios.post(`/${name}/${data.id}/create_invoice`, data, { toast: true });
		commit('create_invoice', response.data);
	},

	async finalize_invoice({ commit }, data) {
		let response = await window.axios.post(`/${name}/${data.contact.id}/finalize_invoice`, { invoice_id: data.id });
		commit('finalize_invoice', response.data);
	},

	async create_subscription({ commit }, data) {
		let response = await window.axios.post(`/${name}/${data.id}/create_subscription`, data, { toast: true });
		commit('create_subscription', response.data);
	},

	async cancel_subscription({ commit }, data) {
		let response = await window.axios.post(`/${name}/${data.contact.id}/cancel_subscription?subscription_id=${data.id}`, null, { toast: true });
		commit('cancel_subscription', response.data);
	},

	get_contact_from_invite_token({ commit }, invite_token) {
		window.axios.post(`/${name}/get_contact_from_invite_token`, { invite_token: invite_token }).then(response => {
			commit('get_contact_from_invite_token', response.data);
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
