<template>
    <button :type="type" class="btn position-relative" :class="button_class" :disabled="loading || disabled" @click="$emit('click')">
        <span v-if="loading" class="spinner position-absolute-center">
            <span class="spinner-border spinner-border-sm align-middle" role="status" aria-hidden="true"></span>
        </span>
        <div :class="{'opacity-0': loading}">
            <template v-if="icon"><i :class="icon"></i>&nbsp;&nbsp;</template><slot></slot>
        </div>
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
