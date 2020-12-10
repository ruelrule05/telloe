import { mapState, mapActions } from 'vuex';

import MessageType from '../message-type';
import VueFormValidate from '../../../../../components/vue-form-validate';
import VueSelect from '../../../../../components/vue-select/vue-select.vue';
import ToggleSwitch from '../../../../../components/toggle-switch/toggle-switch.vue';
import Bookings from './bookings/bookings.vue';
import FormSearch from '../../../../../components/form-search/form-search.vue';

import CloseIcon from '../../../../../icons/close';
import PlusIcon from '../../../../../icons/plus';
import PlayIcon from '../../../../../icons/play';
import VolumeMidIcon from '../../../../../icons/volume-mid';
import BookmarkIcon from '../../../../../icons/bookmark';
import TrashIcon from '../../../../../icons/trash';
import HistoryIcon from '../../../../../icons/history';
import PencilIcon from '../../../../../icons/pencil';
import ChevronRightIcon from '../../../../../icons/chevron-right';
import ClockIcon from '../../../../../icons/clock';
import PlannerIcon from '../../../../../icons/planner';
import DocumentIcon from '../../../../../icons/document';
import MoveIcon from '../../../../../icons/move';
import VueScrollTo from 'vue-scrollto';
import Tooltip from '../../../../../js/directives/tooltip';

export default {
	components: {
		MessageType,
		VueFormValidate,
		VueSelect,
		ToggleSwitch,
		Bookings,
		FormSearch,

		CloseIcon,
		PlusIcon,
		PlayIcon,
		VolumeMidIcon,
		BookmarkIcon,
		TrashIcon,
		HistoryIcon,
		PencilIcon,
		ChevronRightIcon,
		ClockIcon,
		PlannerIcon,
		DocumentIcon,
		MoveIcon
	},

	directives: { VueScrollTo, Tooltip },

	props: {
		conversation: {
			required: true
		},
		closeButton: {
			type: Boolean,
			default: true
		}
	},

	data: () => ({
		newTag: '',
		newNote: '',
		customFieldForm: {
			name: '',
			value: '',
			is_visible: false,
			is_custom: false
		},
		tagSearch: '',
		editFields: false,
		addField: false,
		new_field: {},
		fileType: 'image',
		addingNote: false,
		selectedNote: null
	}),

	computed: {
		...mapState({
			user_blacklisted_services: state => state.user_blacklisted_services.index
		}),

		customFields() {
			let custom_fields = [];
			(this.$root.auth.custom_fields || []).forEach(custom_field => {
				custom_fields.push({
					text: custom_field,
					value: custom_field
				});
			});
			return custom_fields;
		},

		blacklisted_services() {
			let user_id = this.$root.auth.id == this.conversation.user_id ? this.conversation.member.id : this.$root.auth.id;
			return this.user_blacklisted_services[user_id] || [];
		},

		tagsData() {
			let tagsData = {
				data: [],
				tags: []
			};
			let allTags = [];

			((this.conversation.paginated_messages || {}).data || []).forEach(message => {
				if (message.tags.length > 0) {
					allTags.push({
						type: 'message',
						data: message
					});
					message.tags.forEach(tag => {
						if (tagsData.tags.indexOf(tag) == -1) tagsData.tags.push(tag);
					});
				}
			});
			(this.conversation.notes || []).forEach(note => {
				if (note.tags.length > 0) {
					allTags.push({
						type: 'note',
						data: note
					});
					note.tags.forEach(tag => {
						if (tagsData.tags.indexOf(tag) == -1) tagsData.tags.push(tag);
					});
				}
			});

			let tagQuery = this.tagSearch.trim().toLowerCase();
			if (tagQuery.length > 0) {
				allTags.forEach(tag => {
					if (
						JSON.stringify(tag.data.tags)
							.toLowerCase()
							.includes(tagQuery)
					)
						tagsData.data.push(tag);
				});
			} else {
				tagsData.data = allTags;
			}

			return tagsData;
		},

		files() {
			let files = [];
			((this.conversation.files || {}).data || []).forEach(file => {
				if (file.type == this.fileType) files.push(file);
			});
			return files;
		}
	},

	watch: {
		'$root.profileTab': function() {
			this.tagSearch = '';
		},
		'conversation.id': function() {
			//if (this.conversation.user_id == this.$root.auth.id) this.getNotes(this.conversation.id);
			$('#info-items > div').show();
		},
		'customFieldForm.name': function(value) {
			if (value == 'custom') {
				this.customFieldForm.name = '';
				this.customFieldForm.is_custom = true;
			}
		}
	},

	created() {},

	methods: {
		...mapActions({
			updateConversation: 'conversations/update'
		}),

		addNewField() {
			if (this.new_field.name && this.new_field.value) {
				this.new_field.is_visible = false;
				this.conversation.custom_fields.push(this.new_field);
				this.updateConversation(this.conversation);
				this.new_field = {};
				this.addField = false;
			}
		},

		toggleCollapse(e) {
			let parent = $(e.currentTarget).parent()[0];
			$('#info-items > div')
				.not(parent)
				.hide();
			let currentTarget = e.currentTarget;
			setTimeout(() => {
				if (currentTarget.getAttribute('aria-expanded') == 'false') {
					$('#info-items > div').show();
				}
			}, 150);
		},

		closeInfo() {
			this.$root.detailsTab = '';
		},

		updateField(custom_field) {
			console.log(custom_field);
		},

		/*   updateCustomField(custom_field) {
            this.$set(custom_field, 'name', custom_field.new_name);
            this.$set(custom_field, 'value', custom_field.new_value);
            this.updateConversation(this.conversation);
            this.$refs['customFieldsLabel'].click();
        },

        editCustomField(custom_field) {
            this.$set(custom_field, 'new_name', custom_field.name);
            this.$set(custom_field, 'new_value', custom_field.value);
        },

        addCustomField() {
            if(this.customFieldForm.name && this.customFieldForm.value) {
                this.conversation.custom_fields.unshift(Object.assign({}, this.customFieldForm));
                this.updateConversation(this.conversation);
            }
        },*/

		updateNoteTags(note) {
			const newTag = (note.newTag || '').trim();
			if (newTag && !note.tags.find(x => x == newTag)) note.tags.push(newTag);
			note.newTag = '';
			this.updateNote(note);
		},

		removeHiglightMessage(message) {
			setTimeout(() => {
				$(`#${message.id} .message-content`).removeClass('highlight-message');
			}, 500);
		},

		highlightMessage(message) {
			$(`#${message.id} .message-content`).addClass('highlight-message');
		},

		addNote() {
			let note = {
				conversation_id: this.conversation.id,
				notes: this.newNote
			};
			this.storeNote(note);
			this.newNote = '';
			this.addingNote = false;
			this.$refs['profileImage'].click();
		},

		isFile(message) {
			let fileTypes = ['image', 'video', 'audio', 'file'];
			return fileTypes.indexOf(message.type) > -1;
		},

		disableNewline(e) {
			if (e.keyCode == 13) e.preventDefault();
		},

		updateConversationName(e) {
			if (this.conversation) {
				let newName = e.target.textContent.trim();
				if (newName && newName != this.conversation.name) {
					this.conversation.name = newName;
					this.updateConversation(this.conversation);
				}
				e.target.textContent = newName || this.conversation.name;
			}
		}
	}
};
