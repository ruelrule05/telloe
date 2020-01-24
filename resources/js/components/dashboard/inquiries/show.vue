<template>
	<div v-if="inquiry">
		{{ inquiry }}
	</div>
</template>


<script>
	export default {
		data: () => ({
			inquiry: null
		}),

	    computed: {},

	    mounted() {},

	    created() {
			this.$root.heading = 'Inquiries';
			this.getData();
	    },


	    methods: {
	    	getData() {
	    		axios.get(`/dashboard/inquiries/${this.$route.params.id}`).then((response) => {
	    			this.inquiry = response.data;
	    		});
	    	},

	    	goTo(id) {
	    		this.$router.push(`/dashboard/inquiries/${id}`);
	    	}
	    }
	}

</script>