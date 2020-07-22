import CloseIcon from '../../icons/close';
export default {
	components: {CloseIcon},

    props: {
        closeButton: {
            type: Boolean,
            default: true,
        },

        loading: {
            type: Boolean,
            default: false,
        },

        size: {
            type: String,
            default: '',
        }
    },


    mounted() {
        $(this.$refs['modal']).on('show.bs.modal', () => {
            this.$emit('show');
        });
        $(this.$refs['modal']).on('shown.bs.modal', () => {
            this.$emit('shown');
        });
        $(this.$refs['modal']).on('hide.bs.modal', () => {
            this.$emit('hide');
        });
        $(this.$refs['modal']).on('hidden.bs.modal', () => {
            this.$emit('hidden');
        });
    },

    methods: {
    	async show() {
    		return new Promise((resolve, reject) => {
                $(this.$refs['modal']).modal({keyboard: false, backdrop: 'static'}).modal('show');
                setTimeout(() => {
                    resolve();
                }, 150);
            });
    	},
        
        async hide() {
            return new Promise((resolve, reject) => {
                $(this.$refs['modal']).modal('hide');
                setTimeout(() => {
                    resolve();
                }, 150);
            });
        },
    }
}