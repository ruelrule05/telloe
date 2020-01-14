<template>
	<div class="container my-5 py-5" v-if="widget">
		<div class="row">
			<div class="col-md-7">
				Rules
				<form class="mt-2" @submit.prevent="addNewRule">
					<table class="table table-sm table-borderless mb-0">
						<tbody>
							<tr>
								<td class="pl-0 pb-3">
									<input type="text" ref="newWidgetPage" v-model="newWidget.page" class="form-control form-control-sm" placeholder="Page (example: /blog)" required>
								</td>
								<td class="px-0">
									<select name="" id="" class="form-control form-control-sm" v-model="newWidget.state" required>
										<option value="" disabled selected>Select widget state</option>
										<option value="minimized">Minimized</option>
										<option value="open">Open</option>
										<option value="hidden">Hidden</option>
									</select>
								</td>
								<td class="pr-0">
									<button type="submit" class="btn btn-primary btn-block btn-sm shadow-none">+ Add Rule</button>
								</td>
							</tr>

							<template v-if="widget.widget_rules.length > 0">
								<tr class="border bg-light">
									<th>Page</th>
									<th class="border-right">State</th>
								</tr>

								<tr v-for="rule in widget.widget_rules" class="border">
									<td class="py-2">{{ rule.page }}</td>
									<td class="px-0 py-2 border-right">
										<span class="badge" :class="stateBadge(rule.state)">{{ rule.state }}</span>
										<div class="float-right pr-2">
											<span class="badge badge-light cursor-pointer" @click="deleteRule(rule)">x</span>
										</div>
									</td>
								</tr>
							</template>
						</tbody>
					</table>
				</form>
			</div>
		</div>
	</div>
</template>


<script>
	export default {
		data: () => ({
			widget: null,
			newWidget: {
				page: 'test',
				state: 'hidden'
			}
		}),

	    computed: { },

	    mounted() { },

	    created() { 
	    	axios.get('/dashboard/widget').then((response) => {
	    		this.widget = response.data;
	    	});
	    },

	    watch: {
	    },

	    methods: {
	    	deleteRule(rule) {
	    		let index = this.widget.widget_rules.findIndex((x) => x.id == rule.id);
	    		if (index > -1) {
			    	axios.delete(`/dashboard/widget/rule/${rule.id}`).then((response) => {
	    				this.widget.widget_rules.splice(index, 1);
			    	});
	    		}
	    	},

	    	stateBadge(state) {
	    		let badgeState = 'badge-primary';
	    		switch(state) {
	    			case 'Minimized':
	    				badgeState = 'badge-dark';
	    				break;

	    			case 'Hidden':
	    				badgeState = 'badge-light';
	    				break;
	    		}

	    		return badgeState;
	    	},

	        addNewRule() {
	        	let exists = this.widget.widget_rules.find((x) => x.page == this.newWidget.page);
	        	if (!exists) {
			    	axios.post('/dashboard/widget/rule', Object.assign({}, this.newWidget)).then((response) => {
		        		this.widget.widget_rules.unshift(response.data);
		        		this.newWidget.state = this.newWidget.page = '';
			    	});
	        	} else {
	        		this.$refs['newWidgetPage'].focus();
	        	}
	        }
	    }
	}
</script>