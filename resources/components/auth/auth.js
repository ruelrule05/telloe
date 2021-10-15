import Login from './login.vue';
import Signup from './signup.vue';
import Recover from './recover.vue';
import Reset from './reset.vue';
import CloseIcon from '../../icons/close.vue';
import jstz from 'jstz';
const timezone = jstz.determine();
import axios from 'axios';

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
		timezone: '',
		heading: ''
	}),

	watch: {
		open: function(value) {
			if (value) {
				document.body.classList.add('overflow-hidden');
				document.body.classList.add('modal-open');
			} else {
				document.body.classList.remove('overflow-hidden');
				document.body.classList.remove('modal-open');
			}
		}
	},

	created() {
		this.timezone = timezone.name();
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
			}, 1000);
		},

		async FacebookLogin() {
			this.pageloading = true;
			let response = await axios.get('/auth/facebook/redirect');
			window.location.href = response.data;
		},

		async GoogleSignin() {
			this.pageloading = true;
			let response = await axios.get('/auth/google/redirect');
			window.location.href = response.data;
		}
	}
};
