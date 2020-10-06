const name = 'members';

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

    get_member_from_invite_token(state, data) {
        let member = state.index.find(x => x.id == data.id);
        if (member) {
            member.is_pending = data.is_pending;
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

    get_member_from_invite_token({commit}, invite_token) {
        axios.post(`/${name}/get_member_from_invite_token`, {invite_token: invite_token}).then(response => {
            commit('get_member_from_invite_token', response.data);
        })
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
