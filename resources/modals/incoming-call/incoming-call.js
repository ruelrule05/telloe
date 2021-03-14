const mime = require('mime');
import dayjs from 'dayjs';
import VideoIcon from '../../icons/video';
import CloseIcon from '../../icons/close';
import DuplicateAltIcon from '../../icons/duplicate-alt';
import DownloadIcon from '../../icons/download';
import ArrowRightIcon from '../../icons/arrow-right';
import MultiStreamsMixer from 'multistreamsmixer';
export default {
	components: { VideoIcon, CloseIcon, DuplicateAltIcon, DownloadIcon, ArrowRightIcon },
	props: {
		caller: {
			required: true
		}
	},

	data: () => ({}),

	watch: {},

	created() {},

	methods: {
		// show() {
		// 	$(this.$refs['modal']).modal({keyboard: false, backdrop: 'static'}).modal('show');
		// },
		// hide() {
		//     $(this.$refs['modal']).modal('hide');
		// },
	}
};
