import MoreHIcon from '../../../../icons/more-h';
export default {
	components: {
		MoreHIcon
	},

	data: () => ({
		invoices: []
	}),
	
	created() {
		this.invoices.push(
			{
				id: '0787436112',
				customer: {full_name: 'John Smith'},
				status: 'Pending'
			},
			{
				id: '0787436111',
				customer: {full_name: 'Karen Upwhill'},
				status: 'Paid'
			},
		);
	},

	mounted() {
		this.$root.contentloading = false;
	},
}