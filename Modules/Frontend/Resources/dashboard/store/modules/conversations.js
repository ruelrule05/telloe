const name = 'conversations';

const state = () => ({
    ready: false,
    index: [],
});

const mutations = {
    index(state, data) {
        data.forEach((conversation) => {
            if(!state.index.find((x) => x.id == conversation.id)) state.index.push(conversation);
        });
        // state.index = [];
        //state.index.push.apply(state.index, data);
        state.ready = true;
    },

    async show(state, data) {
        return new Promise((resolve, reject) => {
            let conversation = state.index.find((x) => x.id == data.id);
            if(conversation) {
                Vue.set(conversation, 'messages', data.messages);
                Vue.set(conversation, 'user', data.user);
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
        if(conversation) {
            conversation.archive_users = data.archive_users;
        }
    } 
};

const actions = {
    index({ commit }) {
        axios.get(`/${name}`).then((response) => {
            commit('index', response.data);
        });
    },

    async show({ commit, state }, id) {
        let conversation = state.index.find((x) => x.id == id);
        if(conversation) Vue.set(conversation, 'ready', false);
        let response = await axios.get(`/${name}/${id}`);
        await commit('show', response.data);
    },

    async store({ commit }, data) {
        let response = await axios.post(`/${name}`, data, {toasted: true});
        return response.data;
    },

    async update({ commit }, data) {
        let response = await axios.put(`/${name}/${data.id}`, data);
        await commit('update', response.data);
    },
};

const getters = {
    show: (state) => (id) => {
        return state.index.find((x) => x.id == id);
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
