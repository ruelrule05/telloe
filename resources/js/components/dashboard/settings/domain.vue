<template>
	<form class="d-flex form-inline" @submit.prevent="save">
		<input type="text" class="form-control" placeholder="Domain" v-model="widget.domain">
		<button class="btn btn-primary ml-1">Save</button>
	</form>
</template>

<script>
export default {
	data: () => ({
		widget: {}
	}),

	computed: {},

	created() {
		this.widget = this.$root.auth.widget;
	},

	watch: {},

	methods: {
		save() {
			axios.put('/dashboard/widget', this.widget).then((response) => {
				this.$toasted.success('Domain updated');
				this.$root.auth.widget = response.data;
			});
		}
	},
};
</script>