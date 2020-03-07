<template>
    <button :type="type" class="snapturebox-btn snapturebox-position-relative" :class="button_class" :disabled="loading || disabled">
        <span v-if="loading" class="snapturebox-spinner">
            <span class="snapturebox-spinner-border snapturebox-spinner-border-sm snapturebox-align-middle" role="status" aria-hidden="true"></span>
        </span>
        <span :class="{'snapturebox-opacity-0': loading}">
            <template v-if="icon"><i :class="icon"></i>&nbsp;&nbsp;</template><slot></slot>
        </span>
    </button>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            default: '',
        },

        type: {
            type: String,
            default: 'button',
        },

        icon: {
            type: String,
            default: '',
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
