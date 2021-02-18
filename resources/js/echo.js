import Echo from 'laravel-echo';
window.Pusher = require('pusher-js');
let echo = new Echo({
	broadcaster: 'pusher',
	key: process.env.MIX_PUSHER_APP_KEY,
	cluster: process.env.MIX_PUSHER_APP_CLUSTER,
	disableStats: true,
	encrypted: true,
	namespace: 'App.Events',
	auth: {
		headers: {
			'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
		}
	}
});

export default echo;
