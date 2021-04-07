/* eslint-disable */
import { default as format } from './format.js';

export default {
	format() {
		return format;
	},

	bind(el, binding, vnode) {
		// see if el is an input
		if (el.nodeName.toLowerCase() !== 'input') {
			el = el.querySelector('input');
		}
		// call format function from prop
		let method = Object.keys(format).find(key => key.toLowerCase() === binding.arg.toLowerCase());
		format[method](el, vnode);
		// update cardBrand value if available
		if (method == 'formatCardNumber' && typeof vnode.context.cardBrand !== 'undefined') {
			el.addEventListener('keyup', () => {
				if (el.dataset.cardBrand) {
					vnode.context.cardBrand = el.dataset.cardBrand;
				}
			});
		}
	}
};
