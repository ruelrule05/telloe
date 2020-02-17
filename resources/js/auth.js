import VueFormValidate from './components/vue-form-validate.vue';
const auth = {
    components: {VueFormValidate},

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
    },

    methods: {
        login() {
            if (!this.loading) {
                this.loading = true;
                const redirect_url = this.$route.query.redirect ? '?redirect=' + this.$route.query.redirect : '';
                axios
                    .post('/login' + redirect_url, this.loginForm)
                    .then((response) => {
                        //window.location.href = response.data.redirect_url;
                        window.location.href = '/dashboard/inquiries';
                    })
                    .catch(() => {
                        this.loading = false;
                    });
            }
        },

        signup() {
            if (!this.loading) {
                this.loading = true;
                axios.post(`/signup`, this.signupForm).then((response) => {
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
    },
};

window.mixins.push(auth);