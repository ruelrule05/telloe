<div class="d-flex align-items-center bg-white mb-0 py-2 dashboard-header shadow-sm">
  	<div class="overflow-hidden px-3">
	   <div class="text-ellipsis font-weight-500 font-circular" v-cloak>@{{ header_title }}</div>
  	</div>

  	<div class="flex-grow-1 text-right d-flex align-items-center justify-content-end flex-fill text-nowrap pr-2">
  		<template v-if="auth">
			<router-link v-if="auth.is_employer" to="/dashboard/jobs/create" active-class="" class="btn btn-primary mr-4 shadow-none smoothing-antialiased">Post a Job</router-link>
			<div class="text-left">
			
			</div>
		</template>
  	</div>
</div>