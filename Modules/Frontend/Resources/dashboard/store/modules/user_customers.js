const name = 'user_customers';

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
        let customer = state.index.find(x => x.id == data.customer_id);
        if (customer) {
            customer.invoices.push(data);
        }
    },

    finalize_invoice(state, data) {
        let customer = state.index.find(x => x.id == data.customer_id);
        if (customer) {
            let invoice = customer.invoices.find(x => x.id == data.id);
            if(invoice) Object.assign(invoice, data);
        }
    },

    create_subscription(state, data) {
        let customer = state.index.find(x => x.id == data.customer_id);
        if (customer) {
            customer.subscriptions.push(data);
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

    store({commit}, data) {
        axios.post(`/${name}`, data).then(response => {
            commit('store', response.data);
        });
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
        let response = await axios.post(`/${name}/${data.user_customer.id}/finalize_invoice`, {invoice_id: data.id});
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
