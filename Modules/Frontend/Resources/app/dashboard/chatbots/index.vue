<template>
	<div class="p-4">
		<div class="row">
			<div class="col-md-4">
				<div class="border rounded text-dark p-2 position-relative cursor-pointer mb-3" data-toggle="modal" data-target="#addChatbot">
					<h5 class="mb-0">&nbsp;</h5>
					<span>&nbsp;</span>
					<div class="position-absolute-center">+</div>
				</div>
			</div>

			<div v-for="chatbot in chatbots" class="col-md-4">
				<div :key="chatbot.id" class="border rounded text-dark p-2 bg-white mb-3">
					<div @click="to('/dashboard/chatbots/' + chatbot.id)" class="cursor-pointer">
						<h5 class="mb-0">{{ chatbot.title }}</h5>
					</div>
					<span class="text-gray">https://snapturebox.com/{{ $root.auth.widget.slug + '?bot='+ chatbot.bot_id }}</span>
				</div>
			</div>
		</div>


		<div class="modal fade" tabindex="-1" role="dialog" id="addChatbot">
		  	<div class="modal-dialog modal-dialog-centered" role="document">
			    <vue-form-validate class="modal-content" @submit="store">
			      	<div class="modal-header pb-0">
			      		<h5>Add Chatbot</h5>
				        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
				          <span aria-hidden="true">&times;</span>
				        </button>
			      	</div>
			      	<div class="modal-body">
			        	<div class="form-group">
			        		<label class="form-label">Title</label>
			        		<input type="text" class="form-control" v-model="title" required>
			        	</div>
			        	<div class="form-group">
			        		<label class="form-label">Description</label>
			        		<textarea class="form-control" rows="4" v-model="description"></textarea>
			        	</div>
			      	</div>
			      	<div class="modal-footer">
				        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
				        <button type="submit" class="btn btn-primary">Submit</button>
			      	</div>
			    </vue-form-validate>
		  	</div>
		</div>
	</div>
</template>

<script>
import VueFormValidate from './../../../components/vue-form-validate';
export default {
	components: {VueFormValidate},
	data: () => ({
		chatbots: [],
		title: '',
		description: ''
	}),

	computed: {},

	created() {
		this.$root.heading = 'Chatbots';
		this.getData();
	},

	mounted() {},

	methods: {
		store() {
			axios.post(`/dashboard/chatbots`, {title: this.title, description: this.description}).then((response) => {
				this.chatbots.unshift(response.data);
				$('#addChatbot').modal('hide');
				this.title = '';
				this.description = '';
			});
		},

		to(to) {
			this.$router.push(to);
		},

		getData() {
			axios.get('/dashboard/chatbots').then((response) => {
				this.chatbots = response.data;
				this.$root.contentloading = false;
			});
		}
	},
};
</script>
