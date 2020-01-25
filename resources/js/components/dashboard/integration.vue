<template>
	<div>
		<div v-if="$root.auth.widget.fb_page && $root.auth.widget.fb_page.id" class="position-absolute-center text-center">
			<img :src="$root.auth.widget.fb_page.picture" alt="" class="rounded-circle">
			<h1 class="h4 mt-1 mb-0">{{ $root.auth.widget.fb_page.name }}</h1>
			<div class="text-gray mb-3">{{ $root.auth.widget.fb_page.id }}</div>

			<button @click="FBDialog" class="btn btn-sm btn-primary shadow-none">Change Page</button>
			<span class="text-gray mx-2">or</span>
			<button class="btn btn-sm btn-white shadow-sm" @click="removeTab">Remove Page</button>
		</div>
			
		<div v-else>
			<div class="position-absolute-center text-center">
				<p>
					To ensure tabs lead to high-quality, accurate content, the Page Tabs feature is only available to Pages with 2000 or more likes.
				</p>
				<button @click="FBDialog" class="btn btn-facebook">Add Facebook Page</button>
			</div>
			<div class="modal fade" tabindex="-1" role="dialog" id="selectPageModal">
			  	<div class="modal-dialog modal-dialog-centered" role="document">
				    <div class="modal-content">
				      <div class="modal-header pb-0">
				        <h5 class="modal-title">Choose Page</h5>
				        	<button type="button" class="close" data-dismiss="modal" aria-label="Close">
				          		<span aria-hidden="true">&times;</span>
				        	</button>
				      </div>
				      <div class="modal-body">
						<div v-for="page in pages">
							<button @click="setPage(page)" class="btn btn-block text-left media border p-2 mt-1 rounded" :class="[page.fan_count < 2000 ? 'disabled btn-light' : 'btn-facebook']">
								<img :src="page.picture.data.url" height="30" class="rounded-circle mr-2" alt="">
								<div class="media-body">
									<div class="font-weight-bold mb-n1">{{ page.name }}</div> 
									<small>{{ page.fan_count }} Likes</small>
								</div>
							</button>
						</div>
				      </div>
				    </div>
			  	</div>
			</div>
		</div>
	</div>
</template>

<script>
//document.cookie = 'fblo_1187408638266444=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';;
export default {
	data: () => ({
		pages: [],
	}),

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
			/*FB.getLoginStatus((response) => {
			  	if (response.status === 'connected') {
			  		this.FBPages();
			  	}
			});*/
		};
	},

	created() {
		this.$root.heading = 'Integration';
    	axios.get('/dashboard/widget').then((response) => {
    		this.widget = response.data;
    	});
	},

	watch: {},

	methods: {
		async removeTab() {
			let page = this.pages.find((x) => x.id == this.$root.auth.widget.fb_page.id);
			if (!page) {
				await this.FBDialog();
				page = this.pages.find((x) => x.id == this.$root.auth.widget.fb_page.id);
			}
			if (page) {
				this.$root.pageloading = true;
				axios.delete('/dashboard/integration', {data: page}).then((response) => {
					this.$root.auth.widget.fb_page = response.data;
					this.$root.pageloading = false;
				});
			}
		},

		setPage(page) {
			$('#selectPageModal').modal('hide');
			this.$root.pageloading = true;
			axios.post('/dashboard/integration', page).then((response) => {
				this.$root.pageloading = false;
				this.$root.auth.widget.fb_page = response.data;
				//console.log(response.data);
			});
		},

		async FBDialog() {
			if (FB) {
				this.$root.pageloading = true;
				await new Promise((resolve, reject) => {
					FB.login((auth) => {
						if (auth.authResponse) {
							FB.api('/me/accounts', {fields: 'fan_count, access_token, name, picture'}, async (response) => {
								this.pages = response.data;
								this.$root.pageloading = false;
								$('#selectPageModal').modal('show');
								resolve();
							});
						}
					}, {perms: 'manage_pages'});
				}) ;
			}
		},
	},
};
</script>