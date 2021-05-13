/* global axios */
async function openAuthWindow(url) {
	return new Promise(resolve => {
		const w = 600;
		const h = 800;
		const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
		const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

		const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
		const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

		const systemZoom = width / window.screen.availWidth;
		const left = (width - w) / 2 / systemZoom + dualScreenLeft;
		const top = (height - h) / 2 / systemZoom + dualScreenTop;

		window.open(url, 'telloe_socialite_auth_window', `width=${w}, height=${h}, top=${top}, left=${left}`);
		let eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent';
		let eventer = window[eventMethod];
		let messageEvent = eventMethod == 'attachEvent' ? 'onmessage' : 'message';
		eventer(
			messageEvent,
			e => {
				resolve(e);
			},
			false
		);
	});
}

export default {
	async FacebookLogin() {
		let response = await axios.get('/auth/facebook/redirect');
		return await openAuthWindow(response.data);
	},

	async GoogleSignin() {
		let response = await axios.get('/auth/google/redirect');
		return await openAuthWindow(response.data);
	}
};
