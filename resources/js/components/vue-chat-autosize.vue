a<template>
    <div class="chat-autosize position-relative text-left">
        <div ref="resizer" class="text-left py-2 border-0 d-inline-block mw-100 w-auto position-relative opacity-0" style="white-space: pre-wrap;">{{ value }}</div>

        <div class="textarea-wrapper position-absolute no-drag" :class="{'w-100': !text.trim().length}" style="top: 0; left: 0;">
            <textarea v-model="text" @input="resize" @keydown="keydown" @blur="onBlur" class="no-drag border-0 outline-0 bg-transparent overflow-hidden d-block mw-100" rows="1" spellcheck="false" ref="textarea" placeholder="Write your message.."></textarea>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: String,
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
                this.$refs['textarea'].style.width = this.$refs['resizer'].offsetWidth + 3 + 'px';
                this.$refs['textarea'].style.height = `${this.$refs['textarea'].scrollHeight}px`;
            } else {
                this.$refs['resizer'].textContent = '';
                this.$refs['textarea'].style.width = '100%';
                this.$refs['textarea'].style.height = 'auto';
            }
            this.$emit('input', this.text);
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
