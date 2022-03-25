<template>
	<div>
		<div v-if="member" class="min-h-screen flex flex-col relative">
			<div class="content-header border-bottom flex items-center justify-between lg:static fixed w-full bg-white md:z-0 z-10">
				<div class="flex items-center">
					<router-link to="/dashboard/integrations/linkedin" class="cursor-pointer rounded-full transition-colors hover:bg-gray-100 text-gray-600 p-1 mr-2"><ChevronLeftIcon class="fill-current"></ChevronLeftIcon></router-link>
					LINKEDIN MEMBER DETAILS
				</div>
			</div>
			<div class="h-20 lg:hidden block" />

			<div class="flex flex-col lg:flex-row items-stretch h-full contact-content flex-grow">
				<div class="w-full lg:w-5/12 min-h-full border-r-0 lg:border-r border-b lg:border-b-0">
					<div class="flex items-start p-8">
						<div class="mr-4">
							<div class="profile-image profile-image-xl" :style="{ backgroundImage: 'url(' + member.profilePicture + ')' }">
								<span v-if="!member.profilePicture">{{ member.name.text.charAt(0) }}</span>
							</div>
						</div>

						<div class="flex-1 pt-2">
							<h2 class="mb-1 text-xl font-bold">{{ member.name.text }}</h2>
							<p class="text-xs text-muted">{{ member.description.text }}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ChevronLeftIcon from '../../../../icons/chevron-left';
import { mapState, mapActions } from 'vuex';
export default {
	components: { ChevronLeftIcon },
	data: () => ({
		member: null
	}),

	computed: {
		...mapState({
			linkedActivities: state => state.linkedin_activities.index
		})
	},

	created() {
		(async () => {
			await this.getLinkedinActivities();
			let actor = null;
			this.linkedActivities.forEach(activity => {
				let actorData = null;
				if (activity.data.actor && (activity.data.resharedUpdate || activity.data.header)) {
					actorData = activity.data.actor;
					if (activity.data.resharedUpdate) {
						actorData = activity.data.resharedUpdate.actor;
					}
				}
				if (actorData && actorData.urn == this.$route.params.memberID) {
					if (actorData.name.attributes && actorData.name.attributes.length && actorData.name.attributes[0].miniCompany) {
						actorData.description.text = activity.data.actor.description.text;
					}
					actor = actorData;
				}
			});
			if (!actor) {
				this.$router.replace('/dashboard/integrations/linkedin');
			} else {
				if (actor.name.attributes && actor.name.attributes.length) {
					let profile = actor.name.attributes[0].miniProfile || actor.name.attributes[0].miniCompany;
					if (profile && profile.picture && profile.picture['com.linkedin.common.VectorImage']) {
						let vectorImage = profile.picture['com.linkedin.common.VectorImage'];
						actor.profilePicture = vectorImage.rootUrl + vectorImage.artifacts[0].fileIdentifyingUrlPathSegment;
					}
				}
				this.member = actor;
			}
		})();
	},

	methods: {
		...mapActions({
			getLinkedinActivities: 'linkedin_activities/index'
		})
	}
};
</script>

<style lang="scss" scoped></style>
