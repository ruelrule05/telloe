const name = 'bookings';

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

    update(state, data) {
        let booking = state.index.find((x) => x.id == data.id);
        if(booking) Object.assign(booking, data);
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

    update({ commit }, data) {
        axios.put(`/${name}/${data.id}`, data).then((response) => {
            commit('update', response.data);
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
