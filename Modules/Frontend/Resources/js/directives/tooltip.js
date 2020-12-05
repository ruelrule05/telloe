export default {
	bind(el, binding) {
		el.setAttribute('data-tooltip-wrapper', '');

		let tooltip = document.createElement('div');
		tooltip.classList.add('tooltip');

		let tooltipArrow = document.createElement('div');
		tooltipArrow.classList.add('tooltip-arrow');

		let tooltipInner = document.createElement('div');
		tooltipInner.classList.add('tooltip-inner');

		tooltip.appendChild(tooltipArrow);
		tooltip.appendChild(tooltipInner);
		tooltip.setAttribute('x-placement', Object.keys(binding.modifiers)[0]);
		tooltipInner.innerHTML = binding.value;

		el.style.position = 'relative';
		el.appendChild(tooltip);
	}
};
