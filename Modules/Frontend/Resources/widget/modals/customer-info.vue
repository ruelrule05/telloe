<template>
	<!-- Customer Info Modal -->
            <div class="snapturebox-modal" tabindex="-1" id="customerInfoModal">
                <div class="snapturebox-modal-dialog snapturebox-modal-dialog-centered">
                    <div class="snapturebox-modal-content">
                        <div class="snapturebox-modal-body">
                            <button
                                :disabled="$root.customerForm.loading"
                                type="button"
                                class="snapturebox-btn snapturebox-position-absolute snapturebox-btn-close"
                                @click="
                                    $root.toggleModal('#customerInfoModal', 'hide');
                                    $root.loginForm.loading = false;
                                "
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <vue-form-validate @submit="$root.book">
                                <h4 class="snapturebox-mb-4">Customer Information Form</h4>
                                <div class="snapturebox-form-group">
                                    <input type="text" v-model="$root.customerForm.first_name" class="snapturebox-form-control" data-required placeholder="First Name" />
                                </div>
                                <div class="snapturebox-form-group">
                                    <input type="text" v-model="$root.customerForm.last_name" class="snapturebox-form-control" data-required placeholder="Last Name" />
                                </div>
                                <div class="snapturebox-form-group">
                                    <input type="email" v-model="$root.customerForm.email" class="snapturebox-form-control" data-required placeholder="Email" />
                                </div>
                                <div class="snapturebox-form-group">
                                    <input type="text" v-model="$root.customerForm.phone" class="snapturebox-form-control" data-required placeholder="Phone" />
                                </div>

                                <div class="snapturebox-text-right">
                                    <button v-if="$root.customerForm.skipButton" type="button" class="snapturebox-btn snapturebox-btn-light" @click="$root.book">Skip this step</button>
                                    <vue-button type="submit" :loading="$root.customerForm.loading" button_class="snapturebox-btn snapturebox-btn-primary">Submit and Book</vue-button>
                                </div>
                            </vue-form-validate>
                        </div>
                    </div>
                </div>
            </div>
</template>