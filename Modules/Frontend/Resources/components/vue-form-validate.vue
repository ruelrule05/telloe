<template>
    <form ref="form" @submit.prevent="submit($event)"><slot></slot></form>
</template>

<script>
export default {
    data: () => ({
        valid: true,
    }),

    mounted() {
        this.$emit('mounted');
    },

    methods: {
        submit(e) {
            this.valid = true;
            let inputs = $(this.$refs['form']).find('input, textarea, select');
            for (const input of inputs) {
                if (((input.type != 'password' && input.value.trim().length == 0) || (input.type == 'password' && input.value.length == 0)) && (input.getAttribute('required') || input.hasAttribute('data-required'))) {
                    input.value = '';
                    input.focus();
                    this.valid = false;
                    break;
                }

                if (input.type == 'text') input.value = input.value.trim();
            }
            if (this.valid) {
                this.$emit('submit', e);
            }
        },
    },
};
</script>
