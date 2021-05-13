import BookIcon from '../../../icons/book';
import CloseIcon from '../../../icons/close';
import ShortcutIcon from '../../../icons/shortcut';
import Vue from 'vue';
import vueDebounce from 'vue-debounce';
Vue.use(vueDebounce, {
	listenTo: 'input'
});
const striptags = require('striptags');
export default {
	components: {
		BookIcon,
		CloseIcon,
		ShortcutIcon
	},
	data: () => ({
		open: false,
		loading: true,
		topics: [],
		search: ''
	}),

	watch: {
		open: function(value) {
			if (!value) {
				this.search = '';
				this.getTopics();
			}
		}
	},

	created() {
		this.getTopics();
	},
	methods: {
		stripTags(string) {
			return striptags(string);
		},

		async getTopics() {
			this.loading = true;
			let response = await fetch(`https://docs.telloe.com/wp-json/wp/v2/docs?search=${this.search}`);
			let data = await response.json();
			this.topics = data;
			this.loading = false;
		}
	}
};
