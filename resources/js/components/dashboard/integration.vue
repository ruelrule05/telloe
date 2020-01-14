<template>
	<div>
		Integration
		<button @click="FBDialog">INtegrate</button>

		<div v-for="page in pages">
			<button @click="setPage(page)" :disabled="page.fan_count < 2000">{{ page.name }} ({{ page.fan_count }})</button>
		</div>
	</div>
</template>

<script>
export default {
	data: () => ({
		pages: []
	}),

	computed: {},

	mounted() {
		let FBSDKScript = document.createElement('script');
		FBSDKScript.setAttribute('src', 'https://connect.facebook.net/en_US/sdk.js');
		document.head.appendChild(FBSDKScript);
		window.fbAsyncInit = function() {
			FB.init({
				appId: '1187408638266444',
				cookie: true,
				autoLogAppEvents: true,
				xfbml: true,
				version: 'v5.0',
				status: true,
			});
			FB.Event.subscribe('auth.login', function(response) {
			    console.log(response);
			});
			FB.getLoginStatus(function(response) {
				console.log(response);
			  	if (response.status === 'connected') {
			    	console.log('connected');
			  	} else if (response.status === 'not_authorized') {

			 	} else {

			  	}
			});
		};
	},

	created() {},

	watch: {},

	methods: {
		setPage(page) {
			axios.post('/dashboard/integration', page).then((response) => {
				console.log(response.data);
			});
		},

		FBDialog() {
			if (FB) {
				FB.login((auth) => {
					if (auth.authResponse) {
						FB.api('/me/accounts', {fields: 'fan_count, access_token, name'}, async (response) => {
							this.pages = response.data;
						});
					}
				}, {perms: 'manage_pages'});
				return;

				FB.ui(
					{
						method: 'pagetab',
						redirect_uri: 'https://boxbi.app/login',
					},
					(response) => {
						console.log(response.tabs_added);
						if (response && response.tabs_added) {
							console.log(response.tabs_added[0]);
							//FB.api(response.tabs_added[0])
					    	/*axios.post('/dashboard/integration', {tabs_added: response.tabs_added}).then((response) => {
					    		console.log(response);
					    	});*/
						}
					},
				);
			}
		},
	},
};
</script>