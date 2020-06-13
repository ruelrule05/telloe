a<template>
    <div class="chat-autosize position-relative text-left">
        <div ref="resizer" class="resizer text-left border py-2 d-inline-block mw-100 w-auto position-relative opacity-0">{{ value || placeholder }}</div>

        <!-- <div ref="textarea-wrapper" class="textarea-wrapper position-abxsolute no-drag" :class="{'w-100': !text.trim().length}">
            <div :class="wrapper_class"> -->
        <div class="position-absolute no-drag textarea-wrapper" :class="[{'w-100': !text.trim().length}, wrapper_class]">
            <textarea v-model="text" @input="resize(); emitResize();" @keydown="keydown" @blur="onBlur" class="no-drag outline-0 overflow-hidden d-block mw-100" :class="textarea_class" rows="1" spellcheck="false" ref="textarea" :placeholder="placeholder"></textarea>
            <slot></slot>
        </div>
         <!--    </div>
        </div>   -->
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: String,
        },

        placeholder: {
            type: String,
        },

        wrapper_class: {
            type: String,
        },

        textarea_class: {
            type: String,
            default: 'bg-gray-200 border'
        }
    },
    data: () => ({
        text: ''
    }),

    created() {
        this.text = this.value || '';
    },
 
    mounted() {
        this.$nextTick(() => {
            this.$refs['textarea'].setAttribute('style', 'height', `${this.$el.scrollHeight}px`);
            this.$refs['textarea'].style.resize = 'none';
            this.resize();
        });
    },

    methods: {
        resize(e) {
            if (this.text.trim().length) {
                this.$refs['resizer'].textContent = this.$refs['textarea'].value.trim();
                this.$refs['textarea'].style.width = `${this.$refs['resizer'].offsetWidth + 2}px`;
                this.$refs['textarea'].style.height = `${this.$refs['resizer'].offsetHeight - 5}px`;
            } else {
               // this.$refs['resizer'].textContent = '';
                this.$refs['textarea'].style.width = '100%';
                this.$refs['textarea'].style.height = 'auto';
            }
            this.$emit('input', this.text);
        },

        emitResize(e) {
            this.$emit('resize', e, this);
        },

        keydown(e) {
            if (e.keyCode == 13) e.preventDefault();
        },

        onBlur(e) {
            this.text = this.text.trim();
            this.resize();
            this.$emit('blur', e, this);
        }
    },
};
</script>
