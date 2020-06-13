<template>
	<div v-if="chatbot" class="h-100 w-100 position-relative">
		<div class="position-relative chat-creator-parent w-100 h-100">

			<div class="chatbox-container position-relative w-100 h-100" id="chatbox-container" :style="'transform: scale('+scale+')'">
				<div class="chatbox-start d-inline-block text-center pt-4">
					<h5 class="pointer-events-none">{{ chatbot.title }}</h5>
					<div class="bg-white border border-primary text-primary shadow-sm rounded px-5 py-2 position-relative" id="start" data-id="start">
						START
						<div class="moveable line-creator" v-if="!startData.target" data-id="start"></div>
					</div>
				</div>

				<div class="chatbox moveable border bg-white shadow-sm rounded" :data-top="draggable.top" :data-left="draggable.left" :id="'draggable-' + draggable.id" :data-start="draggable.is_start" :data-id="draggable.id" :data-target="draggable.target" v-for="draggable in chatboxes" v-if="!draggable.removed">
					<template v-if="draggable.id != 'start'">
						<div v-if="!draggable.target && draggable.type != 'buttons' && draggable.metadata.action != 'trigger_chatbot'" class="moveable line-creator"></div>
						<div class="chatbox-controls">
							<button v-if="draggable.type == 'buttons'" class="btn btn-sm p-0 shadow-none" @click="addButton(draggable)"><plus-icon height="15" width="15"></plus-icon></button>
							<button class="btn btn-sm p-0 shadow-none" @click="deleteChatbox(draggable.id)"><trash-icon height="15" width="15"></trash-icon></button>
						</div>
						<div @mouseover="moveableHover" @mouseout="moveableMouseout">
							<div class="pt-1 px-2 dragger font-weight-bold mr-5">
								<small class="text-uppercase">{{ draggable.type }}</small>
							</div>
							<div class="p-2">
								<chat-autosize v-if="draggable.type != 'action'" spellcheck="false" :data-id="draggable.id" @resize="updateLeaderlines" @blur="updateMessage" v-model="draggable.message" placeholder="Write your message.."></chat-autosize>
								
								<!-- buttons -->
								<div v-if="draggable.type == 'buttons' && draggable.metadata && draggable.metadata.buttons" class="mt-1">
									<div class="position-relative mr-2 mb-1 w-100" v-for="button in draggable.metadata.buttons" :data-id="button.id" :class="{'d-none': button.removed}">
										<chat-autosize @resize="updateLeaderlines" @blur="updateUserInput" :id="'button-' + button.id" :data-parent="draggable.id" :key="button.id" wrapper_class="w-100" textarea_class="text-center w-100 text-primary border border-primary" v-model="button.text" placeholder="Name your button..">
										</chat-autosize>
										<span v-if="!button.target" class="moveable line-creator" data-type="button" :data-parent="draggable.id"></span>
										<button class="delete-button btn btn-sm p-0 shadow-none" @click="deleteButton(button.id, draggable.id)"><trash-icon height="15" width="15"></trash-icon></button>
									</div>
								</div>

								<!-- user input -->
								<div v-if="draggable.type == 'user_input'" class="form-group mb-0">
									<div class="d-flex">
										<div class="w-50 mr-1">
											<label class="form-label mb-0">Type</label>
											<vue-select :value="ObjectifyInputType(draggable.input_type)" @change="updateInputType($event, draggable)" :options="inputTypes" button_class="btn-sm" dropdown_class="w-100" placeholder="Select data type"></vue-select>
										</div>
										<div class="w-50 ml-1">
											<label class="form-label mb-0">Variable</label>
											<input type="text" :value="draggable.variable" @blur="updateVariable($event, draggable)" placeholder="Variable" class="form-control form-control-sm py-3">
										</div>
									</div>
									<div v-if="draggable.input_type == 'options'">
										<div class="btn btn-sm btn-light p-1 font-weight-normal border rounded my-1 d-flex align-items-center justify-content-center" @click="addOption(draggable)"><plus-icon height="14" width="14"></plus-icon> Add Option</div>
										<div v-if="draggable.metadata && draggable.metadata.options">
											<div v-for="option in draggable.metadata.options" class="mb-1 position-relative" :class="{'d-none': option.removed}">
												<chat-autosize @resize="updateLeaderlines" @blur="updateUserInput" :id="'option-' + option.id" :data-parent="draggable.id" :key="option.id" wrapper_class="w-100" textarea_class="text-center w-100 text-primary border border-primary" v-model="option.text" placeholder="Name your option..">
												</chat-autosize>
												<button class="delete-button btn btn-sm p-0 shadow-none" @click="deleteOption(option.id, draggable.id)"><trash-icon height="15" width="15"></trash-icon></button>
											</div>
										</div>
									</div>
								</div>

								<!-- action -->
								<div v-if="draggable.type == 'action'" class="form-group mb-0">
									<label class="form-label">Choose action</label>
									<vue-select :value="ObjectifyInputType(draggable.metadata ? draggable.metadata.action : '')" @change="updateActionType($event, draggable)" :options="actionTypes" button_class="btn-sm" dropdown_class="w-100" placeholder="Select action"></vue-select>
									<div v-if="draggable.metadata">
										<!-- download file -->
										<div v-if="draggable.metadata.action == 'download_file'">
											<div v-if="!draggable.metadata.file">
												<div class="btn btn-sm btn-light p-1 font-weight-normal border rounded my-1 d-flex align-items-center justify-content-center" @click="addDownloadFile(draggable)"><plus-icon height="14" width="14"></plus-icon> Add File</div>
												<input type="file" :id="'draggable-' + draggable.id + '-download_file'" @change="uploadFile($event, draggable)" hidden>
											</div>
											<div v-else class="d-flex align-items-center">
												<div class="font-weight-normal"><small>{{ draggable.metadata.file.filename }}</small></div>
												<button class="btn btn-sm ml-1 p-0 shadow-none" @click="deleteDownloadFile(draggable)"><trash-icon height="15" width="15"></trash-icon></button>
											</div>
										</div>

										<!-- open URL -->
										<div v-else-if="draggable.metadata.action == 'open_url'" class="mt-1">
											<input type="text" class="form-control form-control-sm" :value="draggable.metadata.url" placeholder="Add URL" @blur="updateOpenUrl($event, draggable)">
										</div>

										<!-- trigger chatbot -->
										<div v-else-if="draggable.metadata.action == 'trigger_chatbot'" class="mt-1">
											<vue-select :value="{text: draggable.metadata.bot_name, value: draggable.metadata.bot_id}" @change="updateTriggerChatbot($event, draggable)" :options="filteredChatbots" button_class="btn-sm" dropdown_class="w-100" placeholder="Select chatbot"></vue-select>
										</div>

										<!-- open panel -->
										<div v-else-if="draggable.metadata.action == 'open_panel'" class="mt-1">
											<vue-select :value="{text: draggable.metadata.panel, value: draggable.metadata.panel}" @change="updateOpenPanel($event, draggable)" :options="panels" button_class="btn-sm" dropdown_class="w-100" placeholder="Select panel"></vue-select>
										</div>
									</div>
								</div>
							</div>
						</div>
					</template>
				</div>
			</div>

			<div class="chatbox-types">
				<button class="btn btn-white shadow-sm border badge-pill btn-block" v-tooltip.left="'Message with buttons'" @click="addChatbox('buttons')"><align-v-icon width="20"></align-v-icon></button>
				<button class="btn btn-white shadow-sm border badge-pill btn-block" v-tooltip.left="'User input'" @click="addChatbox('user_input')"><user-interview-icon width="20"></user-interview-icon></button>
				<button class="btn btn-white shadow-sm border badge-pill btn-block" v-tooltip.left="'Quick reply'" @click="addChatbox('quick_reply')"><send-icon width="20"></send-icon></button>
				<button class="btn btn-white shadow-sm border badge-pill btn-block" v-tooltip.left="'Action'" @click="addChatbox('action')"><duplicate-alt-icon width="20"></duplicate-alt-icon></button>
				<button class="btn btn-white shadow-sm border badge-pill btn-block" v-tooltip.left="'Edit details'" data-toggle="modal" data-target="#editDetails"><info-circle-icon width="20"></info-circle-icon></button>
			</div>

			<div class="chatbox-scale text-center">
				<div class="mb-1 text-gray">{{ scale* 100 }}%</div>
				<button class="btn btn-white shadow-sm border badge-pill btn-block" v-tooltip.left="'Zoom In'" @click="scale += 0.25"><plus-icon width="20"></plus-icon></button>
				<button class="btn btn-white shadow-sm border badge-pill btn-block" v-tooltip.left="'Zoom Out'" @click="scale -= 0.25"><minus-icon width="20"></minus-icon></button>
			</div>
		</div>


		<div class="modal fade" tabindex="-1" role="dialog" id="editDetails">
		  	<div class="modal-dialog modal-dialog-centered" role="document">
			    <vue-form-validate class="modal-content" @submit="update">
			      	<div class="modal-header pb-0">
			      		<h5>Edit details</h5>
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
			      		<button type="button" class="btn btn-link text-danger mr-auto" data-toggle="modal" data-target="#deleteChatbot" data-dismiss="modal">Delete</button>
				        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
				        <button type="submit" class="btn btn-primary">Save</button>
			      	</div>
			    </vue-form-validate>
		  	</div>
		</div>

		<div class="modal fade" tabindex="-1" role="dialog" id="deleteChatbot">
		  	<div class="modal-dialog modal-dialog-centered" role="document">
			    <div class="modal-content">
			      	<div class="modal-header pb-0">
			      		<h5>Delete chatbot</h5>
				        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
				          <span aria-hidden="true">&times;</span>
				        </button>
			      	</div>
			      	<div class="modal-body">
			      		<p>Are you sure to delete this chatbot? This action cannot be undone.</p>
			      	</div>
			      	<div class="modal-footer">
				        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
				        <button type="submit" class="btn btn-danger" @click="destroy">Delete</button>
			      	</div>
			    </div>
		  	</div>
		</div>
	</div>
