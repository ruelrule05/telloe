const name = 'contacts';

const state = () => ({
    ready: false,
    index: [],
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

    delete(state, data) {
        state.index.splice(
            state.index.findIndex(x => x.id == data.id),
            1,
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
            if(invoice) Object.assign(invoice, data);
        }
    },

    create_subscription(state, data) {
        let contact = state.index.find(x => x.id == data.contact_id);
        if (contact) {
            contact.subscriptions.push(data);
        }
    },
};

const actions = {
    index({commit, rootState}, user_id) {
        const user_query = user_id ? `?user_id=${user_id}` : '';
        axios.get(`/${name}${user_query}`).then(response => {
            commit('index', response.data);
        });
    },

    async store({commit}, data) {
        let response = await axios.post(`/${name}`, data, {toasted: true});
        commit('store', response.data);
        return response.data;
    },

    delete({commit}, data) {
        axios.delete(`/${name}/${data.id}`, data);
        commit('delete', data);
    },

    async create_invoice({commit}, data) {
        let response = await axios.post(`/${name}/${data.id}/create_invoice`, data);
        commit('create_invoice', response.data);
    },

    async finalize_invoice({commit}, data) {
        let response = await axios.post(`/${name}/${data.contact.id}/finalize_invoice`, {invoice_id: data.id});
        commit('finalize_invoice', response.data);
    },

    async create_subscription({commit}, data) {
        let response = await axios.post(`/${name}/${data.id}/create_subscription`, data);
        commit('create_subscription', response.data);
    },
};

const getters = {};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
