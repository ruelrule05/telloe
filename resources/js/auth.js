import VueFormValidate from './components/vue-form-validate';
import FacebookIcon from './icons/facebook';
import GoogleIcon from './icons/google';
const auth = {
    components: {VueFormValidate, FacebookIcon, GoogleIcon},

    data: {
        action_type: action_type || '',
        loading: false,
        pageloading: false,

        loginForm: {
            email: '',
            password: '',
        },

        signupForm: {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
        },

        recoverForm: {
            email: '',
            success: false,
        },

        resetForm: {
            password: '',
            password_confirmation: '',
        },

        GoogleAuth: null,
    },

    created() {
        if (typeof gapi != 'undefined'){
            gapi.load('auth2', () => {
                this.GoogleAuth = gapi.auth2.init({client_id: '187405864135-kboqmukelf9sio1dsjpu09of30r90ia1.apps.googleusercontent.com'});
            });
        }
        
    },

    methods: {
        login() {
            if (!this.loading) {
                this.loading = true;
                const redirect_url = this.$route.query.redirect ? '?redirect=' + this.$route.query.redirect : '';
                axios
                    .post('/login' + redirect_url, this.loginForm)
                    .then((response) => {
                        window.location.href = response.data.redirect_url;
                    })
                    .catch(() => {
                        this.loading = false;
                    });
            }
        },

        signup() {
            if (!this.loading) {
                this.loading = true;
                axios
                    .post(`/signup`, this.signupForm)
                    .then((response) => {
                        //window.location.href = response.data.redirect_url;
                        window.location.href = '/dashboard/inquiries';
                    })
                    .catch(() => {
                        this.loading = false;
                    });
            }
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
                this.$root.pageloading = true;
                FB.login((e) => {
                        FB.api('/me', {fields: 'first_name, last_name, email'}, (response) => {
                            if (response && !response.error) {
                                axios.post('/login/facebook', response).then((response) => {
                                    window.location.href = response.data.redirect_url;
                                }).catch((e) => {
                                    this.$root.pageloading = false;
                                });
                            } else {
                                this.$root.pageloading = false;
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
                            first_name: profile.getGivenName(),
                            last_name: profile.getFamilyName(),
                            email: profile.getEmail(),
                            image_url: profile.getImageUrl(),
                        };
                        axios.post('/login/google', user).then((response) => {
                           window.location.href = response.data.redirect_url;
                        }).catch((e) => {
                            this.$root.pageloading = false;
                        });
                    })
                    .catch(() => {
                        this.$root.pageloading = false;
                    });
            }
        },
    },
};

window.mixins.push(auth);
