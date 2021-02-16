<template>
    <div ref="booking" class=" position-relative">
       	<h6 class="h5 font-heading text-center mb-3">{{ booking.id ? 'Edit' : 'Add' }} Booking</h6>
       	<h6>{{ user.full_name }}</h6>
       	<!-- <div class="dropdown position-relative" ref="dropdown">
       		<input type="text" class="form-control mb-2 shadow-none" placeholder="Add user" @input="searchMembers">
       		<button class="btn btn-close btn-gray-200 badge-pill p-1"><close-icon></close-icon></button>
		  	<div class="dropdown-menu w-100 shadow-sm" :class="{'show': showDropdown}">
			    <div class="dropdown-item cursor-pointer d-flex align-items-center" @click="selectUser(searchUser)" v-for="searchUser in searchUsers">
			    	<div class="user-profile-image user-profile-image-sm align-self-center" :style="{backgroundImage: 'url('+searchUser.profile_image+')'}">
                        <span v-if="!searchUser.profile_image">{{ searchUser.initials }}</span>
                    </div>
					<div class="pl-2">
						<strong class="font-heading d-block line-height-1">{{ searchUser.full_name }}</strong>
						<small class="text-gray d-block font-weight-light">{{ searchUser.email }}</small>
					</div>
			    </div>
		  	</div>
       	</div> -->

       	<v-calendar is-expanded title-position="left" @dayclick="dayclick"></v-calendar>

		<timerangepicker></timerangepicker>

       	<div class="d-flex align-items-center mt-3">
       		<button class="btn btn-link text-body" @click="$parent.hide()">Cancel</button>
       		<button class="btn btn-primary ml-auto">{{ booking.id ? 'Save' : 'Add' }}</button>
       	</div>
    </div>
</template>

<script>
	import Vue from 'vue';
	import VCalendar from 'v-calendar'; 
	import CloseIcon from '../icons/close';
	import Timerangepicker from '../components/timerangepicker/timerangepicker.vue';
	Vue.use(VCalendar);
	export default{
		props: {
			booking: {
				type: Object,
				required: true,
			},
			user: {
				type: Object,
				required: true,
			}
		},
		components: {CloseIcon, Timerangepicker},

	    data: () => ({
	        date: null,
	        debounce: null,
	        searchUsers: [],
	        showDropdown: false,
	    }),

		mounted() {
			this.$parent.modal.loading = false;
		},

		methods: {
			/*selectUser(user) {
				this.user = user;
                this.showDropdown = false;
			},*/

			dayclick(day){
				this.date = day.id;
			},

	       /* searchMembers(e) {
               	clearTimeout(this.debounce);
			    this.debounce = setTimeout(() => {
                    axios.get(`/dashboard/users?search=${e.target.value.trim()}`).then((response) => {
                        this.searchUsers = response.data;
                        this.showDropdown = this.searchUsers.length ? true : false;
                    });
			    }, 300);
	        },*/
		}
	}
</script>

<style scoped>
	.user-profile-image{
		width: 35px;
		height: 35px;
	}
    .dropdown-menu{
      	max-height:250px;
      	overflow-y:auto;
   	}
</style>