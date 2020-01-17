<template>
	<div v-if="widget">
		<div>
			<button @click="FBDialog">Integrate</button>
		</div>

		<div v-if="widget.fb_page" class="alert alert-dark d-inline-block">
			Selected page: {{ widget.fb_page.name }} ({{ widget.fb_page.id }}) <button :disabled="loading" class="btn btn-sm btn-primary shadow-none" @click="removeTab">Remove</button>
		</div>
			
		<div v-else v-for="page in pages">
			<button @click="setPage(page)" :disabled="page.fan_count < 2000">{{ page.name }} ({{ page.fan_count }})</button>
		</div>
	</div>
</template>

<script>
//document.cookie = 'fblo_1187408638266444=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';;
export default {
	data: () => ({
		pages: [],
		widget: null,
		loading: true
	}),

	computed: {},

	mounted() {
		let FBSDKScript = document.createElement('script');
		FBSDKScript.setAttribute('src', 'https://connect.facebook.net/en_US/sdk.js');
		document.head.appendChild(FBSDKScript);
		window.fbAsyncInit = () => {
			FB.init({
				appId: '1187408638266444',
				cookie: true,
				autoLogAppEvents: true,
				xfbml: true,
				version: 'v5.0',
			});
			FB.getLoginStatus((response) => {
			  	if (response.status === 'connected') {
			  		this.FBPages();
			  	} else {
			  		this.loading = false;
			  	}
			});
		};
	},

	created() {
    	axios.get('/dashboard/widget').then((response) => {
    		this.widget = response.data;
    	});
	},

	watch: {},

	methods: {
		removeTab() {
			let page = this.pages.find((x) => x.id == this.widget.fb_page.id);
			if (page) {
				axios.delete('/dashboard/integration', {data: page}).then((response) => {
					console.log(response.data);
				});
			} else {
				this.FBDialog();
			}
		},

		setPage(page) {
			axios.post('/dashboard/integration', page).then((response) => {
				console.log(response.data);
			});
		},

		FBDialog() {
			if (FB) {
				FB.login((auth) => {
					if (auth.authResponse) this.FBPages();
				}, {perms: 'manage_pages'});
			}
		},

		FBPages() {
			FB.api('/me/accounts', {fields: 'fan_count, access_token, name'}, async (response) => {
				this.pages = response.data;
				this.loading = false;
			});
		}

	},
};
</script>