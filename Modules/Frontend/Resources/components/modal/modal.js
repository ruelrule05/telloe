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
        $(this.$refs['modal']).on('hidden.bs.modal', () => {
            this.$emit('hidden');
        });
    },

    methods: {
    	show() {
    		$(this.$refs['modal']).modal({keyboard: false, backdrop: 'static'}).modal('show');
    	},
        
        hide() {
            $(this.$refs['modal']).modal('hide');
        },
    }
}