export default {
	bind(el, binding, vnode) {
		let tooltip = document.createElement('div');
		tooltip.classList.add('snapturebox-tooltip');
		tooltip.style.display = 'none';

		let tooltipArrow = document.createElement('div');
		tooltipArrow.classList.add('snapturebox-tooltip-arrow');

		let tooltipInner = document.createElement('div');
		tooltipInner.classList.add('snapturebox-tooltip-inner');


		tooltip.appendChild(tooltipArrow);
		tooltip.appendChild(tooltipInner);
		tooltip.setAttribute('x-placement', Object.keys(binding.modifiers)[0]);
		let textNode = document.createTextNode(binding.value.content);
		tooltipInner.appendChild(textNode);

		el.style.position = 'relative';
		el.appendChild(tooltip);
	},

	update(el, binding) {
		let tooltip = el.querySelector('.snapturebox-tooltip');
		if (binding.value.show) tooltip.style.display = 'block';
		else tooltip.style.display = 'none';
	},
};
