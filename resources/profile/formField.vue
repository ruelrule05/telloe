<template>
	<div>
		<label :for="field.name">{{ field.label }}</label>
		<VueSelect v-if="field.type == 'autocomplete'" :id="field.name" :placeholder="field.label" dropPosition="w-full" :options="formatOptions(field.values)"></VueSelect>

		<div v-else-if="field.type == 'checkbox-group'">
			<div v-for="(option, optionIndex) in field.values" :key="optionIndex" class="mb-1">
				<VueCheckbox :value="option.selected" :label="option.label"></VueCheckbox>
			</div>
		</div>
	</div>
</template>

<script>
import VueSelect from '../components/vue-select/vue-select.vue';
import VueCheckbox from '../components/vue-checkbox/vue-checkbox.vue';
export default {
	props: {
		field: {
			type: Object,
			required: true
		}
	},

	components: { VueSelect, VueCheckbox },

	methods: {
		formatOptions(values) {
			return values.map(v => {
				return {
					text: v.label,
					value: v.value
				};
			});
		}
	}
};
</script>

<style lang="scss" scoped></style>
