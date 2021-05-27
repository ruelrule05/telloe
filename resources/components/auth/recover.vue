<template>
	<div class="row h-100 w-100 justify-content-center align-items-center mx-0" v-cloak>
		<div class="col-md-10">
			<div class="text-center" v-if="recoverForm.success">
				<div class="text-muted mb-4">We have sent you the instructions on how to reset your password.</div>
				<button class="btn btn-primary" type="button" @click="$root.action = 'login'"><span>Log In</span></button>
			</div>
			<vue-form-validate @submit="recover" v-else>
				<div class="text-muted -mt-6 mb-8">We'll email you instructions on how to recover your account.</div>
				<input type="email" v-model="recoverForm.email" class="form-control form-control-lg" data-required placeholder="Email" />
				<div class="flex justify-between mt-6">
					<button type="button" class="font-bold" @click="$root.action = 'login'"><u>Log In</u></button>
					<vue-button type="submit" :loading="loading" button_class="btn btn-primary"><span>Send reset link</span></vue-button>
				</div>
			</vue-form-validate>
		</div>
	</div>
</template>

<script>
import VueFormValidate from '../../components/vue-form-validate.vue';
import VueButton from '../../components/vue-button.vue';
export default {
	components: { VueFormValidate, VueButton },
	data: () => ({
		recoverForm: {
			email: '',
			success: false
		},
		loading: false
	}),

	created() {
		this.$parent.heading = 'Reset Password';
	},

	methods: {
		recover() {
			this.loading = true;
			window.axios
				.post('/recover', this.recoverForm, { toast: true })
				.then(() => {
					this.loading = false;
					this.recoverForm.success = true;
					this.$parent.error = '';
					this.$parent.heading = 'Password reset link sent';
				})
				.catch(e => {
					this.loading = false;
					this.$parent.error = e.response.data.message;
				});
		}
	}
};
</script>
