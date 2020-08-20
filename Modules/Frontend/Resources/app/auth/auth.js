import Login from './login.vue';
import Signup from './signup.vue';
import Recover from './recover.vue';
import Reset from './reset.vue';
import CloseIcon from '../../icons/close.vue';
import io from 'socket.io-client';
export default {
    components: {
        Login,
        Signup,
        Recover,
        Reset,

        CloseIcon,
    },

    data: () => ({
        pageloading: false,
        loading: false,
        open: false,
        error: '',

        GoogleAuth: null,
    }),

    created() {
        this.socket = io(WS_URL);
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

        FacebookLogin() {
            if (typeof FB != 'undefined') {
                this.pageloading = true;
                FB.login(
                    e => {
                        FB.api('/me', {fields: 'first_name, last_name, email'}, response => {
                            if (response && !response.error) {
                                response.action = this.$root.action;
                                let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                                let invite_token = this.$root.invite_token;
                                response.timezone = timezone;
                                response.invite_token = invite_token;
                                axios
                                    .post('/login/facebook', response)
                                    .then(response => {
                                        this.socket.emit('invite_token', invite_token);
                                        window.location.href = '/dashboard/conversations';
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
                        let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                        let invite_token = this.$root.invite_token;
                        let user = {
                            id: profile.getId(),
                            first_name: profile.getGivenName(),
                            last_name: profile.getFamilyName(),
                            email: profile.getEmail(),
                            image_url: profile.getImageUrl(),
                            action: this.$root.action,
                            timezone: timezone,
                            invite_token: invite_token
                        };
                        axios
                            .post('/login/google', user)
                            .then(response => {
                                this.socket.emit('invite_token', invite_token);
                                console.log(response.data);
                                window.location.href = '/dashboard/conversations';
                            })
                            .catch(e => {
                                this.pageloading = false;
                                this.error = e.response.data.message;
                            });
                    })
                    .catch(() => {
                        this.pageloading = false;
                        //this.error = 'Google API went wrong.';
                    });
            }
        },
    },
};
