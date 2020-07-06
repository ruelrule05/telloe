import Login from './login.vue';
import Signup from './signup.vue';
import CloseIcon from '../../icons/close.vue';
export default {
    components: {Login, Signup, CloseIcon},

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
        if (typeof gapi != 'undefined') {
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
                .then(response => {
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
                .then(response => {
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
                FB.login(
                    e => {
                        FB.api('/me', {fields: 'first_name, last_name, email'}, response => {
                            if (response && !response.error) {
                                response.action = this.$root.action;
                                axios
                                    .post('/login/facebook', response)
                                    .then(response => {
                                        window.location.href = response.data.redirect_url;
                                    })
                                    .catch(e => {
                                        this.pageloading = false;
                                        this.error = e.response.data.message;
                                    });
                            } else {
                                this.pageloading = false;
                                this.error = 'Facebook API went wrong.';
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
                    .then(googleUser => {
                        let profile = googleUser.getBasicProfile();
                        let user = {
                            id: profile.getId(),
                            first_name: profile.getGivenName(),
                            last_name: profile.getFamilyName(),
                            email: profile.getEmail(),
                            image_url: profile.getImageUrl(),
                            action: this.$root.action
                        };
                        axios
                            .post('/login/google', user)
                            .then(response => {
                                window.location.href = response.data.redirect_url;
                            })
                            .catch(e => {
                                this.pageloading = false;
                                this.error = e.response.data.message;
                            });
                    })
                    .catch(() => {
                        this.pageloading = false;
                        this.error = 'Google API went wrong.';
                    });
            }
        },
    },
};
