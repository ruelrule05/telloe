<template>
    <form ref="form" @submit.prevent="submit"><slot></slot></form>
</template>

<script>
export default {
    data: () => ({
        valid: true,
        inputs: []
    }),

    mounted() {
        this.inputs = $(this.$refs['form']).find('input, textarea');
        this.$el.querySelector('button[type=submit]').onclick = () => {
            this.submit();
        }
    },

    methods: {
        submit() {
            this.valid = true;
            for (const input of this.inputs) {
                if ( 
                    (
                        (input.type != 'password' && input.value.trim().length == 0) ||
                        (input.type == 'password' && input.value.length == 0)
                    )
                    && (input.getAttribute('required') || input.hasAttribute('data-required'))
                ) {
                    input.value = '';
                    input.focus();
                    this.valid = false;
                    break;
                }
            }
            if (this.valid) {
                this.$emit('submit');
            }
        }
    },
};
</script>