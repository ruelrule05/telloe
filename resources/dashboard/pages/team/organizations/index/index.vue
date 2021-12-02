<template>
	<div class="min-h-screen flex flex-col relative" v-if="ready">
		<div class="content-header border-bottom flex items-center justify-between lg:static fixed w-full bg-white z-10">
			<div class="ml-7 lg:ml-0">ORGANIZATIONS</div>
			<div>
				<button type="button" class="btn btn-md btn-primary flex items-center" @click="$refs.addModal.show()">
					<span>Add</span>
					<span class="ml-1 hidden md:block">Organization</span>
				</button>
			</div>
		</div>
		<div class="h-20 lg:hidden block" />

		<div v-if="organizations.length == 0" class="flex-grow">
			<div class="absolute-center p-8 bg-secondary rounded-xl flex items-start w-10/12 md:w-4/12">
				<div class="text-primary">
					<InfoCircleIcon class="fill-current w-6 h-6"></InfoCircleIcon>
				</div>
				<div class="pl-4 -mt-1">
					<p class="font-bold text-sm">No organizations added yet. Add an organization to your directory by clicking the button below.</p>
					<button type="button" class="btn btn-outline-primary btn-md mt-4" @click="$refs.addModal.show()"><span>Add New</span></button>
				</div>
			</div>
		</div>

		<div v-else class="flex-grow">
			<div class="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-6 md:gap-8 p-6 md:p-8">
				<div v-for="organization in organizations" class="rounded-2xl bg-secondary-light p-4 w-full relative" :key="organization.id">
					<span v-if="organization.user_id != $root.auth.id" class="assigned"> ASSIGNED</span>
					<div class="flex justify-between">
						<div class="overflow-hidden">
							<router-link :to="`/dashboard/team/organizations/${organization.id}`" class="text-primary font-bold truncate">{{ organization.name }}</router-link>
							<p class="text-muted text-sm font-bold truncate">{{ organization.slug }}</p>
						</div>
						<div v-if="organization.user_id == $root.auth.id">
							<VueDropdown :options="['Booking Page', 'Edit', 'Delete']" @click="orgAction($event, organization)" class="-mr-2 -mt-2">
								<template #button>
									<div class="transition-colors cursor-pointer rounded-full p-2 hover:bg-gray-100">
										<CogIcon class="fill-current text-gray-400"></CogIcon>
									</div>
								</template>
							</VueDropdown>
						</div>
					</div>
					<div v-if="organization.members.length > 0" class="pt-4 pb-3 flex items-center">
						<div
							v-for="member in organization.members"
							:key="member.id"
							class="profile-image profile-image-sm -mr-2 border border-white relative z-0"
							:style="{
								backgroundImage: 'url(' + (member.member || member).member_user.profile_image + ')'
							}"
						>
							<span v-if="!(member.member || member).member_user.profile_image">{{ (member.member || member).member_user.initials }}</span>
						</div>
					</div>
					<div v-else class="text-muted text-xs py-5">No members added.</div>

					<button type="button" class="btn btn-sm btn-outline-primary" @click="copyLink($event, organization)"><span>Copy Link</span></button>
				</div>
			</div>
		</div>

		<Modal ref="deleteModal">
			<template v-if="selectedOrganization">
				<h4 class="font-serif uppercase font-semibold mb-4 text-center">DELETE ORGANIZATION</h4>
				<p class="text-center mt-3">
					Are you sure to delete the organization
					<strong>{{ selectedOrganization.name }}</strong>
					?
					<br />
					<span class="text-danger">This action cannot be undone</span>
				</p>
				<div class="flex justify-between mt-4">
					<button class="btn btn-md btn-outline-primary" type="button" @click="$refs.deleteModal.hide()">
						<span>Cancel</span>
					</button>
					<button
						class="btn btn-red btn-md"
						type="button"
						@click="
							deleteOrganization(selectedOrganization);
							$refs['deleteModal'].hide();
						"
					>
						<span>Delete</span>
					</button>
				</div>
			</template>
		</Modal>

		<Modal ref="addModal">
			<h4 class="font-serif uppercase font-semibold mb-4">ADD ORGANIZATION</h4>
			<vue-form-validate @submit="confirmStoreOrganization()">
				<div class="grid grid-cols-2 gap-4">
					<div>
						<div class="mb-4">
							<label>Organization Name</label>
							<input type="text" v-model="newOrganization.name" data-required />
						</div>

						<div class="mb-4">
							<label>Slug</label>
							<input type="text" v-model="newOrganization.slug" data-required />
						</div>

						<div class="mb-4">
							<label>Add Members</label>
							<multiselect v-model="newOrganization.members" label="name" track-by="email" :options="membersList" :showLabels="false" placeholder="" multiple>
								<template slot="singleLabel" slot-scope="{ option }">{{ option.name }}</template>
								<span slot="noResult" class="text-muted text-sm">No members found.</span>
							</multiselect>
						</div>
					</div>
					<div class="border-left pl-4">
						<h2 class="font-serif uppercase font-semibold mb-4 text-xs">Available Services</h2>
						<template v-for="service in services">
							<div v-if="service.is_available" :key="service.id" class="mt-5 rounded-xl p-3 bg-gray-100">
								<h6 class="font-semibold text-primary">{{ service.name }}</h6>
								<div class="mt-2 flex items-center">
									<span class="text-xs mr-2">{{ newOrganization.services.find(x => x == service.id) ? 'Active' : 'Inactive' }}</span>
									<toggle-switch :value="newOrganization.services.find(x => x == service.id) ? true : false" @input="toggleNewService(service)"></toggle-switch>
								</div>
							</div>
						</template>
					</div>
				</div>

				<div class="flex justify-between mt-6">
					<button class="btn btn-md btn-outline-primary" type="button" @click="$refs.addModal.hide()">
						<span>Cancel</span>
					</button>
					<button class="btn-md btn btn-primary" type="submit">
						<span>Add</span>
					</button>
				</div>
			</vue-form-validate>
		</Modal>

		<Modal ref="editModal">
			<h4 class="font-serif uppercase font-semibold mb-4">EDIT ORGANIZATION</h4>
			<vue-form-validate v-if="clonedOrganization" @submit="submitUpdate()">
				<div class="grid grid-cols-2 gap-4">
					<div>
						<div class="mb-4">
							<label>Organization Name</label>
							<input type="text" v-model="clonedOrganization.name" data-required />
						</div>
						<div class="mb-4">
							<label>Slug</label>
							<input type="text" v-model="clonedOrganization.slug" data-required />
						</div>

						<div class="mb-4 mb-1">
							<label>Add Members</label>
							<multiselect v-model="clonedOrganization.members" label="name" track-by="email" :options="membersList" :showLabels="false" placeholder="" multiple>
								<template slot="singleLabel" slot-scope="{ option }">{{ option.name }}</template>
								<span slot="noResult" class="text-muted text-sm">No members found.</span>
							</multiselect>
						</div>
					</div>
					<div class="border-left pl-4">
						<h2 class="font-serif uppercase font-semibold mb-4 text-xs">Available Services</h2>
						<template v-for="service in services">
							<div v-if="service.is_available" :key="service.id" class="mt-5 rounded-xl p-3 bg-gray-100">
								<h6 class="font-semibold text-primary">{{ service.name }}</h6>
								<div class="mt-2 flex items-center">
									<span class="text-xs mr-2">{{ clonedOrganization.services.find(x => x == service.id) ? 'Active' : 'Inactive' }}</span>
									<toggle-switch :value="clonedOrganization.services.find(x => x == service.id) ? true : false" @input="toggleService(service)"></toggle-switch>
								</div>
							</div>
						</template>
					</div>
				</div>

				<div class="flex justify-between mt-6">
					<button class="btn btn-md btn-outline-primary" type="button" @click="$refs.editModal.hide()">
						<span>Cancel</span>
					</button>
					<button class="btn-md btn btn-primary" type="submit">
						<span>Save</span>
					</button>
				</div>
			</vue-form-validate>
		</Modal>
	</div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped src="./index.scss"></style>
