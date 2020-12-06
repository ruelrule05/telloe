/* global APP_URL */
export default {
	data: () => ({
		script: ''
	}),

	created() {
		this.script = `<script src="${APP_URL}/js/widget.js?p=${this.$root.auth.username}"></script>`;
		this.$root.contentloading = false;
	},

	methods: {
		copyToClipboard() {
			this.$toasted.show('Copied to clipboard');
			let element = this.$refs['script'];
			let $temp = $('<input>');
			$('body').append($temp);
			$temp.val($(element).text()).select();
			document.execCommand('copy');
			$temp.remove();
			this.selectElementText(element);
		},

		selectElementText(el) {
			let win = window;
			var doc = win.document,
				sel,
				range;
			if (win.getSelection && doc.createRange) {
				sel = win.getSelection();
				range = doc.createRange();
				range.selectNodeContents(el);
				sel.removeAllRanges();
				sel.addRange(range);
			} else if (doc.body.createTextRange) {
				range = doc.body.createTextRange();
				range.moveToElementText(el);
				range.select();
			}
		}
	}
};
