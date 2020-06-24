import VueFormValidate from '../../../components/vue-form-validate.vue';
export default {
	components: {VueFormValidate},

	data: () => ({
		user: null,
		securityForm: {
			current_password: '',
			password: '',
			password_confirmation: '',
		}
	}),

	mounted() {
		this.$root.contentloading = false;
	},

	created() {
		this.user = Object.assign({}, this.$root.auth);
		this.$root.heading = 'Account';
	},


	methods: {
		save() {
			axios.put('/auth', this.user, {toasted: true}).then((response) => {
				this.$root.auth = response.data;
			});
		},

		password() {
			axios.put('/auth/password', this.securityForm, {toasted: true});
		},

		nospace(e) {
			if (e.which === 32) e.preventDefault();
		}
	},
};