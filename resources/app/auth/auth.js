import Login from './login.vue';
import Signup from './signup.vue';
import VueButton from '../../components/vue-button.vue';
import CloseIcon from '../../icons/close.vue';

Vue.component('vue-button', require('../../components/vue-button.vue').default);
Vue.component('vue-form-validate', require('../../components/vue-form-validate.vue').default);
export default {
    components: {Login, Signup, VueButton, CloseIcon},

    data: () => ({
        pageloading: false,
        loading: false,
        open: false,
        error: '',

        recoverForm: {
            email: '',
            success: false,
        },

        resetForm: {
            password: '',
            password_confirmation: '',
        },

        GoogleAuth: null,
    }),

    created() {
        if (typeof gapi != 'undefined'){
            gapi.load('auth2', () => {
                this.GoogleAuth = gapi.auth2.init({client_id: '187405864135-kboqmukelf9sio1dsjpu09of30r90ia1.apps.googleusercontent.com'});
            });
        }
    },

    mounted() {
        setTimeout(() => {
            this.open = true;
        }, 150);
    },

    watch: {
        action: function(value) {
            this.error = '';
        }
    },

    methods: {
        close() {
            this.open = false;
            setTimeout(() => {
                this.$root.auth = false;
            }, 150);
        },

        recover() {
            this.loading = true;
            axios
                .post('/recover', this.recoverForm)
                .then((response) => {
                    this.loading = false;
                    this.recoverForm.success = true;
                })
                .catch(() => {
                    this.loading = false;
                });
        },

        reset() {
            this.loading = true;
            this.resetForm.token = this.$route.query.token;
            axios
                .post('/reset', this.resetForm)
                .then((response) => {
                    this.loading = false;
                    window.location.href = '/login';
                })
                .catch(() => {
                    this.loading = false;
                });
        },

        FacebookLogin() {
            if (typeof FB != 'undefined') {
                this.pageloading = true;
                FB.login((e) => {
                        FB.api('/me', {fields: 'first_name, last_name, email'}, (response) => {
                            if (response && !response.error) {
                                axios.post('/login/facebook', response).then((response) => {
                                    window.location.href = response.data.redirect_url;
                                }).catch((e) => {
                                    this.pageloading = false;
                                });
                            } else {
                                this.pageloading = false;
                            }
                        });
                    },
                    {scope: 'email'},
                );
            }
        },

        Googlesignin() {
            if (this.GoogleAuth) {
                this.pageloading = true;
                this.GoogleAuth.signIn()
                    .then((googleUser) => {
                        let profile = googleUser.getBasicProfile();
                        let user = {
                            id: profile.getID(),
                            first_name: profile.getGivenName(),
                            last_name: profile.getFamilyName(),
                            email: profile.getEmail(),
                            image_url: profile.getImageUrl(),
                        };
                        axios.post('/login/google', user).then((response) => {
                           window.location.href = response.data.redirect_url;
                        }).catch((e) => {
                            this.pageloading = false;
                        });
                    })
                    .catch(() => {
                        this.pageloading = false;
                    });
            }
        },
    },
};

