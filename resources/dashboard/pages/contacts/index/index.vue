<template>
	<div class="h-100" v-if="$root.auth && ready">
		<div v-show="!addContact">
			<div class="content-header contact-header border-bottom flex items-center justify-between lg:static fixed w-full bg-white z-10">
				<div class="ml-7 lg:ml-0 absolute md:static top-7 right-5">CONTACTS</div>
				<div class="flex absolute md:static bottom-4 justify-center w-11/12 md:w-auto">
					<button
						type="button"
						class="mr-2 btn btn-md btn-outline-primary w-6/12 md:w-auto"
						@click="
							csvFile = null;
							csvPreview = false;
							$refs.importCsv.show();
						"
					>
						<span>Import</span>
					</button>
					<button type="button" class="btn btn-md btn-primary flex items-center justify-center w-6/12 md:w-auto whitespace-pre" @click="addContact = true"><span>Add contact</span></button>
				</div>
			</div>
			<div class="h-28 md:h-20 lg:hidden block" />

			<div v-if="banner" class="p-4 lg:p-8 border-bottom relative">
				<div class="font-serif absolute lg:top-10 lg:right-10 top-6 right-6 z-10">
					<button class="border border-primary rounded-full p-2 focus:outline-none transition-colors hover:bg-gray-100" type="button" @click="hideBanner()"><CloseIcon width="10" height="10" class="fill-current text-primary"></CloseIcon></button>
				</div>
				<div class="bg-primary-ultralight rounded-xl flex p-6 flex-col md:flex-row relative">
					<div class="font-serif w-4/5 md:w-1/4 font-semibold uppercase">ADD NEW CONTACTS</div>
					<div class="w-full md:w-7/12 ml-0 md:ml-20">
						<p class="text-muxted mb-4">Add contacts and start messaging them. Import them through a CSV file or enter their details.</p>
						<button class="btn btn-md btn-outline-primary" type="button" @click="addContact = true"><span>ADD NEW CONTACTS</span></button>
					</div>
				</div>
			</div>

			<div class="flex flex-col lg:flex-row h-full contact-content">
				<div class="w-full lg:w-2/3 p-6 lg:p-8 border-b lg:border-b-0 border-r-0 lg:border-r relative">
					<template v-if="filteredContacts.length > 0">
						<div class="flex lg:items-center items-normal justify-between mb-3 header flex-col lg:flex-row w-full">
							<div class="flex items-center flex-col md:flex-row">
								<VueSelect :options="contactStatuses" dropPosition="w-full" class="contact-status" v-model="contactStatus" @input="getData" label="Status"></VueSelect>
								<multiselect v-model="filterTags" class="ml-0 md:ml-2 w-6/12 md:w-full mt-2 md:mt-0" :options="contactTags" :showLabels="false" placeholder="Filter by tags" multiple> <span slot="noResult" class="text-muted text-sm">No tags found.</span></multiselect>
							</div>

							<form @submit.prevent="getData()" class="mt-2 lg:mt-0 lg:w-5/12">
								<input type="text" v-model="query" class="px-4 text-sm font-normal bg-gray-100 border-none rounded-full shadow-none" placeholder="Search by name, surname or e-mail" />
							</form>
						</div>

						<div class="flex w-full flex-col md:flex-row xs:flex-row items-start justify-between contact-row border-bottom" v-for="contact in filteredContacts" :key="contact.id">
							<div class="flex w-full sm:w-6/12 items-start">
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
							<div class="flex w-10/12 sm:w-6/12 flex-col lg:flex-row items-start sm:items-end lg:items-center mt-2 sm:mt-0 ml-9 sm:ml-0 justify-end">
								<p class="mr-0 lg:mr-5 text-xs text-muted">Date added: {{ dayjs(contact.created_at).format('MMM DD, YYYY') }}</p>
								<div class="flex items-center">
									<span class="px-3 py-1 text-xs font-bold rounded text-muted" :class="[contact.is_pending ? 'bg-yellow-200' : 'bg-gray-200']">{{ contact.is_pending ? 'Pending' : 'Accepted' }}</span>
									<button v-if="!contact.is_pending" type="button" class="ml-2 transition-colors cursor-pointer rounded-full p-1 hover:bg-gray-100" @click="goToConversation(contact)">
										<MessageIcon class="fill-current text-gray-400"></MessageIcon>
									</button>

									<VueDropdown :options="actions" @click="contactAction($event, contact)" class="-mr-2 ml-1">
										<template #button>
											<div class="transition-colors cursor-pointer rounded-full p-2 hover:bg-gray-100">
												<CogIcon class="fill-current text-gray-400"></CogIcon>
											</div>
										</template>
									</VueDropdown>
								</div>
							</div>
						</div>

						<Paginate v-if="contacts.data.length > 0" :data="contacts" @change="p => (page = p)" class="mt-6"></Paginate>
					</template>

					<div v-else class="absolute-center p-8 bg-secondary rounded-xl flex items-start lg:w-6/12 md:5/12 sm:w-6/12 w-10/12">
						<div class="text-primary">
							<InfoCircleIcon class="fill-current w-6 h-6"></InfoCircleIcon>
						</div>
						<div class="pl-4 -mt-1">
							<p class="font-bold text-sm">No contacts added yet. Add a contact by clicking the button below.</p>
							<button type="button" class="btn btn-outline-primary btn-md mt-4 whitespace-pre" @click="addContact = true"><span>Add Contact</span></button>
						</div>
					</div>

					<!-- <paginate @change="getData" :data="contacts" class="ml-2"></paginate> -->
				</div>
				<div class="contact-fields w-full lg:w-1/3 p-8">
					<p class="text-sm text-muted mb-2">Contacts information can be upgraded with custom fields. That gives you the option to have specific fields for contacts that match your needs.</p>
					<div v-for="(custom_field, index) in userCustomFields" :key="index" class="mr-1 mt-2 py-2 px-3 bg-gray-50 rounded-lg text-xs inline-block">
						{{ custom_field }}
					</div>
					<div>
						<button type="button" class="btn btn-sm btn-outline-primary mt-4" @click="$refs.fieldsModal.show()"><span>Manage fields</span></button>
					</div>
				</div>
			</div>
		</div>

		<div v-if="addContact">
			<div class="content-header border-bottom lg:static fixed w-full bg-white z-20">
				<div class="ml-7 lg:ml-0">ADD CONTACT</div>
			</div>
			<div class="h-20 lg:hidden block" />
			<vue-form-validate @submit="store" class="p-8">
				<div class="flex block lg:hidden w-full">
					<h2 class="font-serif uppercase font-semibold mb-4 text-xs w-6/12" @click="isContactFormTab = true" :class="{ 'text-primary': isContactFormTab }">Contact Details</h2>
					<h2 class="font-serif uppercase font-semibold mb-4 text-xs w-6/12" @click="isContactFormTab = false" :class="{ 'text-primary': !isContactFormTab }">Available Services</h2>
				</div>
				<div class="flex">
					<div class="w-full lg:w-5/12" :class="{ hidden: !isContactFormTab && isMobile }">
						<h2 class="font-serif uppercase font-semibold mb-4 text-xs hidden lg:block">Contact Details</h2>
						<div class="pr-3">
							<div class="mb-4">
								<label required>Email</label>
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

						<div class="d-flex mt-5">
							<button class="btn btn-outline-primary btn-sm" type="button" @click="addContact = false"><span>Cancel</span></button>
							<button class="btn-sm btn btn-primary" type="submit"><span>Add</span></button>
						</div>
					</div>

					<div class="w-full lg:w-4/12 pl-0 lg:pl-6" :class="{ hidden: isContactFormTab && isMobile }">
						<h2 class="font-serif uppercase font-semibold mb-4 text-xs hidden lg:block">Available Services</h2>
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
			</vue-form-validate>
		</div>

		<Modal ref="importCsv">
			<div v-if="!csvFile">
				<h4 class="font-serif uppercase font-semibold mb-4">IMPORT FROM CSV</h4>
				<div class="py-6 text-sm text-muted text-center border border-gray-300 border-dashed rounded-xl bg-gray-50 cursor-pointer transition-colors hover:bg-gray-100" @click="$refs.csvFile.click()">Click here to import CSV file</div>
				<input type="file" class="hidden" accept=".csv" ref="csvFile" @change="readCsv" />
			</div>
			<vue-form-validate @submit="csvPreview = true" v-else-if="!csvPreview">
				<h4 class="font-serif uppercase font-semibold mb-4">MAP HEADINGS</h4>
				<div v-for="mapping in csvMappings" :key="mapping.field" class="mt-2 relative flex items-center justify-between text-sm bg-gray-50 rounded-md py-2">
					<div class="bg-gray-50 px-2 relative z-10">{{ mapping.label }} <span v-if="mapping.required">(Required)</span></div>
					<div class="absolute-center w-full h-px bg-gray-300 z-0"></div>
					<div class="bg-gray-50 px-2 relative z-10">
						<select v-model="mapping.heading" :data-required="mapping.required" class="input cursor-pointer" :class="{ 'text-muted': !mapping.heading.toString().trim().length }">
							<option value="" disabled>- Select heading -</option>
							<option v-for="(heading, headingIndex) in csvHeadings" :key="heading" :value="headingIndex">{{ heading }}</option>
						</select>
					</div>
				</div>
				<div class="flex justify-between mt-4">
					<button class="btn btn-md btn-outline-primary" type="button" @click="$refs.importCsv.hide()"><span>Cancel</span></button>
					<button :disabled="!csvFile" class="btn btn-primary btn-md" type="submit"><span>Next</span></button>
				</div>
			</vue-form-validate>

			<div v-else-if="csvPreview">
				<h4 class="font-serif uppercase font-semibold mb-4">PREVIEW</h4>

				<div class="flex text-sm text-muted mb-2">
					<div class="w-1/3">Email</div>
					<div class="w-1/3 px-3">First Name</div>
					<div class="w-1/3">Last Name</div>
				</div>
				<div class="overflow-y-auto overflow-x-hidden h-72">
					<template v-for="(csvContact, csvContactIndex) in csvContacts">
						<div v-if="csvContact[csvMappings[0].heading]" :key="csvContactIndex" class="flex text-sm border-bottom py-1">
							<div class="w-1/3 truncate overflow-hidden">{{ csvContact[csvMappings[0].heading] }}</div>
							<div class="w-1/3 truncate overflow-hidden px-3">{{ csvContact[csvMappings[1].heading] }}</div>
							<div class="w-1/3 truncate overflow-hidden">{{ csvContact[csvMappings[2].heading] }}</div>
						</div>
					</template>
				</div>
				<div class="flex justify-between mt-4">
					<button class="btn btn-md btn-outline-primary" type="button" @click="csvPreview = false"><span>Back</span></button>
					<button :disabled="!csvFile" class="btn btn-primary btn-md" type="button" @click="submitImportCsv"><span>Import</span></button>
				</div>
			</div>
		</Modal>

		<Modal ref="fieldsModal" size="sm">
			<h4 class="font-serif uppercase font-semibold mb-4">MANAGE FIELDS</h4>
			<div v-for="(custom_field, index) in userCustomFields" :key="index" class="flex items-center custom-field position-relative">
				<div class="mb-1 flex items-center w-full">
					<input type="text" :value="custom_field" class="flex-grow" />
					<TrashIcon
						class="cursor-pointer ml-3 fill-current text-gray-300"
						@click.native="
							userCustomFields.splice(index, 1);
							updateUserCustomFields();
						"
					></TrashIcon>
				</div>
			</div>
			<div class="mb-1 flex items-center w-full">
				<input type="text" v-model="newField" class="flex-grow" placeholder="New Field" />
				<button class="btn btn-sm btn-outline-primary ml-2" type="button" @click="updateUserCustomFields()"><span>Add</span></button>
			</div>
			<div class="flex justify-end mt-6">
				<button
					class="btn btn-md btn-primary"
					type="button"
					@click="
						newField = '';
						$refs.fieldsModal.hide();
						userCustomFields = JSON.parse(JSON.stringify(originalUserCustomFields));
					"
				>
					<span>Done</span>
				</button>
			</div>
		</Modal>

		<Modal ref="editModal">
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
