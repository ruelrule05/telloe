<template>
	<div class="snapturebox-bg-light snapturebox-rounded snapturebox-p-2">
		<vue-form-validate @submit="login" >
			<div class="snapturebox-form-group snapturebox-mb-1">
				<input type="email" v-model="form.email" class="snapturebox-form-control snapturebox-border" data-required placeholder="Email" />
			</div>
			<div class="snapturebox-form-group snapturebox-mb-1">
				<input type="password" v-model="form.password" class="snapturebox-form-control snapturebox-border" data-required placeholder="Password" />
			</div>
		    <div class="snapturebox-text-right">
				<vue-button type="submit" :loading="loading" button_class="snapturebox-btn snapturebox-btn-sm snapturebox-btn-primary">Login</vue-button>
			</div>
		</vue-form-validate>
		<div v-if="error" class="snapturebox-text-danger snapturebox-text-center">{{ error }}</div>
	</div>
</template>

<script>
	export default {
		data: () => ({
	        form: {
	        	email: '',
	        	password: '',
	        },
	        loading: false,
	        error: ''
	    }),

	    methods: {
	        login() {
	            this.loading = true;
	            SBAxios.post('/auth/login', this.form)
	                .then((response) => {
	                	this.$root.getData();
	                    window.localStorage.setItem('snapturebox_access_token', response.data.access_token);
	                })
	                .catch((e) => {
	                	this.error = e.response.data.message;
	                    this.loading = false;
	                });
	        },
	    }
	}
</script>