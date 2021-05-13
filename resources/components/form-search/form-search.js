import Vue from 'vue';
import vueDebounce from 'vue-debounce';
Vue.use(vueDebounce, {
	listenTo: 'input'
});
import CloseIcon from '../../icons/close';
export default {
	props: {
		searchUrl: {
			type: String,
			required: true
		},
		inputClass: {
			type: String,
			default: ''
		},
		placeholder: {
			type: String,
			default: ''
		},
		default: {
			type: Array,
			default: () => []
		}
	},

	components: {
		CloseIcon
	},

	data: () => ({
		query: '',
		searching: false,
		results: []
	}),

	computed: {
		trimmedQuery() {
			return this.query.trim();
		},
		parsedUrl() {
			let parsedUrl = this.searchUrl;
			let queryAppend = '?';
			if (parsedUrl.indexOf(queryAppend) > -1) queryAppend = '&';
			parsedUrl += `${queryAppend}query=${this.trimmedQuery}`;

			return parsedUrl;
		}
	},

	watch: {
		trimmedQuery: function(value) {
			if (value.length > 0) this.searching = true;
			else {
				this.searching = false;
				this.results = [];
			}
		},
		default: function(value) {
			if (this.results.length == 0) this.results = value;
		},
		results: function(value) {
			if (value.length == 0 && this.default.length > 0) this.results = this.default;
		}
	},

	methods: {
		reset() {
			this.query = '';
			this.$refs['queryInput'].focus();
		},

		search() {
			if (this.trimmedQuery.length > 0) {
				window.axios.get(this.parsedUrl).then(response => {
					this.searching = false;
					this.results = response.data;
				});
			}
		}
	}
};
