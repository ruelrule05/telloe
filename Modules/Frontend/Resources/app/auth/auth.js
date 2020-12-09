/* global FB */
/* global WS_URL */
/* global gapi */
import Login from './login.vue';
import Signup from './signup.vue';
import Recover from './recover.vue';
import Reset from './reset.vue';
import CloseIcon from '../../icons/close.vue';
import io from 'socket.io-client';
import jstz from 'jstz';
const timezone = jstz.determine();

export default {
	components: {
		Login,
		Signup,
		Recover,
		Reset,

		CloseIcon
	},

	data: () => ({
		pageloading: false,
		loading: false,
		open: false,
		error: '',

		GoogleAuth: null,
		timezone: ''
	}),

	created() {
		this.socket = io(WS_URL);
		this.timezone = timezone.name();
		if (typeof gapi != 'undefined') {
			gapi.load('auth2', () => {
				this.GoogleAuth = gapi.auth2.init({ client_id: '187405864135-kboqmukelf9sio1dsjpu09of30r90ia1.apps.googleusercontent.com' });
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
					() => {
						FB.api('/me', { fields: 'first_name, last_name, email' }, response => {
							if (response && !response.error) {
								response.action = this.$root.action;
								let invite_token = this.$root.invite_token;
								let member_invite_token = this.$root.member_invite_token;
								response.timezone = this.timezone;
								response.invite_token = invite_token;
								response.member_invite_token = member_invite_token;
								window.axios
									.post('/login/facebook', response)
									.then(response => {
										this.socket.emit('invite_token', invite_token);
										this.socket.emit('member_invite_token', member_invite_token);
										setTimeout(() => {
											if (response.data.role_id == 2) {
												window.location.replace('/dashboard/bookings/services');
											} else if (response.data.role_id == 3) {
												window.location.replace('/dashboard/bookings');
											}
										}, 150);
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
					{ scope: 'email' }
				);
			}
		},

		Googlesignin() {
			if (this.GoogleAuth) {
				this.pageloading = true;
				this.GoogleAuth.signIn({ scope: 'profile email' })
					.then(googleUser => {
						let profile = googleUser.getBasicProfile();
						let invite_token = this.$root.invite_token;
						let member_invite_token = this.$root.member_invite_token;
						let user = {
							id: profile.getId(),
							first_name: profile.getGivenName(),
							last_name: profile.getFamilyName(),
							email: profile.getEmail(),
							image_url: profile.getImageUrl(),
							action: this.$root.action,
							timezone: this.timezone,
							invite_token: invite_token,
							member_invite_token: member_invite_token
						};
						window.axios
							.post('/login/google', user)
							.then(response => {
								this.socket.emit('invite_token', invite_token);
								this.socket.emit('member_invite_token', member_invite_token);
								setTimeout(() => {
									if (response.data.role_id == 2) {
										window.location.replace('/dashboard/bookings/services');
									} else if (response.data.role_id == 3) {
										window.location.replace('/dashboard/bookings');
									}
								}, 150);
							})
							.catch(e => {
								this.pageloading = false;
								this.error = e.response.data.message;
							});
					})
					.catch(e => {
						console.log(e);
						this.pageloading = false;
						//this.error = 'Google API went wrong.';
					});
			}
		}
	}
};
