const name = 'notes';

const state = () => ({
});

const mutations = {

};

const actions = {
    index({ commit, rootState }, conversation_id) {
        let conversation = rootState.conversations.index.find((x) => x.id == conversation_id);
        if(conversation) {
            axios.get(`/${name}?conversation_id=${conversation_id}`).then((response) => {
                Vue.set(conversation, 'notes', response.data);
            });
        }
    },

    store({ commit, rootState }, data) {
        let conversation = rootState.conversations.index.find((x) => x.id == data.conversation_id);
        if(conversation) {
            axios.post(`/${name}`, data).then((response) => {
                conversation.notes.unshift(response.data);
            });
        }
    },
    
    update({ commit }, data) {
        axios.put(`/${name}/${data.id}`, data);
    },

    delete({ commit, rootState }, data) {
        let conversation = rootState.conversations.index.find((x) => x.id == data.conversation_id);
        if(conversation) {
            conversation.notes.splice(conversation.notes.findIndex((x) => x.id == data.id), 1);
            axios.delete(`/${name}/${data.id}`);
        }
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
