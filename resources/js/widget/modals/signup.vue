<template>
    <div v-if="!$root.auth">
        <!-- Signup Modal -->
        <div class="snapturebox-modal" tabindex="-1" id="signupModal">
            <div class="snapturebox-modal-dialog snapturebox-modal-dialog-centered">
                <div class="snapturebox-modal-content">
                    <div class="snapturebox-modal-body">
                        <button
                            type="button"
                            class="snapturebox-btn snapturebox-position-absolute snapturebox-btn-close"
                            @click="
                                $root.toggleModal('#signupModal', 'hide');
                                $root.signupForm.loading = false;
                            "
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <vue-form-validate @submit="$root.signup">
                            <h4 class="snapturebox-mb-4">Create your account</h4>
                            <div class="snapturebox-form-group">
                                <input type="text" v-model="$root.signupForm.first_name" class="snapturebox-form-control snapturebox-border" data-required placeholder="First Name" />
                            </div>
                            <div class="snapturebox-form-group">
                                <input type="text" v-model="$root.signupForm.last_name" class="snapturebox-form-control snapturebox-border" data-required placeholder="Last Name" />
                            </div>
                            <div class="snapturebox-form-group">
                                <input type="email" v-model="$root.signupForm.email" class="snapturebox-form-control snapturebox-border" data-required placeholder="Email" />
                            </div>
                            <div class="snapturebox-form-group">
                                <input type="tel" v-model="$root.signupForm.phone" class="snapturebox-form-control snapturebox-border" data-required placeholder="Phone" />
                            </div>
                            <div class="snapturebox-form-group">
                                <input type="password" v-model="$root.signupForm.password" class="snapturebox-form-control snapturebox-border" data-required placeholder="Password" />
                            </div>

                            <button
                                type="button"
                                class="snapturebox-btn snapturebox-btn-light"
                                @click="
                                    $root.toggleModal('#signupModal', 'hide');
                                    $root.toggleModal('#loginModal', 'show');
                                "
                            >
                                Log In
                            </button>
                            <vue-button type="submit" :loading="$root.signupForm.loading" button_class="snapturebox-btn snapturebox-float-right snapturebox-btn-primary">Sign Up</vue-button>
                        </vue-form-validate>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    
</script>