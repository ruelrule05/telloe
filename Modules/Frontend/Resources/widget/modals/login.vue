<template>
	<div v-if="!$root.auth">
		<!-- Login Modal -->
		<div class="snapturebox-modal" tabindex="-1" id="loginModal">
			<div class="snapturebox-modal-dialog snapturebox-modal-dialog-centered">
				<div class="snapturebox-modal-content">
					<div class="snapturebox-modal-body">
						<button
							type="button"
							class="snapturebox-btn snapturebox-position-absolute snapturebox-btn-close"
							@click="
								$root.toggleModal('#loginModal', 'hide');
								$root.loginForm.loading = false;
							"
							aria-label="Close"
						>
							<span aria-hidden="true">&times;</span>
						</button>
						<vue-form-validate @submit="$root.login">
							<h4 class="snapturebox-mb-4">Login to your account</h4>
							<div class="snapturebox-form-group">
								<input type="email" v-model="$root.loginForm.email" class="snapturebox-form-control snapturebox-border" data-required placeholder="Email" />
							</div>
							<div class="snapturebox-form-group">
								<input type="password" v-model="$root.loginForm.password" class="snapturebox-form-control snapturebox-border" data-required placeholder="Password" />
							</div>
							<button
								type="button"
								class="snapturebox-btn snapturebox-btn-light"
								@click="
									$root.toggleModal('#loginModal', 'hide');
									$root.toggleModal('#signupModal', 'show');
								"
							>
								Sign Up
							</button>
							<vue-button type="submit" :loading="$root.loginForm.loading" button_class="snapturebox-btn snapturebox-float-right snapturebox-btn-primary">Login</vue-button>
						</vue-form-validate>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>


<script>
	
</script>