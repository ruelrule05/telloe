import HistoryIcon from '../../../icons/history-bold';
import LinkedinIcon from '../../../icons/linkedin';
import GearIcon from '../../../icons/gear';
import CheckSolidIcon from '../../../icons/check-solid';
import PlusSolidIcon from '../../../icons/plus-solid';

import Modal from '../../../components/modal/modal.vue';

import VuePaginate from 'vue-paginate';
import Vue from 'vue';
Vue.use(VuePaginate);

export default {
  components: {
    HistoryIcon,
    LinkedinIcon,
    GearIcon,
    CheckSolidIcon,
    PlusSolidIcon,

    Modal,
  },
  data: () => ({
    hover: false,
    page: 1,
		paginate: ['linkedin'],
    selectedLabel: '',
    linkedinList: [
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
        dateConnected: '26-Jan-22',
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
        dateConnected: '26-Jan-22',
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
        dateConnected: '26-Jan-22',
        likedPost: 1,
        commentOnPost: 0,
        likedComment: 0,
        commentPostLiked: 0,
        mutualConnections: 85,
        linkedinProfile: 'https://www.linkedin.com/in/annabel-arnaud-46939246/',
        recentActivity: 'https://www.linkedin.com/in/rebekah-duca-a233bb61/detail/recent-activity/',
        settings: ''
      }
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
  }),

	created() {},

  methods: {
    truncatedWords(words, maxLen) {
      if (words.length <= maxLen) return words
      return words.substr(0, maxLen) + '...'
    },

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
      console.log('clicked')
    }
  }
}