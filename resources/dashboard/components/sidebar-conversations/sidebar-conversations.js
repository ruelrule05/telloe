import Index from '../conversations/index/index.vue';
export default {
	components: { Index },
	created() {
		if (this.$route.query.tab) {
			this.$root.detailsTab = this.$route.query.tab;
		}
	}
};
