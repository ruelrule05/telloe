import Index from './index/index.vue';
import Show from './show/show.vue';
export default {
	components: {Index, Show},
	created() {
        if(this.$route.query.tab) {
        	this.$root.detailsTab = this.$route.query.tab;
        }
	},
	methods: {
		showReady() {
			if(this.$root.windowLoaded && this.$root.intros.new_chat.enabled) {
				setTimeout(() => {
					if(!document.querySelector('.introjs-overlay')) {
						this.$root.introJS.start().goToStepNumber(this.$root.intros.new_chat.step);
					}
				}, 500);
			}
		}
	}
}