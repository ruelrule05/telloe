const name = 'messages';

const state = () => ({
});

const mutations = {
};

const actions = {
    async store({ commit, rootState }, data) {
        let conversation = rootState.conversations.index.find((x) => x.id == data.conversation_id);
        if(conversation) {
            Vue.set(conversation, 'last_message', data);
            conversation.messages.push(data);

            data.metadata = JSON.stringify(data.metadata);
            let bodyFormData = new FormData();
            Object.keys(data).map((k) => {
                bodyFormData.append(k, data[k]);
            });
            let response = await axios.post(`/${name}`, bodyFormData, {headers: {'Content-Type': 'multipart/form-data'}});
            Vue.set(data, 'id', response.data.id);
            Vue.set(data, 'preview', response.data.preview);
            Vue.set(data, 'source', response.data.source);
            Vue.set(data, 'updated_at', response.data.updated_at);
            Vue.set(data, 'metadata', response.data.metadata);
            Vue.set(data, 'sending', false);
            return response.data;
        }
    },

    update({ commit }, data) {
        axios.put(`/${name}/${data.id}`, data);
    },

    delete({ commit, rootState }, data) {
        axios.delete(`/${name}/${data.id}`, data);
        let conversation = rootState.conversations.index.find((x) => x.id == data.conversation_id);
        if(conversation) {
            let index = conversation.messages.findIndex(x => x.id == data.id);
            if(index > -1) conversation.messages.splice(index, 1);
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