</template>

<script>
import Tooltip from './../../../directives/tooltip.js';
import ChatAutosize from './../../components/vue-chat-autosize';
import DragIcon from './../../icons/drag';
import TrashIcon from './../../icons/trash';
import AlignVIcon from './../../icons/align-v';
import UserInterviewIcon from './../../icons/user-interview';
import SendIcon from './../../icons/send';
import DuplicateAltIcon from './../../icons/duplicate-alt';
import PlusIcon from './../../icons/plus';
import MinusIcon from './../../icons/minus';
import InfoCircleIcon from './../../icons/info-circle';
import dayjs from 'dayjs';
import VueFormValidate from './../../../components/vue-form-validate';
import VueSelect from './../../../components/vue-select';

export default {
	components: {VueFormValidate, VueSelect, ChatAutosize, DragIcon, TrashIcon, AlignVIcon, UserInterviewIcon, SendIcon, DuplicateAltIcon, PlusIcon, MinusIcon, InfoCircleIcon},
	directives: {Tooltip},
	data: () => ({
		chatbots: [],
		chatbot: null,
		chatboxes: [],
		title: '',
		description: '',
		hoveredMoveable: null,
		isCreatingLine: false,
		newTargetMoveable: null,
		startData: {
			target: '',
			leaderline: null
		},
		inputTypes: [
			{
				text: 'Text',
				value: 'text'
			},
			{
				text: 'Email',
				value: 'email'
			},
			{
				text: 'Phone',
				value: 'phone'
			},
			{
				text: 'Options',
				value: 'options'
			},
		],
		actionTypes: [
			{
				text: 'Download file',
				value: 'download_file'
			},
			{
				text: 'Open URL',
				value: 'open_url'
			},
			{
				text: 'Trigger Chatbot',
				value: 'trigger_chatbot'
			},
			{
				text: 'Open panel',
				value: 'open_panel'
			},
		],
		panels: [
			{
				text: 'Inquiry form',
				value: 'inquiry_form'
			},
			{
				text: 'Booking',
				value: 'booking'
			},
			{
				text: 'Send video message',
				value: 'send_video'
			},
			{
				text: 'Send audio message',
				value: 'send_audio'
			},
		],
		scale: 1,
	}),

	computed: {
		filteredChatbots() {
			let filteredChatbots = this.chatbots.filter((c) => c.id != this.chatbot.id);
			filteredChatbots = filteredChatbots.map((c) => {
				return {
					text: c.title,
					value: c.bot_id
				};
			});
			return filteredChatbots;
		}
	},

	watch: {
		scale: function(value) {
			setTimeout(() => {
				this.updateLeaderlines();
			});
		}
	},

	created() {
		this.$root.heading = 'Chatbot';
		if(this.$route.params.id) {
			this.getData();
		}
	},

	mounted() {},

	methods: {
		updateOpenPanel(e, chatbox) {
			this.$set(chatbox.metadata, 'panel', e.text);
			this.updateChatbox(chatbox);
		},

		updateTriggerChatbot(e, chatbox) {
			this.$set(chatbox.metadata, 'bot_name', e.text);
			this.$set(chatbox.metadata, 'bot_id', e.value);
			this.updateChatbox(chatbox);
		},

		updateOpenUrl(e, chatbox) {
			this.$set(chatbox.metadata, 'url', e.target.value);
			this.updateChatbox(chatbox);
		},

		deleteDownloadFile(chatbox) {
			this.$delete(chatbox.metadata, 'file');
			this.updateChatbox(chatbox);
		},

		uploadFile(e, chatbox) {
			let files = e.target.files;
			if(files.length > 0) {
				let filename = files[0].name;
				let bodyFormData = new FormData();
				bodyFormData.append('file', files[0]);
				axios.post('/dashboard/upload_file', bodyFormData, {headers: {'Content-Type': 'multipart/form-data' }}).then((response) => {
					let file = {
						filename: filename,
						source: response.data.file
					};
					this.$set(chatbox.metadata, 'file', file);
					this.updateChatbox(chatbox);
				});
			}
		},

		addDownloadFile(chatbox) {
			document.querySelector(`#draggable-${chatbox.id}-download_file`).click();
		},

		addOption(chatbox){
			if(!chatbox.metadata || !chatbox.metadata.options) {
				chatbox.metadata = {options: []};
			}
			let timestamp = dayjs().valueOf();
			if(chatbox.input_type == 'options') {
				let timestamp = dayjs().valueOf();
				chatbox.metadata.options.push({
					id: timestamp,
					text: 'New option',
					type: 'option',
					parent: chatbox.id
				});
				this.updateChatbox(chatbox);
			}
		},

		updateLeaderlines() {
			// reposition all leaderline
			this.chatboxes.forEach((d) => {
				if (d.leaderline) d.leaderline.position();
				if (d.metadata && d.metadata.buttons) {
					d.metadata.buttons.forEach((b) => {
						if (b.leaderline && typeof b.leaderline.position === "function") b.leaderline.position();
					});
				}
			});
			if(this.startData.leaderline && typeof this.startData.leaderline.position === "function") {
				setTimeout(() => {
					this.startData.leaderline.position();
				});
			}
		},

		ObjectifyInputType(input_type) {
			let data = {};
			if(input_type) {
				data = {
					text: (input_type.charAt(0).toUpperCase() + input_type.slice(1)).replace('_', ' '),
					value: input_type,
				};
			}
			return data;
		},

		updateVariable(e, chatbox) {
			this.$set(chatbox, 'variable', e.currentTarget.value);
			this.updateChatbox(chatbox);
		},

		updateActionType(value, chatbox) {
			if(!chatbox.metadata || !chatbox.metadata.action) {
				chatbox.metadata = {action: null};
			}
			this.$set(chatbox.metadata, 'action', value.value);
			this.updateChatbox(chatbox);
		},

		updateInputType(value, chatbox) {
			this.$set(chatbox, 'input_type', value.value);
			this.updateChatbox(chatbox);
		},

		updateChatbox(chatbox) {
			axios.put(`/dashboard/chatboxes/${chatbox.id}`, chatbox).then((response) => {
				//console.log(response.data);
			});
		},

		destroy() {
			axios.delete(`/dashboard/chatbots/${this.$route.params.id}`).then((response) => {
				$('#deleteChatbot').modal('hide');
				this.$router.push('/dashboard/chatbots');
			});
		},

		update() {
			axios.put(`/dashboard/chatbots/${this.$route.params.id}`, {title: this.title, description: this.description}).then((response) => {
				this.chatbot = response.data;
				$('#editDetails').modal('hide');
			});
		},

		getData() {
			axios.get(`/dashboard/chatbots/${this.$route.params.id}`).then((response) => {
				this.$root.contentloading = false;
				this.chatbot = response.data;
				this.title = this.chatbot.title;
				this.description = this.chatbot.description;
				this.chatboxes = this.chatbot.chatboxes;
				this.$nextTick(() => {
					let moveables = document.querySelectorAll('.moveable');
					for (let moveable of moveables) {
						this.setupChatbox(moveable);
					}
				});
			});
			axios.get('/dashboard/chatbots').then((response) => {
				this.chatbots = response.data;
			});
		},

		setupChatbox(el) {
			let $this = this;
			let draggable = new PlainDraggable(el, {
				handle: el.querySelector('.dragger'),
				containment: document.querySelector('.chat-creator-parent'),
				zIndex: 100,
			});
			draggable.left = parseInt(el.getAttribute('data-left'));
			draggable.top = parseInt(el.getAttribute('data-top'));
			let defaultLeft = draggable.left;
			let defaultTop = draggable.top;
			let onDragEndLeaderLine = null;
			let onDragLeaderLine = null;

			if(el.getAttribute('data-start')) {
				let leaderLine = this.createLeaderLine(document.querySelector('#start'), el, null, {}, true);
				this.startData.target = el.getAttribute('data-id');
				this.startData.leaderline = leaderLine;
			}

			let chatbox = this.chatboxes.find((x) => x.id == el.getAttribute('data-id'));
			if (chatbox) {
				//leaderLineOptions.middleLabel = LeaderLine.captionLabel('x');
				this.$set(chatbox, 'draggable', draggable);
				if (chatbox.target) {
					let target = document.getElementById('draggable-' + chatbox.target);
					if(target) {
						let leaderLine = this.createLeaderLine(el, target, chatbox, {hide: true});
						this.$set(chatbox, 'leaderline', leaderLine);
						setTimeout(() => {
							leaderLine.position();
							leaderLine.show('none');
						});
					}
				}

				// Buttons
				if (chatbox.metadata && chatbox.metadata.buttons && chatbox.metadata.buttons.length > 0) {
					chatbox.metadata.buttons.forEach((b) => {
						if (b.target) {
							let start = document.getElementById('button-' + b.id);
							let end = document.getElementById('draggable-' + b.target);
							b.type = 'button';
							b.parent = chatbox.id;
							if (start && end) {
								let buttonLeaderLine = this.createLeaderLine(start, end, b);
								setTimeout(() => {
									buttonLeaderLine.position();
								});
								b.leaderline = buttonLeaderLine;
							}
						}
					});
				}
				draggable.left = chatbox.x;
				draggable.top = chatbox.y;

				// If el is line-creator
			} else if (el.classList.contains('line-creator')) {
				let leaderLine = this.createLeaderLine(el.parentNode, LeaderLine.pointAnchor({element: el, x: 8, y: 8}), null, {
					hide: true,
					size: 1.5,
					dash: {animation: {duration: 300}},
					middleLabel: null,
				});
				onDragLeaderLine = leaderLine;
				onDragEndLeaderLine = leaderLine;
			}

			draggable.onDrag = function(newPosition) {
				$this.onDrag(this.element, newPosition, onDragLeaderLine);
			};
			draggable.onDragEnd = function(newPosition) {
				$this.onDragEnd(this.element, newPosition, draggable, defaultLeft, defaultTop, onDragEndLeaderLine);
			};
		},

		addButton(chatbox){
			if(!chatbox.metadata.buttons) {
				this.$set(chatbox.metadata, 'buttons', []);
				chatbox.metadata.buttons = [];
			}
			let $this = this;
			let timestamp = dayjs().valueOf();
			if(chatbox.type == 'buttons') {
				let timestamp = dayjs().valueOf();
				chatbox.metadata.buttons.push({
					id: timestamp,
					text: 'New button',
					type: 'button',
					parent: chatbox.id
				});

				this.$nextTick(() => {
					let button = document.querySelector(`#button-${timestamp}`);
					if(button) {
						let lineCreator = button.parentNode.querySelector('.line-creator');
						if (lineCreator) this.setupChatbox(lineCreator);
					}
				});
				this.updateChatbox(chatbox);
			}
		},

		addChatbox(type) {
			let $this = this;
			let timestamp = dayjs().valueOf();
			let chatbox = {
				id: timestamp,
				message: '',
				type: type,
				metadata: {}
			};
			if(type == 'buttons') chatbox.metadata.buttons = [];
			this.chatboxes.push(chatbox);


			this.$nextTick(() => {
				axios.post(`/dashboard/chatboxes`, {chatbot_id: this.chatbot.id, type: type}).then((response) => {
					let chatbox = this.chatboxes.find((x) => x.id == timestamp);
					if(chatbox) this.$set(chatbox, 'id', response.data.id);

					this.$nextTick(() => {
						let moveable = document.querySelector(`#draggable-${response.data.id}`);
						if(moveable) {
							this.setupChatbox(moveable);
							let lineCreator = moveable.querySelector('.line-creator');
							if (lineCreator) this.setupChatbox(lineCreator);
						}
					});
				});
			});
		},

		deleteOption(option_id, chatbox_id) {
			let chatbox = this.chatboxes.find((x) => x.id == chatbox_id);
			if (chatbox) {
				let option = chatbox.metadata.options.find((x) => x.id == option_id);
				if(option) {
					this.$set(option, 'removed', true);
					let parsedChatbox = JSON.parse(JSON.stringify(chatbox));
					let options = parsedChatbox.metadata.options.filter((b) => !b.removed);
					parsedChatbox.metadata.options = options;
					this.updateChatbox(parsedChatbox);
					setTimeout(() => {
						this.updateLeaderlines();
					});
				}
			}
		},

		deleteButton(button_id, chatbox_id) {
			let chatbox = this.chatboxes.find((x) => x.id == chatbox_id);
			if (chatbox) {
				let button = chatbox.metadata.buttons.find((x) => x.id == button_id);
				if(button) {
					if(button.leaderline && typeof button.leaderline.remove === "function") button.leaderline.remove();
					this.$set(button, 'removed', true);
					let parsedChatbox = JSON.parse(JSON.stringify(chatbox));
					let buttons = parsedChatbox.metadata.buttons.filter((b) => !b.removed);
					parsedChatbox.metadata.buttons = buttons;
					this.updateChatbox(parsedChatbox);
					setTimeout(() => {
						this.updateLeaderlines();
					});
				}
			}
		},

		deleteChatbox(id) {
			let chatbox = this.chatboxes.find((x) => x.id == id);
			if (chatbox) {
				chatbox.draggable.remove();
				if(chatbox.leaderline) {
					chatbox.leaderline.remove();
					this.$delete(chatbox, 'leaderline');
				}
				if(chatbox.metadata && chatbox.metadata.buttons) {
					chatbox.metadata.buttons.forEach((b) => {
						if(b.leaderline && typeof b.leaderline.remove === "function") {
							b.leaderline.remove();
							this.$delete(b, 'leaderline');
						}
					});
				}
				if(this.startData.target == chatbox.id) {
					if(typeof this.startData.leaderline.remove === "function") this.startData.leaderline.remove();
					this.startData.leaderline = null;
					this.startData.target = '';
					this.createLineCreator(document.querySelector('#start'));
				}
				this.chatboxes.forEach((d) => {
					let updateD = false;
					if(d.target == id && d.leaderline) {
						if(typeof d.leaderline.remove === "function") d.leaderline.remove();
						this.$delete(d, 'leaderline');
						this.$delete(d, 'target');
						this.createLineCreator(document.querySelector(`#draggable-${d.id}`));
						d.target = null;
						updateD = true;
					}
					if(d.metadata && d.metadata.buttons) {
						d.metadata.buttons.forEach((b) => {
							if(b.target == id && b.leaderline && typeof b.leaderline.position === "function") {
								if(typeof b.leaderline.remove === "function") b.leaderline.remove();
								this.$delete(b, 'leaderline');
								this.$delete(b, 'target');
								this.createLineCreator(document.querySelector(`#button-${b.id}`));
								b.target = null;
								updateD = true;
							}
						})
					}
					if(updateD) this.updateChatbox(d);
				});
				this.$set(chatbox, 'removed', true);
				axios.delete(`/dashboard/chatboxes/${chatbox.id}`);
			}
		},

		updateMessage(e, component) {
			if (e && component) {
				let chatbox_id = component.$el.getAttribute('data-id');
				if(chatbox_id) {
					let chatbox = this.chatboxes.find((x) => x.id == chatbox_id);
					if(chatbox) this.updateChatbox(chatbox);
				}
			}
		},

		updateUserInput(e, component) {
			if (e && component) {
				let inputParent_id = component.$el.getAttribute('data-parent');
				if(inputParent_id) {
					let chatbox = this.chatboxes.find((x) => x.id == inputParent_id);
					if(chatbox) this.updateChatbox(chatbox);
				}
			}
		},


		moveableMouseout(e) {
			e.currentTarget.parentNode.style.zIndex = 'auto';
			e.currentTarget.parentNode.classList.remove('border-primary');
			this.hoveredMoveable = null;
			this.newTargetMoveable = null;
		},

		moveableHover(e) {
			this.hoveredMoveable = e.currentTarget.parentNode;
			if (this.isCreatingLine && 
				this.isCreatingLine != e.currentTarget.parentNode && 
				this.isCreatingLine.getAttribute('data-id') != e.currentTarget.parentNode.getAttribute('data-target') && 
				this.isCreatingLine.getAttribute('data-parent') != e.currentTarget.parentNode.getAttribute('data-id')) {
					e.currentTarget.parentNode.classList.add('border-primary');
					this.newTargetMoveable = e.currentTarget.parentNode.getAttribute('data-id');
			} else {
				this.newTargetMoveable = null;
			}
		},

		createLeaderLine(start, end, container = null, options = {}, isStart = false) {
			let leaderLineOptions = {
				size: 1.5,
				color: '#6e82ea',
				startPlug: 'disc',
				endPlug: 'arrow3',
				startPlugSize: 3,
				endPlugSize: 2.5,
				startSocketGravity: 20,
				endSocketGravity: 20,
				middleLabel: LeaderLine.captionLabel({text: 'x', color: 'red'}),
			};
			Object.keys(options).map((k) => {
				leaderLineOptions[k] = options[k];
			});
			let leaderLine = new LeaderLine(start, end, leaderLineOptions);
			if(container || isStart) {
				document.querySelector('.leader-line:last-of-type text').onclick = () => {
					leaderLine.remove();
					if(isStart) {
						let startChatbox = this.chatboxes.find((x) => x.id == this.startData.target);
						if(startChatbox) {
							startChatbox.is_start = false;
							this.updateChatbox(startChatbox);
						}
						this.startData.target = '';
						this.startData.leaderline = null;
					}
					if(container) {
						this.$delete(container, 'leaderline');
						this.$delete(container, 'target');
						container.target = null;
						if(container.type == 'button') {
							let buttonParent = this.chatboxes.find((x) => x.id == container.parent);
							if(buttonParent) this.updateChatbox(buttonParent);
						} else {
							this.updateChatbox(container);
						}
					}
					setTimeout(() => {
						this.createLineCreator(start);
					});
				};
			}
			return leaderLine;
		},

		createLineCreator(start) {
			setTimeout(() => {
				start = start.querySelector('.line-creator');
				if(start) {
					let $this = this;
					let draggable = new PlainDraggable(start, {
						handle: start.querySelector('.dragger'),
						containment: document.querySelector('.chat-creator-parent'),
						zIndex: 100
					});
					let defaultLeft = draggable.left;
					let defaultTop = draggable.top;
					let leaderLine = this.createLeaderLine(start.parentNode, LeaderLine.pointAnchor({element: start, x: 8, y: 8}), null, {
						hide: true,
						endPlug: 'disc',
						size: 1.5,
						endPlugSize: 4,
						dash: {animation: {duration: 300}},
						middleLabel: null,
					});
					draggable.onDrag = function(newPosition) {
						$this.onDrag(this.element, newPosition, leaderLine);
					};
					draggable.onDragEnd = function(newPosition) {
						$this.onDragEnd(this.element, newPosition, draggable, defaultLeft, defaultTop, leaderLine);
					};
				}
			});
		},

		onDragEnd(el, newPosition, draggable, defaultLeft, defaultTop, onDragEndLeaderLine = null) {
			if (el.classList.contains('line-creator')) {
				el.style.pointerEvents = 'auto';
				draggable.left = defaultLeft;
				draggable.top = defaultTop;
				el.style.opacity = 1;
				this.isCreatingLine = false;
				if (this.newTargetMoveable) {
					let data = null;
					let isStart = false;
					if (el.getAttribute('data-type') == 'button') {
						let buttonParent = this.chatboxes.find((x) => x.id == el.getAttribute('data-parent'));
						if(buttonParent) {
							let chatboxButton = buttonParent.metadata.buttons.find((b) => b.id == el.parentNode.getAttribute('data-id'));
							if(chatboxButton) {
								data = chatboxButton;
								data.target = this.newTargetMoveable;
								this.updateChatbox(buttonParent);
							}
						}
						/*if (parentIndex > -1 && this.chatboxes[parentIndex].buttons.length > 0) {
							let buttonIndex = this.chatboxes[parentIndex].buttons.findIndex((b) => b.id == el.parentNode.getAttribute('data-id'));
							if (buttonIndex > -1) data = this.chatboxes[parentIndex].buttons[buttonIndex];
						}*/
					} else if(el.getAttribute('data-id') == 'start') { 
						isStart = true;
					} else {
						let chatbox = this.chatboxes.find((x) => x.id == el.parentNode.getAttribute('data-id'));
						if (chatbox) {
							data = chatbox;
							data.target = this.newTargetMoveable;
							this.updateChatbox(data);
						}
					}
					let leaderLine = this.createLeaderLine(el.parentNode, document.getElementById('draggable-' + this.newTargetMoveable), data, {}, isStart);
					if(data) {
						this.$set(data, 'target', this.newTargetMoveable);
						this.$set(data, 'leaderline', leaderLine);
					}
					if(el.getAttribute('data-id') == 'start') {
						this.startData.target = this.newTargetMoveable;
						this.startData.leaderline = leaderLine;
						let startChatbox = this.chatboxes.find((x) => x.id == this.newTargetMoveable);
						if(startChatbox) {
							startChatbox.is_start = true;
							this.updateChatbox(startChatbox);
						}
					}
					if(onDragEndLeaderLine) onDragEndLeaderLine.remove();
				} else {
					if(onDragEndLeaderLine) {
						onDragEndLeaderLine.position();
						onDragEndLeaderLine.hide('none');
					}
				}
			} else {
				let chatbox = this.chatboxes.find((x) => x.id == el.getAttribute('data-id'));
				if(chatbox) {
					chatbox.top = newPosition.top;
					chatbox.left = newPosition.left;
					this.updateChatbox(chatbox);
				}
			}
			$('.leader-line').css('pointer-events', 'auto');
		},

		onDrag(el, newPosition = null, onDragLeaderLine = null) {
			if (onDragLeaderLine) onDragLeaderLine.position();

			if (el.classList.contains('line-creator')) {
				$('.leader-line').css('pointer-events', 'none');
				el.style.pointerEvents = 'none';
				onDragLeaderLine.position();
				if(el.getAttribute('data-type') == 'button') {
					this.isCreatingLine = document.querySelector(`#draggable-${el.getAttribute('data-parent')}`);
				} else {
					this.isCreatingLine = el.parentNode;
				}
				if (onDragLeaderLine) {
					if (this.hoveredMoveable == el.parentNode) {
						onDragLeaderLine.hide('none');
						el.style.opacity = 1;
					} else {
						onDragLeaderLine.show('none');
						el.style.opacity = 0;
					}
				}
			} else {
				$('.leader-line').css('pointer-events', 'auto');
				el.style.pointerEvents = 'auto';
				this.isCreatingLine = false;
				let chatbox = this.chatboxes.find((x) => x.id == el.getAttribute('data-id'));
				if (chatbox) {
					let leaderline = chatbox.leaderline;
					if (leaderline) leaderline.position();
					//buttons
					if (chatbox.metadata && chatbox.metadata.buttons) {
						chatbox.metadata.buttons.forEach((b) => {
							if (b.leaderline && typeof b.leaderline.position === "function") b.leaderline.position();
						});
					}

					// check if start
					if(this.startData.target == chatbox.id && this.startData.leaderline) this.startData.leaderline.position();
				}

				//parents
				this.chatboxes
					.filter((x) => {
						return x.target == el.getAttribute('data-id') && !x.removed;
					})
					.forEach((p) => {
						if (p.leaderline) p.leaderline.position();
					});

				//connected buttons
				this.chatboxes.forEach((cb) => {
					if (cb.metadata && cb.metadata.buttons && !cb.removed) {
						cb.metadata.buttons.forEach((b) => {
							if (b.target == el.getAttribute('data-id') && b.leaderline && typeof b.leaderline.position === "function") b.leaderline.position();
						});
					}
				});

			}
		},
	},
};
</script>
