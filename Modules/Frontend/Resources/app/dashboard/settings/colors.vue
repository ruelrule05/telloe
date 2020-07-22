<template>
	<div>
		<div class="mb-2">Background color</div>
		<color-picker :color="widget.colors.background_color" @change="change"></color-picker>
		<button class="btn btn-sm btn-primary mt-2" @click="save">Save</button>
	</div>
</template>

<script>
import ColorPicker from 'v-color';
export default {
	components: {ColorPicker},

	data: () => ({
		widget: {}
	}),

	computed: {},

	created() {
		this.widget = this.$root.auth.widget;
		if(!this.widget.colors) this.widget.colors = {};
	},

	watch: {},

	methods: {
		change(color) {
			this.widget.colors.background_color = color.hex
		},

		save() {
			axios.put('/dashboard/widget', this.widget).then((response) => {
				this.$root.auth.widget = response.data;
				this.$toasted.success('Colors updated');
			});
		}
	},
};
</script>
