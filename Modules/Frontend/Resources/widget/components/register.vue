<template>
	<div class="snapturebox-bg-light snapturebox-rounded snapturebox-p-2">
		<vue-form-validate @submit="signup">
		    <div class="snapturebox-form-group snapturebox-mb-1">
		        <input type="text" v-model="form.first_name" class="snapturebox-form-control snapturebox-border" data-required placeholder="First Name" />
		    </div>
		    <div class="snapturebox-form-group snapturebox-mb-1">
		        <input type="text" v-model="form.last_name" class="snapturebox-form-control snapturebox-border" data-required placeholder="Last Name" />
		    </div>
		    <div class="snapturebox-form-group snapturebox-mb-1">
		        <input type="email" v-model="form.email" class="snapturebox-form-control snapturebox-border" data-required placeholder="Email" />
		    </div>
		    <div class="snapturebox-form-group snapturebox-mb-1">
		        <input type="tel" v-model="form.phone" class="snapturebox-form-control snapturebox-border" data-required placeholder="Phone" />
		    </div>
		    <div class="snapturebox-form-group snapturebox-mb-1">
		        <input type="password" v-model="form.password" class="snapturebox-form-control snapturebox-border" data-required placeholder="Password" />
		    </div>
		    <div class="snapturebox-text-right">
		    	<vue-button type="submit" :loading="loading" button_class="snapturebox-btn snapturebox-btn-sm snapturebox-ml-auto snapturebox-btn-primary">Sign Up</vue-button>
		    </div>
		</vue-form-validate>
		<div v-if="error" class="snapturebox-text-danger snapturebox-text-center">{{ error }}</div>
	</div>
</template>

<script>
	export default {
		data: () => ({
	        form: {
	        	first_name: '',
		        last_name: '',
		        email: '',
		        phone: '',
		        password: '',
		    },
	        loading: false,
	        error: '',
	    }),


	    methods: {
	        signup() {
	            this.loading = true;
	            SBAxios.post('/auth/signup', this.form)
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