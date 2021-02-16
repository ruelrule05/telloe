import Echo from 'laravel-echo';
window.Pusher = require('pusher-js');
let echo = new Echo({
	broadcaster: 'pusher',
	key: '7f5c422b76e0eb6981a8',
	disableStats: true,
	encrypted: true,
	namespace: 'Modules.Frontend.Events',
	cluster: 'ap4',
	auth: {
		headers: {
			'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
		}
	}
});

export default echo;
