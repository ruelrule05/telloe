<template>
	<div class="position-relative h-100 w-100 chat-creator-parent">
		<div class="chatbox moveable border bg-white shadow-sm rounded" :id="'draggable-' + draggable.id" :data-id="draggable.id" :data-target="draggable.target" v-for="draggable in draggables" v-if="!draggable.removed">
			<div v-if="!draggable.target" class="moveable line-creator"></div>
			<div class="chatbox-controls">
				<button v-if="draggable.type == 'Buttons'" class="btn btn-sm p-0 shadow-none" @click="addButton(draggable)"><plus-icon height="15" width="15"></plus-icon></button>
				<button class="btn btn-sm p-0 shadow-none" @click="deleteChatbox(draggable.id)"><trash-icon height="15" width="15"></trash-icon></button>
			</div>
			<div @mouseover="moveableHover" @mouseout="moveableMouseout">
				<div class="pt-1 px-2 dragger bg-lightx font-weight-bold mr-5">
					<small>{{ draggable.type }}</small>
				</div>
				<div class="p-2">
					<div class="text-center position-absolute w-100" style="top: 0"></div>
					<chat-autosize spellcheck="false" :data-id="draggable.id" @resize="autosizeInput" v-model="draggable.message" class="form-control form-control-sm shadow-none border-0 outline-0 chatbot-message d-inline-block" rows="1">{{ draggable.message }}</chat-autosize>
					<div v-if="draggable.buttons" class="mt-2">
						<button v-for="button in draggable.buttons" :id="'button-' + button.id" :data-parent="draggable.id" :data-id="button.id" class="mr-2 mb-2 btn btn-sm btn-outline-primary border border-primary badge-pill position-relative">
							<span v-if="!button.target" class="moveable line-creator"></span>
							<span class="outline-0">{{ button.text }}</span>
						</button>
					</div>
				</div>
			</div>
		</div>

		<div class="chatbox-types">
			<button class="btn btn-white shadow-sm border badge-pill btn-block" v-tooltip.left="'Message with buttons'" @click="addChatbox('Buttons')"><align-v-icon width="20"></align-v-icon></button>
			<button class="btn btn-white shadow-sm border badge-pill btn-block" v-tooltip.left="'User input'" @click="addChatbox('User input')"><user-interview-icon width="20"></user-interview-icon></button>
			<button class="btn btn-white shadow-sm border badge-pill btn-block" v-tooltip.left="'Quick reply'" @click="addChatbox('Quick reply')"><send-icon width="20"></send-icon></button>
			<button class="btn btn-white shadow-sm border badge-pill btn-block" v-tooltip.left="'Action'"><duplicate-alt-icon width="20"></duplicate-alt-icon></button>
		</div>
	</div>
</template>

