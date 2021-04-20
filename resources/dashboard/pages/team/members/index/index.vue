<template>
	<div class="h-100" v-if="ready">
		<div class="content-header border-bottom flex items-center justify-between">
			<div>
				MEMBERS
			</div>
			<div>
				<button type="button" class="btn btn-md btn-primary" @click="$refs.addModal.show()"><span>Add Member</span></button>
			</div>
		</div>

		<div class="flex h-full contact-content">
			<div class="w-2/3 pt-8 pb-8 pl-6 pr-16 border-right">
				<div class="flex items-center justify-between mb-3 header">
					<VueSelect :options="memberStatuses" v-model="memberStatus" @input="getData" label="Status"></VueSelect>

					<form @submit.prevent="getData()">
						<input type="text" v-model="query" placeholder="Search members..." />
					</form>
				</div>

				<div class="flex items-start justify-between contact-row border-bottom" v-for="member in members" :key="member.id">
					<div class="flex items-start">
						<div class="mr-2">
							<div class="profile-image profile-image-sm" :style="{ backgroundImage: 'url(' + member.member_user.profile_image + ')' }">
								<span v-if="!member.member_user.profile_image">{{ member.member_user.initials }}</span>
								<i v-if="$root.isOnline(member.member_user_id)" class="online-status">&nbsp;</i>
							</div>
						</div>
						<div>
							<router-link :to="`/dashboard/team/members/${member.id}`" class="font-bold text-primary">{{ member.member_user.full_name }}</router-link>
							<p class="text-xs text-muted">{{ member.member_user.email }}</p>
						</div>
					</div>
					<div class="flex items-center">
						<VueDropdown :options="actions" @click="memberAction($event, member)" class="-mr-2 ml-1">
							<template #button>
								<div class="transition-colors cursor-pointer rounded-full p-2 hover:bg-gray-100">
									<CogIcon class="fill-current text-gray-400"></CogIcon>
								</div>
							</template>
						</VueDropdown>
					</div>
				</div>

				<!-- <paginate @change="getData" :data="contacts" class="ml-2"></paginate> -->
			</div>
			<div class="w-1/3 p-6">
				<p class="text-sm text-muted">Members information can be upgraded with custom fields. That gives you the option to have specific fields for contacts that match your needs.</p>
				<button type="button" class="btn btn-sm btn-outline-primary mt-6"><span>Manage fields</span></button>
			</div>
		</div>

		<div class="d-flex h-100">
			<div class="h-100 flex-grow-1">
				<div class="d-flex flex-column h-100">
					<div class="border-bottom bg-white px-3 py-4">
						<h5 class="font-heading mb-0">Members</h5>
					</div>

					<div class="mt-2 overflow-auto h-100 flex-grow-1">
						<div v-if="members.length == 0" class="text-secondary text-center p-4 position-absolute-center">
							<div class="h6 mb-0 font-weight-normal">
								<div class="mb-2">You don't have any members yet.</div>
								<button class="btn btn-primary" type="button" @click="$refs['addModal'].show()">
									Add Member
								</button>
							</div>
						</div>

						<div class="overflow-auto h-100 container pb-3 pt-4" v-else>
							<div class="row pt-2 px-2">
								<router-link tag="div" :to="`/dashboard/team/members/${member.id}`" v-for="(member, index) in members" :key="member.id" class="col-md-4 member px-2 mb-5 cursor-pointer">
									<div class="px-1">
										<div class="bg-white rounded p-3 shadow-sm text-centxer position-relative" :data-intro="index == 0 ? $root.intros.members_index.steps[0] : null" :data-step="index == 0 ? 1 : null">
											<div class="member-buttons position-absolute d-flex align-items-center">
												<div class="badge badge-icon d-inline-flex align-items-center mr-2" :class="[member.is_pending ? 'bg-warning-light text-warning' : 'bg-primary-light text-primary']">
													<clock-icon v-if="member.is_pending" height="12" width="12"></clock-icon>
													<checkmark-circle-icon v-else height="12" width="12"></checkmark-circle-icon>
													&nbsp;{{ member.is_pending ? 'Pending' : 'Accepted' }}
												</div>

												<div class="dropdown" @click.prevent>
													<button class="btn btn-sm btn-white bg-white p-1 line-height-0 shadow-none" type="button" data-toggle="dropdown" data-offset="-132, 0" :data-intro="index == 0 ? $root.intros.members_index.steps[1] : null" :data-step="index == 0 ? 2 : null">
														<more-icon width="20" height="20" class="fill-gray-500" transform="scale(1.3)"></more-icon>
													</button>
													<div class="dropdown-menu">
														<span
															v-if="member.is_pending"
															class="dropdown-item d-flex align-items-center px-2 cursor-pointer"
															@click="
																selectedMember = member;
																$refs['resendModal'].show();
															"
														>
															Resend invitation
														</span>
														<span class="dropdown-item d-flex align-items-center px-2 cursor-pointer" @click="editMember(member)">
															Edit
														</span>
														<span
															class="dropdown-item d-flex align-items-center px-2 cursor-pointer"
															@click="
																selectedMember = member;
																$refs['deleteModal'].show();
															"
														>
															Delete
														</span>
													</div>
												</div>
											</div>

											<div class="mt-n3">
												<div
													class="user-profile-image user-profile-image-sm d-inline-block mb-2 mt-n4"
													:style="{
														backgroundImage: 'url(' + member.member_user.profile_image + ')'
													}"
												>
													<span v-if="!member.member_user.profile_image">{{ member.member_user.initials }}</span>

													<i v-if="$root.isOnline(member.member_user_id)" class="online-status bg-success">&nbsp;</i>
												</div>
											</div>
											<h5 class="font-heading mb-0">{{ member.member_user.full_name }}</h5>
											<small class="text-gray">{{ member.member_user.email }}</small>
											<div class="d-flex align-items-center justify-content-cexnter mt-3">
												<package-icon width="17" height="17" fill="#888"></package-icon>
												<span class="ml-2">{{ member.assigned_services.length }} assigned services</span>
											</div>
										</div>
									</div>
								</router-link>

								<div class="col-md-4 member px-2">
									<div class="px-1 h-100">
										<div class="position-relative h-100">
											<div class="h-100 position-relative">
												<button :data-intro="$root.intros.members_index.steps[2]" data-step="3" class="btn btn-light btn-add btn-lg shadow-none d-flex line-height-0 align-items-center justify-content-center w-100 text-muted" type="button" @click="$refs['addModal'].show()">
													<plus-icon class="fill-gray"></plus-icon>
													Add Member
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<Modal ref="editModal" size="sm">
			<h4 class="font-serif uppercase font-semibold mb-4">EDIT MEMBER</h4>
			<vue-form-validate v-if="clonedMember" @submit="update">
				<div class="mb-4">
					<label class="form-label">Email</label>
					<input :disabled="!clonedMember.is_pending" type="email" class="form-control" v-model="clonedMember.email" data-required />
				</div>
				<div class="grid grid-cols-2 gap-x-4 mb-4">
					<div>
						<label class="form-label">First Name (Optional)</label>
						<input :disabled="!clonedMember.is_pending" type="text" class="form-control" v-model="clonedMember.first_name" />
					</div>
					<div>
						<label class="form-label">Last Name (Optional)</label>
						<input :disabled="!clonedMember.is_pending" type="text" class="form-control" v-model="clonedMember.last_name" />
					</div>
				</div>
				<div class="mb-4">
					<h2 class="font-serif uppercase font-semibold mb-4 text-xs">Assign Services</h2>
					<template v-for="service in services">
						<div v-if="service.is_available" :key="service.id" class="mt-5 rounded-xl p-3 bg-gray-100">
							<h6 class="font-semibold text-primary">{{ service.name }}</h6>
							<div class="mt-2 flex items-center">
								<span class="text-xs mr-2">{{ clonedMember.assigned_services.find(x => x == service.id) ? 'Inactive' : 'Active' }}</span>
								<toggle-switch :value="clonedMember.assigned_services.find(x => x == service.id) ? false : true" @input="toggleMemberAssignedService(service)"></toggle-switch>
							</div>
						</div>
					</template>
				</div>

				<div class="flex mt-6 justify-between">
					<button class="btn btn-md btn-outline-primary" type="button" @click="$refs.editModal.hide()">
						<span>Cancel</span>
					</button>
					<button class="btn btn-md btn-primary" type="submit">
						<span>Save</span>
					</button>
				</div>
			</vue-form-validate>
		</Modal>

		<Modal ref="addModal" size="sm">
			<h4 class="font-serif uppercase font-semibold mb-4">ADD MEMBER</h4>
			<vue-form-validate @submit="store">
				<div class="mb-4">
					<label>Email</label>
					<input type="email" class="form-control" v-model="newMember.email" data-required />
				</div>
				<div class="grid grid-cols-2 gap-x-4 mb-4">
					<div>
						<label class="form-label">First Name (Optional)</label>
						<input type="text" class="form-control" v-model="newMember.first_name" />
					</div>
					<div>
						<label class="form-label">Last Name (Optional)</label>
						<input type="text" class="form-control" v-model="newMember.last_name" />
					</div>
				</div>
				<div class="mb-4">
					<h2 class="font-serif uppercase font-semibold mb-4 text-xs">Assign Services</h2>
					<template v-for="service in services">
						<div v-if="service.is_available" :key="service.id" class="mt-5 rounded-xl p-3 bg-gray-100">
							<h6 class="font-semibold text-primary">{{ service.name }}</h6>
							<div class="mt-2 flex items-center">
								<span class="text-xs mr-2">{{ newMember.assigned_services.find(x => x == service.id) ? 'Inactive' : 'Active' }}</span>
								<toggle-switch :value="newMember.assigned_services.find(x => x == service.id) ? false : true" @input="toggleAssignedService(service)"></toggle-switch>
							</div>
						</div>
					</template>
				</div>

				<div>
					<vue-checkbox v-model="newMember.sendToEmail" label="Send invitation link to email"></vue-checkbox>
					<div v-if="newMember.sendToEmail" class="mt-4">
						<label>Invitation Message (Optional)</label>
						<textarea rows="3" class="resize-none" :placeholder="defaultEmailMessage" v-model="newMember.invite_message"></textarea>
					</div>
				</div>

				<div class="flex mt-6 justify-between">
					<button class="btn btn-md btn-outline-primary" type="button" @click="$refs.addModal.hide()">
						<span>Cancel</span>
					</button>
					<button class="btn btn-md btn-primary" type="submit">
						<span>Add</span>
					</button>
				</div>
			</vue-form-validate>
		</Modal>

		<Modal ref="resendModal">
			<template v-if="selectedMember">
				<h5 class="font-heading text-center">Resend Invitation</h5>
				<p class="text-center mt-3">
					Are you sure to resend the invitation email to member
					<strong>{{ selectedMember.full_name.trim() || selectedMember.email }}</strong>
					?
					<br />
				</p>
				<div class="d-flex justify-content-end">
					<button class="btn btn-light shadow-none" type="button" data-dismiss="modal">
						Cancel
					</button>
					<vue-button button_class="btn btn-primary ml-auto" :loading="resendLoading" type="button" @click="resendEmail(selectedMember)">Resend Invitation</vue-button>
				</div>
			</template>
		</Modal>

		<Modal ref="deleteModal">
			<template v-if="selectedMember">
				<h4 class="font-serif uppercase font-semibold mb-4 text-center">DELETE MEMBER</h4>
				<p class="text-center mt-3">
					Are you sure to delete member
					<strong>{{ selectedMember.full_name.trim() || selectedMember.email }}</strong>
					?
					<br />
					<span class="text-danger">This action cannot be undone</span>
				</p>
				<div class="flex justify-between mt-4">
					<button class="btn btn-outline-primary btn-md" @click="$refs.deleteModal.hide()">
						<span>Cancel</span>
					</button>
					<button
						class="btn btn-red btn-md"
						type="button"
						@click="
							deleteMember(selectedMember);
							$refs.deleteModal.hide();
							selectedMember = null;
						"
					>
						<span>Delete</span>
					</button>
				</div>
			</template>
		</Modal>
	</div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped src="./index.scss"></style>
