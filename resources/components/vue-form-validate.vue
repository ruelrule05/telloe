<template>
    <form ref="form" @submit.prevent="submit"><slot></slot></form>
</template>

<script>
export default {
    data: () => ({
        valid: true,
        inputs: [],
    }),

    mounted() {
        this.inputs = $(this.$refs['form']).find('input, textarea');
    },

    methods: {
        submit() {
            this.valid = true;
            for (const input of this.inputs) {
                if (((input.type != 'password' && input.value.trim().length == 0) || (input.type == 'password' && input.value.length == 0)) && (input.getAttribute('required') || input.hasAttribute('data-required'))) {
                    input.value = '';
                    input.focus();
                    this.valid = false;
                    break;
                }

                if (input.type == 'text') input.value = input.value.trim();
            }
            if (this.valid) {
                this.$emit('submit');
            }
        },
    },
};
</script>
