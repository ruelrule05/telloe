<template>
	<div class="h-100" v-if="$root.auth && ready">
		<div v-show="!addContact">
			<div class="content-header border-bottom flex items-center justify-between">
				<div>
					CONTACTS
				</div>
				<div>
					<button type="button" class="hidden mr-3 btn btn-md btn-outline-primary"><span>Import</span></button>
					<button type="button" class="btn btn-md btn-primary" @click="addContact = true"><span>Add contact</span></button>
				</div>
			</div>

			<div class="flex h-full contact-content">
				<div class="w-2/3 pt-8 pb-8 pl-6 pr-16 border-right">
					<div class="flex items-center justify-between mb-3 header">
						<VueSelect :options="contactStatuses" v-model="contactStatus" @input="getData" label="Status"></VueSelect>

						<form @submit.prevent="getData()">
							<input type="text" v-model="query" class="px-4 text-sm font-normal bg-gray-100 border-none rounded-full shadow-none w-80" placeholder="Search by name, surname or e-mail" />
						</form>
					</div>

					<div class="flex items-start justify-between contact-row border-bottom" v-for="contact in contacts.data" :key="contact.id">
						<div class="flex items-start">
							<div class="mr-2">
								<div class="profile-image profile-image-sm" :style="{ backgroundImage: 'url(' + contact.contact_user.profile_image + ')' }">
									<span v-if="!contact.contact_user.profile_image">{{ contact.contact_user.initials }}</span>
									<i v-if="$root.isOnline(contact.contact_user_id)" class="online-status">&nbsp;</i>
								</div>
							</div>
							<div>
								<router-link :to="`/dashboard/contacts/${contact.id}`" class="font-bold text-primary">{{ contact.contact_user.full_name }}</router-link>
								<p class="text-xs text-muted">{{ contact.contact_user.email }}</p>
							</div>
						</div>
						<div class="flex items-center">
							<p class="mr-5 text-xs text-muted">Date added: {{ contact.created_at_format }}</p>
							<span class="px-3 py-1 text-xs font-bold rounded text-muted" :class="[contact.is_pending ? 'bg-yellow-200' : 'bg-gray-200']">{{ contact.is_pending ? 'Pending' : 'Accepted' }}</span>

							<VueDropdown :options="actions" @click="contactAction($event, contact)" class="-mr-2 ml-1">
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
					<p class="text-sm text-muted">Contacts information can be upgraded with custom fields. That gives you the option to have specific fields for contacts that match your needs.</p>
					<button type="button" class="btn btn-sm btn-outline-primary mt-6"><span>Manage fields</span></button>
				</div>
			</div>
		</div>

		<div v-if="addContact">
			<div class="content-header border-bottom">
				ADD CONTACT
			</div>
			<vue-form-validate @submit="store" class="p-6">
				<div class="flex">
					<div class="w-5/12">
						<h2 class="font-serif uppercase font-semibold mb-4 text-xs">Contact Details</h2>
						<div class="pr-3">
							<div class="mb-4">
								<label>Email</label>
								<input type="email" v-model="newContact.email" data-required />
							</div>

							<div class="mb-4">
								<label class="form-label">First Name (Optional)</label>
								<input type="text" v-model="newContact.first_name" />
							</div>
							<div class="mb-4">
								<label class="form-label">Last Name (Optional)</label>
								<input type="text" v-model="newContact.last_name" />
							</div>

							<div>
								<vue-checkbox v-model="newContact.sendToEmail" label="Send invitation link to email"></vue-checkbox>
								<div v-if="newContact.sendToEmail" class="mt-4">
									<label>Invitation Message (Optional)</label>
									<textarea rows="3" class="resize-none" :placeholder="defaultEmailMessage" v-model="newContact.invite_message"></textarea>
								</div>
							</div>
						</div>
					</div>

					<div class="w-4/12 pl-6">
						<h2 class="font-serif uppercase font-semibold mb-4 text-xs">Available Services</h2>
						<div v-for="service in services" :key="service.id" class="mt-5 rounded-xl p-3 bg-gray-100">
							<h6 class="font-semibold text-primary">{{ service.name }}</h6>
							<div class="mt-2 flex items-center">
								<span class="text-xs mr-2">{{ newContact.blacklisted_services.find(x => x == service.id) ? 'Inactive' : 'Active' }}</span>
								<toggle-switch :value="newContact.blacklisted_services.find(x => x == service.id) ? false : true" @input="toggleServiceBlacklist(service)"></toggle-switch>
							</div>
						</div>
						<div class="pl-3">
							<div class="mb-4" v-if="($root.auth.custom_fields || []).length > 0">
								<strong class="d-block mb-2">Fields (Optional)</strong>
								<div class="form-row">
									<div class="col-6 mb-2" v-for="field in $root.auth.custom_fields" :key="field">
										<label class="form-label">{{ field }}</label>
										<input type="text" class="form-control" v-model="newContact.custom_fields[field]" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="d-flex">
					<button class="btn btn-outline-primary btn-sm" type="button" @click="addContact = false"><span>Cancel</span></button>
					<button class="btn-sm btn btn-primary" type="submit"><span>Add</span></button>
				</div>
			</vue-form-validate>
		</div>

		<Modal ref="editModal" :close-button="false">
			<h4 class="font-serif uppercase font-semibold mb-4">EDIT CONTACT</h4>
			<vue-form-validate v-if="clonedContact" @submit="update(clonedContact)">
				<fieldset :disabled="!clonedContact.is_pending">
					<div class="mb-4">
						<label>Email</label>
						<input type="email" v-model="clonedContact.email" data-required />
					</div>

					<div class="grid grid-cols-2 mb-6 gap-x-6">
						<div class="col">
							<label class="form-label">First Name</label>
							<input type="text" class="form-control" v-model="clonedContact.first_name" />
						</div>
						<div class="col">
							<label class="form-label">Last Name</label>
							<input type="text" class="form-control" v-model="clonedContact.last_name" />
						</div>
					</div>
				</fieldset>
				<div class="mb-4">
					<strong class="font-serif uppercase font-semibold mb-2 block text-xs">Available services</strong>
					<div v-for="service in services" :key="service.id" class="flex items-center mb-2 rounded-xl p-3 bg-gray-100">
						<div>
							<h6 class="font-semibold">{{ service.name }}</h6>
						</div>
						<div class="ml-auto">
							<toggle-switch active-class="bg-primary" :value="clonedContact.blacklisted_services.find(x => x == service.id) ? false : true" @input="toggleContactServiceBlacklist(service, clonedContact)"></toggle-switch>
						</div>
					</div>
				</div>

				<div class="flex justify-between mt-4">
					<button class="btn btn-md btn-outline-primary" type="button" @click="$refs.editModal.hide()"><span>Cancel</span></button>
					<button class="btn btn-primary btn-md" type="submit"><span>Update</span></button>
				</div>
			</vue-form-validate>
		</Modal>

		<Modal ref="deleteModal">
			<template v-if="selectedContact">
				<h4 class="font-serif uppercase font-semibold mb-4">DELETE CONTACT</h4>
				<p class="mt-3">
					Are you sure to delete contact
					<strong>{{ selectedContact.contact_user.full_name.trim() || selectedContact.contact_user.email }}</strong>
					?
					<br />
					<span class="text-red-600">This action cannot be undone</span>
				</p>
				<div class="flex justify-between mt-4">
					<button class="btn btn-md btn-outline-primary" type="button" @click="$refs.deleteModal.hide()"><span>Cancel</span></button>
					<button
						class="btn btn-md btn-red"
						type="button"
						@click="
							deleteContact(selectedContact);
							$refs.deleteModal.hide();
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
