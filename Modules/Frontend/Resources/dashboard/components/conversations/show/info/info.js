import {mapState, mapActions} from 'vuex';

import MessageType from '../message-type';
import VueFormValidate from '../../../../../components/vue-form-validate';
import ToggleSwitch from '../../../../../components/toggle-switch/toggle-switch.vue';
import Bookings from './bookings/bookings.vue';
import FormSearch from '../../../../../components/form-search/form-search.vue';

import CloseIcon from '../../../../../icons/close';
import PlusIcon from '../../../../../icons/plus';
import PlayIcon from '../../../../../icons/play';
import VolumeMidIcon from '../../../../../icons/volume-mid';
import DocumentIcon from '../../../../../icons/document';
import BookmarkIcon from '../../../../../icons/bookmark';
import TrashIcon from '../../../../../icons/trash';
import HistoryIcon from '../../../../../icons/history';
import PencilIcon from '../../../../../icons/pencil';
import ChevronDownIcon from '../../../../../icons/chevron-down';
import ClockIcon from '../../../../../icons/clock';
import PlannerIcon from '../../../../../icons/planner';
import FilePdfIcon from '../../../../../icons/file-pdf';

import VueScrollTo from 'vue-scrollto';
import Tooltip from '../../../../../js/directives/tooltip';

export default {
	components: {
        MessageType,
        VueFormValidate,
        ToggleSwitch,
        Bookings,
        FormSearch,

		CloseIcon,
		PlusIcon,
		PlayIcon,
		VolumeMidIcon,
		DocumentIcon,
		BookmarkIcon,
        TrashIcon,
        HistoryIcon,
        PencilIcon,
        ChevronDownIcon,
        ClockIcon,
        PlannerIcon,
        FilePdfIcon,
	},

    directives: {VueScrollTo, Tooltip},

	props: {
		conversation: {
			required: true,
		},
	},

	data: () => ({
		newTag: '',
        fileType: 'all',
        newNote: '',
        customFieldForm: {
            name: '',
            value: '',
            is_visible: false,
            is_custom: false,
        },
        tagSearch: '',
	}),

	computed: {
		...mapState({
            services: (state) => state.services.index,
            user_blacklisted_services: (state) => state.user_blacklisted_services.index,
		}),

        blacklisted_services() {
            return this.user_blacklisted_services[this.conversation.member.id] || [];
        },

        tagsData() {
            let tagsData = {
                data: [],
                tags: []
            };
            let allTags = [];

            (this.conversation.messages || []).forEach((message) => {
                if(message.tags.length > 0) {
                    allTags.push({
                        type: 'message',
                        data: message
                    });
                    message.tags.forEach((tag) => {
                        if(tagsData.tags.indexOf(tag) == -1) tagsData.tags.push(tag);
                    });
                }
            });
            (this.conversation.notes || []).forEach((note) => {
                if(note.tags.length > 0) {
                    allTags.push({
                        type: 'note',
                        data: note
                    });
                    note.tags.forEach((tag) => {
                        if(tagsData.tags.indexOf(tag) == -1) tagsData.tags.push(tag);
                    });
                }
            });

            let tagQuery = this.tagSearch.trim().toLowerCase();
            if(tagQuery.length > 0) {
                allTags.forEach((tag) => {
                    if(JSON.stringify(tag.data.tags).toLowerCase().includes(tagQuery)) tagsData.data.push(tag);
                })
            } else {
                tagsData.data = allTags;
            }

            return tagsData;
        }
	},

    watch: {
        '$root.profileTab': function(value) {
            if(value == 'notes' && this.conversation.user_id == this.$root.auth.id) this.getNotes(this.conversation.id);
            this.tagSearch = '';
        },
        'conversation.id': function() {
            if(this.conversation.members.length == 1) {
                this.getUserBlacklistedServices(this.conversation.member.id);
            }
            if(this.conversation.user_id == this.$root.auth.id) this.getNotes(this.conversation.id);
        },
        'customFieldForm.name': function(value) {
            if(value == 'custom' ) {
                this.customFieldForm.name = '';
                this.customFieldForm.is_custom = true;
            }
        }
    },

	created() {
        if(this.conversation.members.length == 1) {
            this.getServices();
            this.getUserBlacklistedServices(this.conversation.member.id);
        }
        if(this.conversation.user_id == this.$root.auth.id) this.getNotes(this.conversation.id);
        this.showUserCustomFields();
	},

	methods: {
		...mapActions({
            getServices: 'services/index',
            getNotes: 'notes/index',
            getUserBlacklistedServices: 'user_blacklisted_services/index',
            storeUserBlacklistedService: 'user_blacklisted_services/store',
            storeNote: 'notes/store',
            updateNote: 'notes/update',
			deleteNote: 'notes/delete',
            updateConversation: 'conversations/update',
            showUserCustomFields: 'user_custom_fields/show',
            storeUserCustomFields: 'user_custom_fields/store',
		}),

        closeInfo() {
            this.$root.detailsTab = '';
        },

        updateCustomField(custom_field) {
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
                this.resetCustomFieldForm();
            }
        },

        resetCustomFieldForm() {
            this.customFieldForm.name = '';
            this.customFieldForm.value = '';
            this.customFieldForm.is_custom = false;
            this.$refs['customFieldsLabel'].click();
        },

        updateNoteTags(note) {
            const newTag = (note.newTag || '').trim();
            if(newTag && !note.tags.find((x) => x == newTag)) note.tags.push(newTag);
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
                notes: this.newNote,
            };
            this.storeNote(note);
            this.newNote = '';
            this.$refs['customFieldsLabel'].click();
        },

        openFile(file) {
            this.$parent.selectedFile = file;
            if(file.type == 'file') this.$parent.downloadMedia(file);
        },

        fileIcon(extension) {
            let iconComponent = 'document-icon';
            let videoExtensions = ['mp4', 'webm'];
            let audioExtensions = ['mp3', 'wav'];
            if (videoExtensions.indexOf(extension) > -1) {
                iconComponent = 'file-video-icon';
            } else if (audioExtensions.indexOf(extension) > -1) {
                iconComponent = 'file-audio-icon';
            } else {
                switch (extension) {
                    case 'pdf':
                        iconComponent = 'file-pdf-icon';
                        break;

                    case 'zip':
                        iconComponent = 'file-archive-icon';
                        break;

                    case 'rar':
                        iconComponent = 'file-archive-icon';
                        break;

                    case 'docx':
                        iconComponent = 'document-icon';
                        break;

                    case 'doc':
                        iconComponent = 'document-icon';
                        break;

                    case 'txt':
                        iconComponent = 'document-icon';
                        break;

                    case 'xls':
                        break;

                    case 'xlsx':
                        break;
                }
            }

            return iconComponent;
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
		},
	},
};
