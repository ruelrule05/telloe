import HistoryIcon from '../../../icons/history-bold';
import LinkedinIcon from '../../../icons/linkedin';
import GearIcon from '../../../icons/gear';
import CheckSolidIcon from '../../../icons/check-solid';
import PlusSolidIcon from '../../../icons/plus-solid';
import ChevronDownIcon from '../../../icons/chevron-down';
import SearchIcon from '../../../icons/search';

import Modal from '../../../components/modal/modal.vue';

import ClickOutside from 'vue-click-outside';
import VuePaginate from 'vue-paginate';
import Vue from 'vue';
Vue.use(VuePaginate);

import Swatches from 'vue-swatches';
import 'vue-swatches/dist/vue-swatches.css'
import VueDropdown from '../../../components/vue-dropdown/vue-dropdown.vue';
import VueSelect from '../../../components/vue-select/vue-select.vue';

export default {
  components: {
    HistoryIcon,
    LinkedinIcon,
    GearIcon,
    CheckSolidIcon,
    PlusSolidIcon,
    ChevronDownIcon,
    SearchIcon,

    Modal,
    Swatches,
    VueDropdown,
    VueSelect,
  },
  directives: {
    ClickOutside
  },
  data: () => ({
    // custom dropdown
		show: false,
		open: false,
    menuOpen: false,

    searchInList: '',
    hover: false,
    page: 1,
		paginate: ['linkedin'],
    selectedLabel: '',
    columnList: [
      { name: 'first', isEnabled: false },
      { name: 'last', isEnabled: true },
      { name: 'title', isEnabled: true },
      { name: 'label', isEnabled: true },
      { name: 'my last activity', isEnabled: true },
      { name: 'date', isEnabled: true },
      { name: 'connected', isEnabled: true },
      { name: '1st Activity', isEnabled: true },
      { name: 'connected date', isEnabled: true },
      { name: 'liked post', isEnabled: true },
      { name: 'comment on post', isEnabled: true },
      { name: 'liked comment', isEnabled: true },
      { name: 'comment post liked', isEnabled: true },
      { name: 'mutual connections', isEnabled: true },
      { name: 'linked profile', isEnabled: true },
      { name: 'recent activity', isEnabled: true }
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
      },
    ],
    
    customBackgroundColor: '#F77F00',
    customLabel: '',


    dummyLinkedinList: [
      {
        id: 0,
        first: 'Annabel',
        last: 'Arnaud',
        title: 'Affiliate Coordinator at ComeOn! Group',
        label: 'CUSTOMER',
        lastActivity: 'Liked their Post',
        date: '26-Jan-22',
        isConnected: 'Yes',
        firstActivity: '26-Jan-22',
        connectedDate: '26-Jan-22',
        likedPost: 1,
        commentOnPost: 0,
        likedComment: 0,
        commentPostLiked: 0,
        mutualConnections: 85,
        linkedinProfile: 'https://www.linkedin.com/in/annabel-arnaud-46939246/',
        recentActivity: 'https://www.linkedin.com/in/rebekah-duca-a233bb61/detail/recent-activity/',
        settings: ''
      },
      {
        id: 1,
        first: 'Henk',
        last: 'Worlff',
        title: 'Coordinator Affiliate at ComeOn! Group',
        label: 'CUSTOMER',
        lastActivity: 'Liked their Post',
        date: '26-Jan-22',
        isConnected: 'Yes',
        firstActivity: '26-Jan-22',
        connectedDate: '26-Jan-22',
        likedPost: 1,
        commentOnPost: 0,
        likedComment: 0,
        commentPostLiked: 0,
        mutualConnections: 85,
        linkedinProfile: 'https://www.linkedin.com/in/annabel-arnaud-46939246/',
        recentActivity: 'https://www.linkedin.com/in/rebekah-duca-a233bb61/detail/recent-activity/',
        settings: ''
      },
      {
        id: 2,
        first: 'Keith',
        last: 'Hathaway',
        title: 'Founder and CEO of ComeOn! Group',
        label: 'WARM LEAD',
        lastActivity: 'We Connected',
        date: '26-Jan-22',
        isConnected: 'Yes',
        firstActivity: '26-Jan-22',
        connectedDate: '26-Jan-22',
        likedPost: 1,
        commentOnPost: 0,
        likedComment: 0,
        commentPostLiked: 0,
        mutualConnections: 85,
        linkedinProfile: 'https://www.linkedin.com/in/annabel-arnaud-46939246/',
        recentActivity: 'https://www.linkedin.com/in/rebekah-duca-a233bb61/detail/recent-activity/',
        settings: ''
      }
    ]
  }),

  watch: {
		show: function (value) {
			this.open = value;
      this.menuOpen = value;
		},

    searchInList: function (value) {
      console.log('searchInList: ', value)
    }
	},

  methods: {
    getLabelStyles(label, style) {
      return this.labelList.map((list) => {
        if (list.label.toLowerCase() === label.toLowerCase()) {
          if (style === 'text') return list.textColor
          if (style === 'bg') return list.bgColor
        }
      })
    },

    handleLabelSectionByLabel(label, id) {
      this.selectedLabel = {
        label,
        id
      }
      this.$refs.labelSettingModal.show()
    },

    handleSelectedLabelFromModal(label, id) {
      let item = this.linkedinList.find(linkedin => linkedin.id === id)
      item.label = label.label
      this.selectedLabel = {
        label: label.label,
        id
      }
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
      const contrastRatio = (hexTotal) / (255 * 3);

      return contrastRatio >= 0.5 ? '#333333' : '#ffffff';
    },


		onBlur() {
      if (!this.menuOpen) {
        this.show = false;
      }
		},

    handleIsEnabledColumn(name, state) {
      let column = this.columnList.find(column => column.name === name)
      column.isEnabled = !state;
    },

    handleDisplayEnabledColumns() {
      return this.columnList.map(column => {
        if (column.isEnabled) return column.name;
        if (!column.isEnabled) return '';
      })
    }
  }
}