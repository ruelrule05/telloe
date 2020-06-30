<template>
	<div class="mt-3 overflow-auto h-100 flex-grow-1 d-flex flex-column">
		<div v-if="subscribers.length == 0" class="text-muted text-center p-4 position-absolute-center">
			<div class="h6 font-weight-light mb-3">You don't have any subscribers yet.</div>
		</div>

		<template v-else>
			<div class="px-4">
				<h4 class="font-heading">Subscribers</h4>
				<div class="d-flex py-2 px-3 text-muted font-weight-light">
					<div class="flex-grow-1 ml-n3 mr-3 w-50">Customer</div>
					<div class="flex-grow-1 w-25">Subscriptions</div>
					<div class="flex-grow-1 w-25 text-right"></div>
				</div>
			</div>
			
			<div class="overflow-auto px-4">
				<div v-for="customer in customers" class="border-top p-3 bg-white rounded shadow-sm mb-3">
					<div class="d-flex align-items-center flex-nowrap">
						<div class="d-flex align-items-center w-50">
	                        <div class="user-profile-image user-profile-image-sm" :style="{backgroundImage: 'url('+customer.customer.profile_image+')'}">
	                                <span v-if="!customer.customer.profile_image">{{ customer.customer.initials }}</span>
	                        </div>
	                        <div class="ml-2 overflow-hidden flex-1">
	                            <h6 class="font-heading mb-0 text-ellipsis">{{ customer.customer.full_name }}</h6>
	                            <small class="d-block text-muted">{{ customer.customer.email }}</small>
	                        </div>
	                    </div>
	                    <div class="flex-grow-1 w-25 text-muted">Service 1, Service 2</div>
	                    <div class="flex-grow-1 w-25 text-right">
	                    	<div class="dropleft">
	                    		<button class="btn btn-white border p-1 line-height-0 bxadge-pill" data-toggle="dropdown">
									<more-h-icon width="20" height="20"></more-h-icon>
	                    		</button>
								<div class="dropdown-menu dropdown-menu-right">
									<span class="dropdown-item cursor-pointer" :class="{'disabled': !hasConversation(customer)}" @click="goToConversation(customer)">Manage</span>
								</div>
	                    	</div>
	                    </div>
					</div>
				</div>
			</div>
		</template>
	</div>
</template>

<script src="./subscribers.js"></script>
<style scoped lang="scss" src="./subscribers.scss"></style>