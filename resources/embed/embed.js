let container = document.querySelector('#telloe-embed-widget');
if (container) {
	container.style.overflow = 'hidden';
	let username = container.dataset.username;
	let service = container.dataset.service;
	if (username && service) {
		let iframe = document.createElement('iframe');
		iframe.src = `${window.TELLOE_EMBED_ENDPOINT}/@${username}/${service}?embed=true`;
		iframe.style.width = '100%';
		iframe.style.height = '100%';
		container.append(iframe);
	}
}
