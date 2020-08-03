const name = 'notifications';

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
};

const actions = {
    async index({commit}) {
        let response = await axios.get(`/${name}`);
        commit('index', response.data);
    },

    update({ commit }, data) {
        axios.put(`/${name}/${data.id}`, data);
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
