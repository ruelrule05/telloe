import HistoryIcon from '../../../icons/history-bold';
import LinkedinIcon from '../../../icons/linkedin';
import GearIcon from '../../../icons/gear';

import VuePaginate from 'vue-paginate';
import Vue from 'vue';
Vue.use(VuePaginate);

export default {
  components: {
    HistoryIcon,
    LinkedinIcon,
    GearIcon
  },
  data: () => ({
    hover: false,
    page: 1,
		paginate: ['linkedin'],
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
    ]
  }),

	created() {
    console.log('this.created')
	},

  methods: {
    truncatedWords(words, maxLen) {
      if (words.length <= maxLen) return words
      return words.substr(0, maxLen) + '...'
    }
  }
}