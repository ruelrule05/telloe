try {
    window.$ = window.jQuery = require('jquery');
} catch (e) {}

window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.interceptors.request.use(
    function(config) {
        config.headers['Cache-Control'] = 'no-cache';
        config.url = `/ajax${config.url}`;
        return config;
    },
    function(error) {
        return Promise.reject(error);
    }
);
window.axios.interceptors.response.use(
    function(response) {
        return response;
    },
    function(error) {
        /*if (error.response && error.response.status == 401) {
            window.location.href = '/login';
        }*/
        
        /*Vue.toasted.error(error.response.data.message, {
            className: 'bg-red rounded-0 justify-content-center'
        });*/
        return Promise.reject(error);
    }
);
