import {mapState, mapActions} from 'vuex';
import Modal from '../../../components/modal/modal.vue';
import VueFormValidate from '../../../components/vue-form-validate.vue';
import VueCheckbox from '../../../components/vue-checkbox/vue-checkbox.vue';
import VueButton from '../../../components/vue-button.vue';
import ToggleSwitch from '../../../components/toggle-switch/toggle-switch.vue';
import Info from '../conversations/show/info/info.vue';

import MoreIcon from '../../../icons/more';
import PlusIcon from '../../../icons/plus';
import TrashIcon from '../../../icons/trash';
import PencilIcon from '../../../icons/pencil';
import ClockIcon from '../../../icons/clock';
import CheckmarkCircleIcon from '../../../icons/checkmark-circle';
import CloseIcon from '../../../icons/close';
export default {
	components: {
		Modal, 
        VueFormValidate, 
        VueCheckbox,
        VueButton,
		ToggleSwitch,
        Info,

		MoreIcon, 
		PlusIcon,
		TrashIcon,
		PencilIcon,
		ClockIcon,
		CheckmarkCircleIcon,
        CloseIcon,
        gallery: () => import(/* webpackChunkName: "gallery" */ '../../../components/gallery/gallery.vue'),
	},

	data: () => ({
        infoTab: '',
		selectedMember: null,
        manageMember: false,
        manageFields: false,
        addMember: false,
		newMember: {
			custom_fields: {},
            blacklisted_services: [],
            sendToEmail: 1,
		},
		activeTab: 'custom_fields',
        selectedFile: null,
        addField: false,
        newField: '',
        resendLoading: false,
	}),

	computed: {
		...mapState({
            conversations: (state) => state.conversations.index,
            members: (state) => state.members.index,
            ready: (state) => state.members.ready,
            services: (state) => state.services.index,
            user_blacklisted_services: (state) => state.user_blacklisted_services.index,
		}),

        defaultEmailMessage() {
            return `${this.$root.auth.full_name} has invited you in ${APP_NAME}`;
        },

        blacklisted_services() {
            return this.user_blacklisted_services[(this.selectedMember.member_user || {}).id] || [];
        },

        conversation() {
            if(!this.selectedMember) return {};

            let conversation = this.conversations.find(x => 
                x.members.length == 1 && x.member.id == this.selectedMember.member_user.id
            );
            if(!conversation) {
                this.$root.auth.services = this.services;
                conversation = {
                    ready: true,
                    member: this.selectedMember.member_user,
                    members: [this.selectedMember.member_user],
                    user: this.$root.auth,
                    user_id: this.$root.auth.id
                };
            } else {
                if(!this.selectedMember.ready) {
                    this.showConversation({id: conversation.id}).then(() => {
                        conversation.files = null;
                        this.$root.getFiles(conversation);
                    });
                }
            }
            
            conversation.member.member = this.selectedMember;
            this.selectedMember.ready = true;


            return conversation;
        },
	},

    watch: {
        ready: function(value) {
            this.$root.contentloading = !value;
        },
    },

	created() {
        this.$root.contentloading = !this.ready;
        this.getServices();
		this.getMembers();
		this.showUserCustomFields();
        this.$root.socket.on('invite_token', invite_token => {
            if(invite_token) this.getMemberFromInviteToken(invite_token);
        });
    },
    
    mounted() {
        if(this.$root.intros.add_member.enabled) {
            setTimeout(() => {
                if(!document.querySelector('.introjs-overlay')) {
                    this.$root.introJS.start().goToStepNumber(this.$root.intros.add_member.step);
                }
            }, 500);
        }
    },

	methods: {
        ...mapActions({
            getServices: 'services/index',
            getMembers: 'members/index',
            storeMember: 'members/store',
            deleteMember: 'members/delete',
            getMemberFromInviteToken: 'members/get_member_from_invite_token',
            showUserCustomFields: 'user_custom_fields/show',
            storeUserCustomFields: 'user_custom_fields/store',
            showConversation: 'conversations/show',
        }),

        resendEmail(member) {
            this.resendLoading = true;
            axios.post(`/members/${member.id}/resend`).then(() => {
                this.resendLoading = false;
                this.$refs['resendModal'].hide();
                this.$toasted.show('Invitation email has been sent successfully.');
            });
        },

        toggleServiceBlacklist(service) {
            let index = this.newMember.blacklisted_services.findIndex((x) => x == service.id);
            if(index > -1) {
                this.newMember.blacklisted_services.splice(index, 1);
            } else {
                this.newMember.blacklisted_services.push(service.id);
            }
        },

        openFile(file) {
            if (file.type == 'file') this.$root.downloadMedia(file);
            else this.selectedFile = file;
        },

        resetNewMember() {
            this.newMember = {
                custom_fields: {},
                blacklisted_services: []
            };
        },

        addNewField() {
            if(this.newField.trim().length > 0) {
                this.$root.auth.custom_fields.push(this.newField);
                this.newField = '';
                this.addField = false;
            }
            this.storeUserCustomFields();
            this.$toasted.show('Fields saved successfully.');
        },
        
        updateCustomField(index) {
        	this.$root.auth.custom_fields[index] = this.editCustomField;
            this.storeUserCustomFields();
            this.$refs['customFieldsLabel'].click();
        },

		store() {
			if(this.newMember.email) {
				this.storeMember(this.newMember).then(() => {
                    this.newMember = {
                        custom_fields: {},
                        blacklisted_services: [],
                        sendToEmail: 1,
                    };
                });
                this.infoTab = '';
			}
		},
	}
}