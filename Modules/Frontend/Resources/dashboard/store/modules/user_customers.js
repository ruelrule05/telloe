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
        state.index.splice(state.index.findIndex((x) => x.id == data.id), 1);
    },
};

const actions = {
    index({ commit, rootState }, user_id) {
        const user_query = user_id ? `?user_id=${user_id}` : '';
        axios.get(`/${name}${user_query}`).then((response) => {
            commit('index', response.data);
        });
    },

    store({ commit }, data) {
        axios.post(`/${name}`, data).then((response) => {
            commit('store', response.data);
        });
    },

    delete({ commit }, data) {
        axios.delete(`/${name}/${data.id}`, data);
        commit('delete', data);
    },
};

const getters = {
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
