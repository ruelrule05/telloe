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
		selectedLabel: '',
		columnList: [
			{ name: 'name', abv: 'nm.', isEnabled: true },
			{ name: 'title', abv: 'ttl.', isEnabled: true },
			{ name: 'my last activity', abv: 'mla.', isEnabled: true },
			// { name: 'date', abv: 'dte.', isEnabled: true },
			{ name: 'connected', abv: 'cnc.', isEnabled: true },
			{ name: 'liked post', abv: 'lps.', isEnabled: true },
			{ name: 'commented on post', abv: 'lcm.', isEnabled: true },
			{ name: 'shared post', abv: 'lcm.', isEnabled: true },
			{ name: 'mutual connections', abv: 'mcn.', isEnabled: true },
			{ name: 'linked profile', abv: 'lip.', isEnabled: true },
			{ name: 'recent activity', abv: 'rac.', isEnabled: true }
		],
		labelList: [
			{
				bgColor: '#ECECF0',
				textColor: '#333333',
				label: 'NO LABEL'
			},
			{
				bgColor: '#27D898',
				textColor: '#ffffff',
				label: 'CUSTOMER'
			},
			{
				bgColor: '#E33171',
				textColor: '#ffffff',
				label: 'HOT LEAD'
			},
			{
				bgColor: '#FEA446',
				textColor: '#333333',
				label: 'WARM LEAD'
			},
			{
				bgColor: '#3167E3',
				textColor: '#ffffff',
				label: 'COLD LEAD'
			},
			{
				bgColor: '#E33171',
				textColor: '#ffffff',
				label: 'BLACK'
			}
		],

		customBackgroundColor: '#F77F00',
		customLabel: '',

		activities: []
	}),

	computed: {
		...mapState({
			ready: state => state.linkedin_activities.ready,
			linkedActivities: state => state.linkedin_activities.index
		})
	},

	created() {
		this.getLinkedinActivities().then(() => {
			let activities = [];
			this.linkedActivities.forEach(activity => {
				if (activity.data.actor && (activity.data.resharedUpdate || activity.data.header)) {
					let actor = activity.data.actor;
					let likedPost = 0;
					let commentPost = 0;
					let sharedPost = 0;
					let action = 'Shared post';
					let recentActivityURL = activity.data.actor.navigationContext.actionTarget;
					let name = activity.data.actor.name.text;
					if (activity.data.resharedUpdate) {
						name = activity.data.resharedUpdate.actor.name.text;
						recentActivityURL = activity.data.resharedUpdate.actor.navigationContext.actionTarget;
						sharedPost = 1;
						actor = activity.data.resharedUpdate.actor;
					}
					if (activity.data.header) {
						action = activity.data.header.text.text;
						if (action.includes('commented')) {
							commentPost = 1;
						} else {
							likedPost = 1;
						}
					}

					let vanityName = null;
					if (actor.name.attributes[0].miniProfile) {
						vanityName = actor.name.attributes[0].miniProfile.publicIdentifier;
					} else if (actor.name.attributes[0].miniCompany) {
						vanityName = actor.name.attributes[0].miniCompany.universalName;
					}
					recentActivityURL = new URL(recentActivityURL);
					let linkedinProfile = recentActivityURL.origin + recentActivityURL.pathname;
					recentActivityURL = recentActivityURL.origin + recentActivityURL.pathname + '/recent-activity/';
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
						linkedinProfile: linkedinProfile
					});
				}
			});
			this.activities = activities;
		});
	},

	watch: {
		show: function (value) {
			this.open = value;
			this.menuOpen = value;
		},

		searchInList: function (value) {
			console.log('searchInList: ', value);
		}
	},

	methods: {
		...mapActions({
			getLinkedinActivities: 'linkedin_activities/index'
		}),

		getLabelStyles(label, style) {
			return this.labelList.map(list => {
				if (list.label.toLowerCase() === label.toLowerCase()) {
					if (style === 'text') return list.textColor;
					if (style === 'bg') return list.bgColor;
				}
			});
		},

		handleLabelSectionByLabel(label, id) {
			this.selectedLabel = {
				label,
				id
			};
			this.$refs.labelSettingModal.show();
		},

		handleSelectedLabelFromModal(label, id) {
			let item = this.linkedinList.find(linkedin => linkedin.id === id);
			item.label = label.label;
			this.selectedLabel = {
				label: label.label,
				id
			};
		},

		handleAddLabel() {
			this.labelList.push({
				bgColor: this.customBackgroundColor,
				textColor: this.handleGetTextColor(this.customBackgroundColor),
				label: this.customLabel
			});
			this.customBackgroundColor = '#F77F00';
			this.customLabel = '';
		},

		handleGetTextColor(hex) {
			const hexCode = hex.charAt(0) === '#' ? hex.substr(1, 6) : hex;
			const hexTotal = parseInt(hexCode.substr(0, 2), 16) + parseInt(hexCode.substr(2, 2), 16) + parseInt(hexCode.substr(4, 2), 16);
			const contrastRatio = hexTotal / (255 * 3);

			return contrastRatio >= 0.5 ? '#333333' : '#ffffff';
		},

		onBlur() {
			if (!this.menuOpen) {
				this.show = false;
			}
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
