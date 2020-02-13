<template>
	<div class="text-center pt-4">
		<div v-if="loading">
			<div class="spinner-border spinner-border-sm" role="status">
				<span class="sr-only">Loading...</span>
			</div>
		</div>
		<div :class="{'opacity-0': loading}" class="fb-send-to-messenger" messenger_app_id="1187408638266444" page_id="107986260772560" color="blue" :data-ref="$root.auth.id" cta_text="SUBSCRIBE_IN_MESSENGER" size="large"></div>
	</div>
</template>

<script>
// forever page access token = EAAQ38R4WTEwBAAArvJrFSYHsF3WHSpaV4NcVk9spHu1l8BPz59nwJqw4yovYWzcx1OUirdR6OblqTds5kLDpXT57pyh0eoSXTBWwf61jpZCuhqIdTv2qy7s7QvXsOmMzMY4a9TYJvCQzW2K9nVJgM0Ao1B6D6ZA0j87pEtVjhKex4Npv4N
// App Page Token = EAAQ38R4WTEwBAEsNRcOAQlXsLcRcSIwbYLETLjLEZAXJfb7O5MBfaIcnZB4dguF7fsJMjbM270IGBwD0qMXpNGFrYVt2kF7Jen9SFFNdZChE5JDOmjJciLHp20NCPqyogIanJZCNfSUmE2Wdi4FiHDuFv2nr7QebHVbB9uOZACwZDZD
//document.cookie = 'fblo_1187408638266444=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';;
export default {
	data: () => ({
		loading: true,
	}),

	mounted() {
		/*axios.post('/fb_notify').then((response) => {
			console.log(response.data);
		});*/
		if (typeof FB == 'undefined') {
			this.$root.$on('FBInit', () => {
				this.$root.FBParse().then(() => (this.loading = false));
			});
		} else {
			this.$root.FBParse().then(() => (this.loading = false));
		}
	},

	created() {
		this.$root.heading = 'Notifications';
	},

	watch: {},

	methods: {},
};
</script>
