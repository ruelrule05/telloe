const name = 'user_custom_fields';

const state = () => ({
});

const mutations = {
};

const actions = {
    show({ commit, rootState }, data) {
        axios.get(`/${name}`).then((response) => {
            Vue.set(window.app.auth, 'custom_fields', response.data.fields)
        });
    },

    store({ commit, rootState }, data) {
        axios.post(`/${name}`, {fields: window.app.auth.custom_fields}).then((response) => {
            Vue.set(window.app.auth, 'custom_fields', response.data.fields)
        });
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
