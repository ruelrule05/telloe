<template>
	<div v-if="chatbot" class="h-100 w-100 position-relative">
		<div class="position-relative h-100 w-100 chat-creator-parent">

			<div class="chatbox-start d-inline-block text-center pt-4">
				<h5 class="pointer-events-none">{{ chatbot.title }}</h5>
				<div class="bg-white border border-primary text-primary shadow-sm rounded px-5 py-2 position-relative" id="start" data-id="start">
					START
					<div class="moveable line-creator" v-if="!startData.target" data-id="start"></div>
				</div>
			</div>

			<div class="chatbox moveable border bg-white shadow-sm rounded" :data-top="draggable.top" :data-left="draggable.left" :id="'draggable-' + draggable.id" :data-start="draggable.is_start" :data-id="draggable.id" :data-target="draggable.target" v-for="draggable in chatboxes" v-if="!draggable.removed">
				<template v-if="draggable.id != 'start'">
					<div v-if="!draggable.target" class="moveable line-creator"></div>
					<div class="chatbox-controls">
						<button v-if="draggable.type == 'buttons'" class="btn btn-sm p-0 shadow-none" @click="addButton(draggable)"><plus-icon height="15" width="15"></plus-icon></button>
						<button class="btn btn-sm p-0 shadow-none" @click="deleteChatbox(draggable.id)"><trash-icon height="15" width="15"></trash-icon></button>
					</div>
					<div @mouseover="moveableHover" @mouseout="moveableMouseout">
						<div class="pt-1 px-2 dragger font-weight-bold mr-5">
							<small class="text-uppercase">{{ draggable.type }}</small>
						</div>
						<div class="p-2">
							<div class="text-center position-absolute w-100" style="top: 0"></div>
							<chat-autosize spellcheck="false" :data-id="draggable.id" @resize="autosizeInput" @blur="autosizeBlur" v-model="draggable.message" class="form-control form-control-sm shadow-none border-0 outline-0 chatbot-message d-inline-block" rows="1">{{ draggable.message }}</chat-autosize>
							<div v-if="draggable.buttons" class="mt-2">
								<button v-for="button in draggable.buttons" :id="'button-' + button.id" :data-parent="draggable.id" :data-id="button.id" class="mr-2 mb-2 btn btn-sm btn-outline-primary border border-primary badge-pill position-relative">
									<span v-if="!button.target" class="moveable line-creator"></span>
									<span class="outline-0">{{ button.text }}</span>
								</button>
							</div>
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
							</div>
						</div>
					</div>
				</template>
			</div>

			<div class="chatbox-types">
				<button class="btn btn-white shadow-sm border badge-pill btn-block" v-tooltip.left="'Message with buttons'" @click="addChatbox('buttons')"><align-v-icon width="20"></align-v-icon></button>
				<button class="btn btn-white shadow-sm border badge-pill btn-block" v-tooltip.left="'User input'" @click="addChatbox('user_input')"><user-interview-icon width="20"></user-interview-icon></button>
				<button class="btn btn-white shadow-sm border badge-pill btn-block" v-tooltip.left="'Quick reply'" @click="addChatbox('quick_reply')"><send-icon width="20"></send-icon></button>
				<button class="btn btn-white shadow-sm border badge-pill btn-block" v-tooltip.left="'Action'"><duplicate-alt-icon width="20"></duplicate-alt-icon></button>
				<button class="btn btn-white shadow-sm border badge-pill btn-block" v-tooltip.left="'Edit details'" data-toggle="modal" data-target="#editDetails"><info-circle-icon width="20"></info-circle-icon></button>
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
import ChatAutosize from './../../vue-chat-autosize';
import DragIcon from './../../../icons/drag';
import TrashIcon from './../../../icons/trash';
import AlignVIcon from './../../../icons/align-v';
import UserInterviewIcon from './../../../icons/user-interview';
import SendIcon from './../../../icons/send';
import DuplicateAltIcon from './../../../icons/duplicate-alt';
import PlusIcon from './../../../icons/plus';
import InfoCircleIcon from './../../../icons/info-circle';
import dayjs from 'dayjs';
import VueFormValidate from './../../../components/vue-form-validate';
import VueSelect from './../../../components/vue-select';
export default {
	components: {VueFormValidate, VueSelect, ChatAutosize, DragIcon, TrashIcon, AlignVIcon, UserInterviewIcon, SendIcon, DuplicateAltIcon, PlusIcon, InfoCircleIcon},
	directives: {Tooltip},
	data: () => ({
		chatbot: null,
		chatboxes: [],
		title: '',
		description: '',
		reports: [],
		draggables: [
			{
				id: 1,
				message: 'This is the start of the conversation',
				target: 2,
				type: 'Start',
				x: 200,
				y: 50,
			},
			{
				id: 2,
				type: 'Buttons',
				message: 'This is a message w/ buttons',
				target: 3,
				x: 550,
				y: 150,
				buttons: [
					{
						id: 4,
						text: 'Booking',
						target: 6,
					},
					{
						id: 5,
						text: 'General Inquiry',
					},
				],
			},
			{
				id: 3,
				message: 'This is a quick reply message',
				type: 'Quick reply',
				x: 900,
				y: 250,
			},
			{
				id: 6,
				message: 'Can I have your email please?',
				type: 'User input',
				x: 418,
				y: 350,
			},
		],
		hoveredMoveable: null,
		isCreatingLine: false,
		newTargetMoveable: null,
		startData: {
			target: '',
			leaderline: null
		},
		inputTypes: [
			{
				text: 'Email',
				value: 'email'
			},
			{
				text: 'Phone',
				value: 'phone'
			},
		]
	}),

	computed: {},

	created() {
		this.$root.heading = 'Chatbot';
		if(this.$route.params.id) {
			this.getData();
		}
	},

	mounted() {},

	methods: {
		ObjectifyInputType(input_type) {
			let data = {};
			if(input_type) {
				data = {
					text: input_type.charAt(0).toUpperCase() + input_type.slice(1),
					value: input_type,
				};
			}
			return data;
		},


		updateVariable(e, chatbox) {
			this.$set(chatbox, 'variable', e.currentTarget.value);
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

			let index = this.chatboxes.findIndex((x) => x.id == el.getAttribute('data-id'));
			if (index > -1) {
				//leaderLineOptions.middleLabel = LeaderLine.captionLabel('x');
				this.chatboxes[index].draggable = draggable;
				if (this.chatboxes[index].target) {
					let leaderLine = this.createLeaderLine(el, document.getElementById('draggable-' + this.chatboxes[index].target), this.chatboxes[index], {hide: true});
					this.chatboxes[index].leaderline = leaderLine;
					setTimeout(() => {
						leaderLine.position();
						leaderLine.show('none');
					});
				}

				// Buttons
				if (this.chatboxes[index].buttons && this.chatboxes[index].buttons.length > 0) {
					this.chatboxes[index].buttons.forEach((b) => {
						if (b.target) {
							let start = document.getElementById('button-' + b.id);
							let end = document.getElementById('draggable-' + b.target);
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
				draggable.left = this.chatboxes[index].x;
				draggable.top = this.chatboxes[index].y;

				// If el is line-creator
			} else if (el.classList.contains('line-creator')) {
				let leaderLine = this.createLeaderLine(el.parentNode, LeaderLine.pointAnchor({element: el, x: 8, y: 8}), null, {
					hide: true,
					endPlug: 'disc',
					size: 1.5,
					endPlugSize: 4,
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
			chatbox.buttons = chatbox.buttons || [];
			let $this = this;
			let timestamp = dayjs().valueOf();
			if(chatbox.type == 'buttons') {
				let timestamp = dayjs().valueOf();
				chatbox.buttons.push({
					id: timestamp,
					text: 'New button'
				});

				this.$nextTick(() => {
					let moveable = document.querySelector(`#button-${timestamp}`);
					if(moveable) {
						this.setupChatbox(moveable);
						let lineCreator = moveable.querySelector('.line-creator');
						if (lineCreator) this.setupChatbox(lineCreator);
					}
				});
				this.updateChatbox(chatbox);
			}
			// ajax post to save and update ID
		},

		addChatbox(type) {
			let $this = this;
			let timestamp = dayjs().valueOf();
			let chatbox = {
				id: timestamp,
				message: '',
				type: type,
				buttons: []
			};
			if(type == 'buttons') chatbox.buttons = [];
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

		deleteChatbox(id) {
			let chatbox = this.chatboxes.find((x) => x.id == id);
			if (chatbox) {
				chatbox.draggable.remove();
				if(chatbox.leaderline) {
					chatbox.leaderline.remove();
					this.$delete(chatbox, 'leaderline');
				}
				if(chatbox.buttons) {
					chatbox.buttons.forEach((b) => {
						if(b.leaderline) {
							b.leaderline.remove();
							this.$delete(b, 'leaderline');
						}
					});
				}
				if(this.startData.target == chatbox.id) {
					this.startData.leaderline.remove();
					this.startData.leaderline = null;
					this.startData.target = '';
					this.createLineCreator(document.querySelector('#start'));
				}
				this.chatboxes.forEach((d) => {
					if(d.target == id && d.leaderline) {
						d.leaderline.remove();
						this.$delete(d, 'leaderline');
						this.$delete(d, 'target');
						this.createLineCreator(document.querySelector(`#draggable-${d.id}`));
					}
					if(d.buttons) {
						d.buttons.forEach((b) => {
							if(b.target == id && b.leaderline) {
								b.leaderline.remove();
								this.$delete(b, 'leaderline');
								this.$delete(b, 'target');
								this.createLineCreator(document.querySelector(`#button-${b.id}`));
							}
						})
					}
				});
				this.$set(chatbox, 'removed', true);
				axios.delete(`/dashboard/chatboxes/${chatbox.id}`);
			}
		},

		autosizeBlur(e, component) {
			if (e && component) {
				let chatbox_id = component.$el.getAttribute('data-id');
				if(chatbox_id) {
					let chatbox = this.chatboxes.find((x) => x.id == chatbox_id);
					if(chatbox) this.updateChatbox(chatbox);
				}
			}
		},

		autosizeInput(e, component) {
			if (e && component) {
				// repositionn all leaderline
				this.chatboxes.forEach((d) => {
					if (d.leaderline) d.leaderline.position();
					if (d.buttons) {
						d.buttons.forEach((b) => {
							if (b.leaderline) b.leaderline.position();
						});
					}
				});
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
				size: 3,
				color: '#6e82ea',
				startPlug: 'hidden',
				endPlug: 'disc',
				endPlugSize: 1.5,
				path: 'straight',
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
						this.updateChatbox(container);
					}

					this.createLineCreator(start);
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
					if (el.parentNode.tagName == 'BUTTON') {
						let parentIndex = this.chatboxes.findIndex((x) => x.id == el.parentNode.getAttribute('data-parent'));
						if (parentIndex > -1 && this.chatboxes[parentIndex].buttons.length > 0) {
							let buttonIndex = this.chatboxes[parentIndex].buttons.findIndex((b) => b.id == el.parentNode.getAttribute('data-id'));
							if (buttonIndex > -1) data = this.chatboxes[parentIndex].buttons[buttonIndex];
						}
					} else if(el.getAttribute('data-id') == 'start') { 
						isStart = true;
					} else {
						let index = this.chatboxes.findIndex((x) => x.id == el.parentNode.getAttribute('data-id'));
						if (index > -1) data = this.chatboxes[index];
						if(data) {
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
				this.isCreatingLine = el.parentNode;
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
				let index = this.chatboxes.findIndex((x) => x.id == el.getAttribute('data-id'));
				if (index > -1) {
					let leaderline = this.chatboxes[index].leaderline;
					if (leaderline) leaderline.position();
					//buttons
					if (this.chatboxes[index].buttons) {
						this.chatboxes[index].buttons.forEach((b) => {
							if (b.leaderline) b.leaderline.position();
						});
					}

					// check if start
					if(this.startData.target == this.chatboxes[index].id && this.startData.leaderline) this.startData.leaderline.position();
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
					if (cb.buttons && !cb.removed) {
						cb.buttons.forEach((b) => {
							if (b.target == el.getAttribute('data-id') && b.leaderline) b.leaderline.position();
						});
					}
				});

			}
		},
	},
};
</script>
