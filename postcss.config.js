const argv = JSON.parse(process.env.npm_config_argv).original;
let plugins = [require('postcss-import')];

if (argv.indexOf('--widget') > -1) {
	const prefixer = require('postcss-prefixer');
	const safeImportant = require('postcss-safe-important');
	plugins.push(
		prefixer({
			prefix: 'snapturebox-',
			ignore: [/snapturebox-/, /flatpickr-/, /animate/, /^.open/, /arrowTop/, /centerMost/, /vc-/],
		}),
	);
}

module.exports = {
	plugins: plugins,
};
