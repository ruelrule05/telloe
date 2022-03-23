import HistoryIcon from '../../../../icons/history-bold';
import LinkedinIcon from '../../../../icons/linkedin';
import GearIcon from '../../../../icons/gear';
import CheckSolidIcon from '../../../../icons/check-solid';
import PlusSolidIcon from '../../../../icons/plus-solid';
import ChevronDownIcon from '../../../../icons/chevron-down';
import SearchIcon from '../../../../icons/search';
import ExpandIcon from '../../../../icons/expand-solid';
import CompressIcon from '../../../../icons/compress-solid';

import Modal from '../../../../components/modal/modal.vue';

import ClickOutside from 'vue-click-outside';
import VuePaginate from 'vue-paginate';
import Vue from 'vue';
Vue.use(VuePaginate);

import Swatches from 'vue-swatches';
import 'vue-swatches/dist/vue-swatches.css';
import VueDropdown from '../../../../components/vue-dropdown/vue-dropdown.vue';
import VueSelect from '../../../../components/vue-select/vue-select.vue';
import { mapState, mapActions } from 'vuex';
import axios from 'axios';
import numbersOnly from 'numbers-only';

export default {
	components: {
		HistoryIcon,
		LinkedinIcon,
		GearIcon,
		CheckSolidIcon,
		PlusSolidIcon,
		ChevronDownIcon,
		SearchIcon,
		ExpandIcon,
		CompressIcon,

		Modal,
		Swatches,
		VueDropdown,
		VueSelect
	},
	directives: {
		ClickOutside
	},
	data: () => ({
		// custom dropdown
		numbersOnly: numbersOnly,
		filterShow: false,
		show: false,
		open: false,
		menuOpen: false,
		isShrink: false,
		miniColumns: ['dte.', 'cnc.', '1ac.', 'cnd.'],
		medColumns: ['fst.', 'lst.', 'lbl.'],
		longColumns: ['mla.', 'ttl.'],

		searchInList: '',
		hover: false,
		page: 1,
		paginate: ['linkedin'],
		selectedActivity: '',
		columnList: [
			{ name: 'name', abv: 'nm.', isEnabled: true },
			{ name: 'my last activity', abv: 'mla.', isEnabled: true },
			{ name: 'label', abv: 'mla.', isEnabled: true },
			// { name: 'date', abv: 'dte.', isEnabled: true },
			{ name: 'connected', abv: 'cnc.', isEnabled: true },
			{ name: 'liked post', abv: 'lps.', isEnabled: true },
			{ name: 'commented on post', abv: 'lcm.', isEnabled: true },
			{ name: 'shared post', abv: 'lcm.', isEnabled: true },
			{ name: 'mutual connections', abv: 'mcn.', isEnabled: true },
			{ name: 'linked profile', abv: 'lip.', isEnabled: true },
			{ name: 'recent activity', abv: 'rac.', isEnabled: true }
		],

		customBackgroundColor: '#F77F00',
		customLabel: '',
		labels: [],
		filters: {
			liked: null,
			commented: null,
			shared: null
		}
	}),

	computed: {
		...mapState({
			ready: state => state.linkedin_activities.ready,
			linkedActivities: state => state.linkedin_activities.index,
			contacts: state => state.contacts.index
		}),

		activities: function () {
			let activities = [];
			this.linkedActivities.forEach(activity => {
				if (activity.data.actor && (activity.data.resharedUpdate || activity.data.header)) {
					let actor = activity.data.actor;
					let likedPost = 0;
					let commentPost = 0;
					let sharedPost = 0;
					let action = 'Shared a post';
					let recentActivityURL = activity.data.actor.navigationContext.actionTarget;
					let name = activity.data.actor.name.text;
					if (activity.data.resharedUpdate) {
						name = activity.data.resharedUpdate.actor.name.text;
						recentActivityURL = activity.data.resharedUpdate.actor.navigationContext.actionTarget;
						sharedPost = 1;
						actor = activity.data.resharedUpdate.actor;
					}
					if (activity.data.header) {
						sharedPost = 0;
						action = activity.data.header.text.text;
						if (action.includes('commented')) {
							commentPost = 1;
						} else {
							likedPost = 1;
						}
					}
					if (actor.name.attributes.length > 0) {
						let vanityName = null;
						if (actor.name.attributes[0].miniProfile) {
							vanityName = actor.name.attributes[0].miniProfile.publicIdentifier;
						} else if (actor.name.attributes[0].miniCompany) {
							vanityName = actor.name.attributes[0].miniCompany.universalName;
						}
						recentActivityURL = new URL(recentActivityURL);
						let linkedinProfile = recentActivityURL.origin + recentActivityURL.pathname;
						recentActivityURL = recentActivityURL.origin + recentActivityURL.pathname + '/recent-activity/';

						if (action.includes('commented')) {
							action = 'Commented on a post';
						} else if (action.includes('loves')) {
							action = 'Loves a post';
						} else if (action.includes('likes')) {
							action = 'Liked a post';
						}
						likedPost += this.linkedActivities.filter(x => x.id != activity.id && x.data.actor && ((x.data.resharedUpdate && x.data.resharedUpdate.actor.urn == actor.urn) || (!x.data.resharedUpdate && x.data.actor.urn == actor.urn)) && x.data.header && (x.data.header.text.text.includes('likes') || x.data.header.text.text.includes('loves'))).length;

						commentPost += this.linkedActivities.filter(x => x.id != activity.id && x.data.actor && ((x.data.resharedUpdate && x.data.resharedUpdate.actor.urn == actor.urn) || (!x.data.resharedUpdate && x.data.actor.urn == actor.urn)) && x.data.header && x.data.header.text.text.includes('commented')).length;

						sharedPost += this.linkedActivities.filter(x => x.id != activity.id && x.data.actor && ((x.data.resharedUpdate && x.data.resharedUpdate.actor.urn == actor.urn) || (!x.data.resharedUpdate && x.data.actor.urn == actor.urn)) && !x.data.header).length;
						let label = null;
						let contact = this.getContact(actor.urn);
						if (contact && contact.label) {
							label = contact.label;
						}
						activities.push({
							id: activity.id,
							name: name,
							vanityName: vanityName,
							title: activity.data.actor.description.text,
							lastActivity: action,
							recentActivityURL: recentActivityURL,
							likedPost: likedPost,
							commentPost: commentPost,
							sharedPost: sharedPost,
							mutualConnections: 0,
							linkedinProfile: linkedinProfile,
							actor: actor,
							label: label,
							temp_label: label
						});
					}
				}
			});
			return activities;
		}
	},

	created() {
		this.getLinkedinActivities();
		this.getContacts({ nopaginate: true });
		this.getContactLabels();
	},

	watch: {
		show: function (value) {
			this.open = value;
			this.menuOpen = value;
		}
	},

	methods: {
		...mapActions({
			getLinkedinActivities: 'linkedin_activities/index',
			getContacts: 'contacts/index',
			updateContact: 'contacts/update'
		}),

		inQuery(activity) {
			let inSearch = true;
			let inFilter = true;
			if (this.searchInList.trim().length) {
				inSearch = activity.name.toLowerCase().includes(this.searchInList.toLowerCase().trim()) || activity.title.toLowerCase().includes(this.searchInList.toLowerCase().trim());
			}
			if (this.filters.liked && this.filters.liked != activity.likedPost) {
				inFilter = false;
			}
			if (this.filters.commented && this.filters.commented != activity.commentPost) {
				inFilter = false;
			}
			if (this.filters.shared && this.filters.shared != activity.sharedPost) {
				inFilter = false;
			}
			return inSearch && inFilter;
		},

		getContact(urn) {
			return this.contacts.find(x => x.linkedin_urn == urn);
		},

		async getContactLabels() {
			let response = await axios.get('/contact_labels');
			if (response) {
				this.labels = response.data;
			}
		},

		async goToContact(actor) {
			let response = await axios.get(`/contacts/get_by_urn/${actor.urn}`, { toast: true });
			if (response) {
				this.$router.push(`/dashboard/contacts/${response.data.id}`);
			}
		},

		getLabelStyles(label, style) {
			return this.labelList.map(list => {
				if (list.label.toLowerCase() === label.toLowerCase()) {
					if (style === 'text') return list.textColor;
					if (style === 'bg') return list.bgColor;
				}
			});
		},

		handleLabelSectionByLabel(activity) {
			activity.temp_label = activity.label;
			this.selectedActivity = activity;
			this.$refs.labelSettingModal.show();
		},

		setContactLabel(label) {
			let contact = this.getContact(this.selectedActivity.actor.urn);
			if (contact) {
				this.selectedActivity.temp_label = label;
			}
		},

		updateContactLabel() {
			let contact = this.getContact(this.selectedActivity.actor.urn);
			if (contact) {
				contact.label = this.selectedActivity.temp_label;
				this.updateContact(contact);
			}
			this.$refs.labelSettingModal.hide();
		},

		async handleAddLabel() {
			if (this.customLabel.trim().length) {
				let response = await axios.post('/contact_labels', {
					color: this.customBackgroundColor,
					label: this.customLabel,
					text_color: this.handleGetTextColor(this.customBackgroundColor)
				});
				if (response) {
					this.labels.push(response.data);
				}
				this.customBackgroundColor = '#F77F00';
				this.customLabel = '';
			}
		},

		handleGetTextColor(hex) {
			const hexCode = hex.charAt(0) === '#' ? hex.substr(1, 6) : hex;
			const hexTotal = parseInt(hexCode.substr(0, 2), 16) + parseInt(hexCode.substr(2, 2), 16) + parseInt(hexCode.substr(4, 2), 16);
			const contrastRatio = hexTotal / (255 * 3);

			return contrastRatio >= 0.5 ? '#333333' : '#ffffff';
		},

		handleIsEnabledColumn(name, state) {
			let column = this.columnList.find(column => column.name === name);
			column.isEnabled = !state;
		},

		handleDisplayEnabledColumns() {
			return this.columnList.map(column => {
				if (column.isEnabled) return column.name;
				if (!column.isEnabled) return '';
			});
		}
	}
};
