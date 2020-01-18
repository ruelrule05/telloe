<template>
    <button :type="type" class="btn position-relative btn-spinner" :class="button_class" :disabled="loading || disabled">
        <span v-if="loading" class="spinner">
            <span class="spinner-border spinner-border-sm align-middle" role="status" aria-hidden="true"></span>
        </span>
        <span :class="{'opacity-0': loading}">
            <slot></slot>
        </span>
    </button>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            default: 'button',
        },

        button_class: {
            type: String,
            default: 'btn-block btn-primary',
        },

        loading: {
            type: Boolean,
            default: false,
        },

        disabled: {
            type: Boolean,
            default: false,
        },
    },

    data: () => ({}),

    mounted() {},

    methods: {},
};
</script>