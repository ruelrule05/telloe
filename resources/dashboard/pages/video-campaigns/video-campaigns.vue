<template>
	<div class="relative h-screen overflow-auto">
		<Add v-if="adding" :videoCampaign="videoCampaign"></Add>

		<div v-show="!adding" class="h-full relative flex flex-col">
			<div>
				<div class="content-header border-bottom flex items-center justify-between lg:static fixed w-full bg-white z-10">
					<div class="ml-7 lg:ml-0">VIDEO CAMPAIGNS</div>
					<button type="button" class="btn btn-md btn-primary flex items-center" @click="adding = true">
						<span>Create Template</span>
					</button>
				</div>
				<div class="h-20 lg:hidden block" />
			</div>
			<div v-if="videoCampaigns.length == 0" class="flex-grow relative border h-full">
				<div class="absolute-center p-8 bg-secondary rounded-xl flex items-start w-10/12 md:w-4/12">
					<div class="text-primary">
						<InfoCircleIcon class="fill-current w-6 h-6"></InfoCircleIcon>
					</div>
					<div class="pl-4 -mt-1">
						<p class="font-bold text-sm">No video campaigns added yet. Add a video campaign by clicking the button below.</p>
						<button type="button" class="btn btn-outline-primary btn-md mt-4" @click="adding = true">
							<span>Add New</span>
						</button>
					</div>
				</div>
			</div>

			<div v-else class="flex-grow">
				<div class="absolute-center p-8 bg-secondary rounded-xl flex items-start w-10/12 md:w-4/12">sdsds</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import InfoCircleIcon from '../../../icons/info-circle.vue';
const format = require('format-duration');
import dayjs from 'dayjs';
import Add from './add.vue';
export default {
	components: { InfoCircleIcon, Add },
	computed: {
		...mapState({
			videoCampaigns: state => state.video_campaigns.index,
			contacts: state => state.contacts.index,
			ready: state => state.video_campaigns.ready
		}),

		contactsOptions() {
			return this.contacts.map(contact => {
				let email = '';
				if (!contact.contact_user.full_name) {
					email = ` ${contact.contact_user.email}`;
				}
				return { name: `${contact.contact_user.full_name}${email}`, value: contact.id, id: contact.id, contact_user: contact.contact_user, email: contact.contact_user.email, type: 'contact' };
			});
		}
	},

	data: () => ({
		app_url: process.env.MIX_APP_URL,
		showLibrary: false,
		format: format,
		dayjs: dayjs,
		videoCampaign: null,
		adding: false
	}),

	created() {
		this.getContacts({ nopaginate: true });
		this.getVideoCampaigns();
	},

	methods: {
		...mapActions({
			getContacts: 'contacts/index',
			getVideoCampaigns: 'video_campaigns/index'
		})
	}
};
</script>

<style lang="scss" scoped></style>
