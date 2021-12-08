<template>
	<div class="relative">
		<label v-if="field.type != 'header' && field.type != 'paragraph'" :for="field.name" :required="field.required">{{ strip(field.label) }}</label>

		<!-- Checkbox group -->
		<div v-if="field.type == 'checkbox-group'">
			<div v-for="(option, optionIndex) in field.values" :key="optionIndex" class="mb-1">
				<VueCheckbox @input="updateCheckbox($event, option)" :value="fieldValue ? fieldValue[option.value] : false" :label="option.label" :data-required="field.required"></VueCheckbox>
			</div>
		</div>

		<!-- Date -->
		<div class="datepicker" v-else-if="field.type == 'date'">
			<v-date-picker class="relative" v-model="fieldValue" :popover="{ placement: 'bottom', visibility: 'click' }" :masks="masks">
				<template v-slot="{ inputValue, inputEvents }">
					<input type="text" readonly v-on="inputEvents" :data-required="field.required" :placeholder="field.placeholder" :value="inputValue" />
				</template>
			</v-date-picker>
		</div>

		<!-- File -->
		<input type="file" @change="updateFile" v-else-if="field.type == 'file'" :data-required="field.required" :placeholder="field.placeholder" />

		<!-- Header -->
		<component v-else-if="field.type == 'header'" :is="field.subtype">{{ field.label }}</component>

		<!-- Number -->
		<input type="number" v-else-if="field.type == 'number'" v-model="fieldValue" :data-required="field.required" :placeholder="field.placeholder" />

		<!-- Paragraph -->
		<p v-else-if="field.type == 'paragraph'">{{ field.label }}</p>

		<!-- Select -->
		<VueSelect v-if="field.type == 'select'" :id="field.name" :placeholder="field.placeholder" :data-required="field.required" dropPosition="w-full" :options="formatOptions(field.values)" @input="updateSelect"></VueSelect>

		<!-- Text -->
		<input type="text" v-model="fieldValue" v-else-if="field.type == 'text'" :data-required="field.required" :placeholder="field.placeholder" />

		<!-- Textarea -->
		<textarea v-else-if="field.type == 'textarea'" v-model="fieldValue" class="resize-none" :data-required="field.required" :rows="field.rows" :placeholder="field.placeholder"></textarea>

		<!-- Radio group -->
		<div v-else-if="field.type == 'radio-group'" v-for="(option, optionIndex) in field.values" :key="optionIndex" class="mb-1">
			<label :for="option.value" class="inline-flex cursor-pointer items-center mb-0">
				<input type="radio" class="ring-opacity-0 shadow-none cursor-pointer" :id="option.value" :value="option.label" :name="field.name" v-model="fieldValue" />
				<span class="ml-2">{{ option.label }}</span>
			</label>
		</div>
	</div>
</template>

<script>
import VueSelect from '../components/vue-select/vue-select.vue';
import VueCheckbox from '../components/vue-checkbox/vue-checkbox.vue';
import VDatePicker from 'v-calendar/lib/components/date-picker.umd';

export default {
	props: {
		field: {
			type: Object,
			required: true
		},
		value: {}
	},

	components: { VueSelect, VueCheckbox, VDatePicker },

	data: () => ({
		masks: {
			input: 'MMMM D, YYYY'
		},
		fieldValue: null
	}),

	watch: {
		fieldValue: function () {
			this.$emit('input', this.fieldValue);
		}
	},

	created() {
		this.fieldValue = this.value;
	},

	methods: {
		strip(html) {
			var tmp = document.implementation.createHTMLDocument('New').body;
			tmp.innerHTML = html;
			return tmp.textContent || tmp.innerText || '';
		},

		updateSelect(value) {
			this.fieldValue = value;
		},
		async updateFile(e) {
			if (e.target.value) {
				this.fieldValue = await this.fileToBase64(e.target.files[0]);
			} else {
				this.fieldValue = null;
			}
		},
		updateCheckbox(state, option) {
			if (!this.fieldValue) {
				this.fieldValue = {};
			}
			if (state) {
				this.$set(this.fieldValue, option.value, option.label);
			} else {
				this.$delete(this.fieldValue, option.value);
			}
		},

		fileToBase64(file) {
			return new Promise((resolve, reject) => {
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = () => resolve(reader.result);
				reader.onerror = error => reject(error);
			});
		},

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

<style lang="scss" scoped>
.datepicker {
	span {
		@apply block;
	}
}
h1 {
	@apply text-3xl;
}
h2 {
	@apply text-2xl;
}
h3 {
	@apply text-xl;
}
h4 {
	@apply text-lg;
}
input[type='radio'] {
	width: 14px;
	height: 14px;
}
</style>
