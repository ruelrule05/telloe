import Index from './index/index.vue';
import Show from './show/show.vue';
export default {
	components: { Index, Show },
	created() {
		if (this.$route.query.tab) {
			this.$root.detailsTab = this.$route.query.tab;
		}
	},
	methods: {
		showReady() {
			if (this.$root.intros.conversations.enabled) {
				setTimeout(() => {
					if (!document.querySelector('.introjs-overlay')) {
						this.$root.intros.conversations.intro.start();
					}
				}, 500);
			}
		}
	}
};
