import {mapActions} from 'vuex';

import CloseIcon from '../../icons/close';
export default {
	components: {
		CloseIcon,
	},
	
	data: () => ({
		open: false,
		notification: {},
	}),

	watch: {
		open: function(value) {
			if(value) {
				setTimeout(() => {
					this.open = false;
				}, 5000);
			}
		}
	},

	methods: {
        ...mapActions({
            updateNotification: 'notifications/update',
        }),

		show(notification) {
			this.notification = notification;
			this.open = true;
		},

		goToNotifLink() {
			if(this.notification && this.notification.link && this.$route.fullPath != this.notification.link) {
				this.$router.push(this.notification.link);
			}
			this.open = false;
			this.notification.is_read = true;
			this.updateNotification(this.notification);
		}
	}
}