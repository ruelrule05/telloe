import CloseIcon from '../../icons/close';
export default {
	components: {CloseIcon},

    props: {
        closeButton: {
            type: Boolean,
            default: true,
        }
    },

    data: () => ({
        modal: {
            size: '',
            loading: true,
        }
    }),

    methods: {
    	show() {
    		$(this.$refs['modal']).modal({keyboard: false, backdrop: 'static'}).modal('show');
    	},
        
        hide() {
            $(this.$refs['modal']).modal('hide');
        },
    }
}