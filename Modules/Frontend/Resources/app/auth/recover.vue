<template>
	<div class="row h-100 w-100 justify-content-center align-items-center mx-0" v-cloak>
		<div class="col-md-10">
			<div class="text-center" v-if="recoverForm.success">
				<checkmark-icon class="fill-success" width="50" height="50"></checkmark-icon>
				<h3 class="mt-2 mb-0 font-heading">Password reset link sent</h3>
				<div class="text-muted mb-4">We have sent you the instructions on how to reset your password</div>
				<button class="btn btn-light btn-lg shadow-none" type="button" @click="$root.action = 'login'">Log In</button>
			</div>
			<vue-form-validate @submit="recover" v-else>
				<h1 class="h3 mb-1 font-heading">Forgot your password?</h1>
				<div class="mb-3 text-secondary">We'll email you instructions on how to recover your account</div>
				<div class="form-group">
					<input type="email" v-model="recoverForm.email" class="form-control form-control-lg" data-required placeholder="Email" />
				</div>
				<vue-button type="submit" :loading="loading" button_class="btn btn-primary btn-block btn-lg shadow-none">Send reset link</vue-button>
				<button type="button" class="btn btn-link btn-sm d-flex align-items-center text-body px-0" @click="$root.action = 'login'"><arrow-left-icon></arrow-left-icon> Log In</button>
			</vue-form-validate>
		</div>
	</div>
</template>

<script>
import VueFormValidate from '../../components/vue-form-validate.vue';
import VueButton from '../../components/vue-button.vue';
import ArrowLeftIcon from '../../icons/arrow-left';
import CheckmarkIcon from '../../icons/checkmark';
export default {
	components: { VueFormValidate, VueButton, ArrowLeftIcon, CheckmarkIcon },
	data: () => ({
		recoverForm: {
			email: '',
			success: false
		},
		loading: false
	}),

	created() {},

	methods: {
		recover() {
			this.loading = true;
			window.axios
				.post('/recover', this.recoverForm)
				.then(() => {
					this.loading = false;
					this.recoverForm.success = true;
					this.$parent.error = '';
				})
				.catch(e => {
					this.loading = false;
					this.$parent.error = e.response.data.message;
				});
		}
	}
};
</script>
