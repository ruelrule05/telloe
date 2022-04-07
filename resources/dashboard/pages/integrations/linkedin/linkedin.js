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
			//{ name: 'connected', abv: 'cnc.', isEnabled: true },
			{ name: 'liked post', abv: 'lps.', isEnabled: true },
			{ name: 'commented on post', abv: 'lcm.', isEnabled: true },
			{ name: 'shared post', abv: 'lcm.', isEnabled: true },
			//{ name: 'mutual connections', abv: 'mcn.', isEnabled: true },
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
			let activities = {};
			this.linkedActivities.forEach(activity => {
				if (!activities[activity.data.author_id]) {
					activities[activity.data.author_id] = [];
				}
				activities[activity.data.author_id].push(activity);
			});
			let sortedActivities = [];
			Object.values(activities).forEach(a => {
				if (a.length) {
					let likedPost = 0;
					let commentPost = 0;
					let sharedPost = 0;
					a.forEach(b => {
						if (b.data.type == 'post_reaction' || b.data.type == 'comment_reaction') {
							likedPost++;
						} else if (b.data.type == 'post_comment') {
							commentPost++;
						} else {
							sharedPost++;
						}
					});
					let lastActivity = a[0];
					lastActivity.likedPost = likedPost;
					lastActivity.commentPost = commentPost;
					lastActivity.sharedPost = sharedPost;
					sortedActivities.push(lastActivity);
				}
			});
			return sortedActivities.sort((a, b) => {
				return a.activity_id > b.activity_id ? -1 : 1;
			});
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

		activityLabel(type) {
			switch (type) {
				case 'post_reaction':
					return 'Reacted on post';

				case 'comment_reaction':
					return 'Reacted on comment';

				case 'post_comment':
					return 'Commented on post';

				case 'shared_post':
					return 'Share a post';
			}
		},

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
			this.$router.push(`/dashboard/integrations/linkedin/${actor.data.author_id}`);
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