<script>
import Tooltip from './../../directives/tooltip.js';
import ChatAutosize from './../vue-chat-autosize';
import DragIcon from './../../icons/drag';
import TrashIcon from './../../icons/trash';
import AlignVIcon from './../../icons/align-v';
import UserInterviewIcon from './../../icons/user-interview';
import SendIcon from './../../icons/send';
import DuplicateAltIcon from './../../icons/duplicate-alt';
import PlusIcon from './../../icons/plus';
import dayjs from 'dayjs';
export default {
	components: {ChatAutosize, DragIcon, TrashIcon, AlignVIcon, UserInterviewIcon, SendIcon, DuplicateAltIcon, PlusIcon},
	directives: {Tooltip},
	data: () => ({
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
	}),

	computed: {},

	created() {
		this.$root.contentloading = false;
		this.$root.heading = 'Chatbot';
	},

	mounted() {
		let moveables = document.querySelectorAll('.moveable');
		for (let moveable of moveables) {
			this.setupChatbox(moveable);
		}
	},

	methods: {
		setupChatbox(el) {
			let $this = this;
			let draggable = new PlainDraggable(el, {
				handle: el.querySelector('.dragger'),
				containment: document.querySelector('.chat-creator-parent'),
				zIndex: 100
			});
			let defaultLeft = draggable.left;
			let defaultTop = draggable.top;
			let onDragEndLeaderLine = null;
			let onDragLeaderLine = null;

			let index = this.draggables.findIndex((x) => x.id == el.getAttribute('data-id'));
			if (index > -1) {
				//leaderLineOptions.middleLabel = LeaderLine.captionLabel('x');
				this.draggables[index].draggable = draggable;
				if (this.draggables[index].target) {
					let leaderLine = this.createLeaderLine(el, document.getElementById('draggable-' + this.draggables[index].target), this.draggables[index]);
					this.draggables[index].leaderline = leaderLine;
					setTimeout(() => {
						leaderLine.position();
					});
				}

				// Buttons
				if (this.draggables[index].buttons && this.draggables[index].buttons.length > 0) {
					this.draggables[index].buttons.forEach((b) => {
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
				draggable.left = this.draggables[index].x;
				draggable.top = this.draggables[index].y;

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

		addButton(draggable){
			let $this = this;
			let timestamp = dayjs().valueOf();
			if(draggable.type == 'Buttons') {
				let timestamp = dayjs().valueOf();
				draggable.buttons.push({
					id: timestamp,
					text: 'New button'
				});
			}

			this.$nextTick(() => {
				let moveable = document.querySelector(`#button-${timestamp}`);
				if(moveable) {
					this.setupChatbox(moveable);
					let lineCreator = moveable.querySelector('.line-creator');
					if (lineCreator) this.setupChatbox(lineCreator);
				}

			});
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
			if(type == 'Buttons') chatbox.buttons = [];
			this.draggables.push(chatbox);

			this.$nextTick(() => {
				let moveable = document.querySelector(`#draggable-${timestamp}`);
				if(moveable) {
					this.setupChatbox(moveable);
					let lineCreator = moveable.querySelector('.line-creator');
					if (lineCreator) this.setupChatbox(lineCreator);
				}
			});
	
			// ajax post to save and update ID
		},

		deleteChatbox(id) {
			let index = this.draggables.findIndex((x) => x.id == id);
			if (index > -1) {
				let chatbox = this.draggables[index];
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
				this.draggables.forEach((d) => {
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
				this.$set(this.draggables[index], 'removed', true);
			}
		},

		autosizeInput(e, el) {
			if (e && el) {
				// repositionn all leaderline
				this.draggables.forEach((d) => {
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
			e.currentTarget.parentNode.classList.remove('border-primary');
			this.hoveredMoveable = null;
			this.newTargetMoveable = null;
		},

		moveableHover(e) {
			console.log(e.currentTarget.parentNode.getAttribute('data-target'));
			this.hoveredMoveable = e.currentTarget.parentNode;
			if (this.isCreatingLine && this.isCreatingLine != e.currentTarget.parentNode && this.isCreatingLine.getAttribute('data-id') != e.currentTarget.parentNode.getAttribute('data-target') && this.isCreatingLine.getAttribute('data-parent') != e.currentTarget.parentNode.getAttribute('data-id')) {
				e.currentTarget.parentNode.classList.add('border-primary');
				this.newTargetMoveable = e.currentTarget.parentNode.getAttribute('data-id');
			} else {
				this.newTargetMoveable = null;
			}
		},

		createLeaderLine(start, end, container = null, options = {}) {
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
			if(container) {
				document.querySelector('.leader-line:last-of-type text').onclick = () => {
					leaderLine.remove();
					this.$delete(container, 'leaderline');
					this.$delete(container, 'target');
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
					if (el.parentNode.tagName == 'BUTTON') {
						let parentIndex = this.draggables.findIndex((x) => x.id == el.parentNode.getAttribute('data-parent'));
						if (parentIndex > -1 && this.draggables[parentIndex].buttons.length > 0) {
							let buttonIndex = this.draggables[parentIndex].buttons.findIndex((b) => b.id == el.parentNode.getAttribute('data-id'));
							if (buttonIndex > -1) data = this.draggables[parentIndex].buttons[buttonIndex];
						}
					} else {
						let index = this.draggables.findIndex((x) => x.id == el.parentNode.getAttribute('data-id'));
						if (index > -1) data = this.draggables[index];
					}
					let leaderLine = this.createLeaderLine(el.parentNode, document.getElementById('draggable-' + this.newTargetMoveable), data);
					this.$set(data, 'target', this.newTargetMoveable);
					this.$set(data, 'leaderline', leaderLine);
					if(onDragEndLeaderLine) onDragEndLeaderLine.remove();
				} else {
					if(onDragEndLeaderLine) {
						onDragEndLeaderLine.position();
						onDragEndLeaderLine.hide('none');
					}
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
				let index = this.draggables.findIndex((x) => x.id == el.getAttribute('data-id'));
				if (index > -1) {
					let leaderline = this.draggables[index].leaderline;
					if (leaderline) leaderline.position();
					//buttons
					if (this.draggables[index].buttons) {
						this.draggables[index].buttons.forEach((b) => {
							if (b.leaderline) b.leaderline.position();
						});
					}
				}

				//parents
				this.draggables
					.filter((x) => {
						return x.target == el.getAttribute('data-id') && !x.removed;
					})
					.forEach((p) => {
						if (p.leaderline) p.leaderline.position();
					});

				//connected buttons
				this.draggables.forEach((cb) => {
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
