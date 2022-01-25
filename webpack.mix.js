const host = 'telloe.codes';
const port = 8080;
const key = `/Users/cleidoscope/.config/valet/Certificates/${host}.key`;
const cert = `/Users/cleidoscope/.config/valet/Certificates/${host}.crt`;

const args = process.argv;
const mix = require('laravel-mix');
const ESLintPlugin = require('eslint-webpack-plugin');
const IgnoreVuetifyStylesPlugin = require('./resources/js/plugins/ignoreVuetifyResetCSS');
//require('laravel-mix-purgecss');
//require('laravel-mix-merge-manifest');
let timestamp = '';
// const Webpack = require('webpack');

if (mix.inProduction()) {
	timestamp = '-' + new Date().valueOf();
}

mix.vue({ version: 2 });
mix.webpackConfig({
	output: {
		chunkFilename: `js/chunks/[name]${timestamp}.js`
	},
	optimization: {
		splitChunks: {
			chunks: 'all',
			cacheGroups: {
				vendors: false
			}
		}
	}
});

mix.sass('resources/sass/tailwind.scss', 'css/vendor.css')
	.sass('resources/sass/page.scss', 'css')
	.sass('resources/dashboard/dashboard.scss', 'css')
	.sass('resources/sass/profile.scss', 'css')
	.sass('resources/sass/organization.scss', 'css')
	//.sass('resources/sass/widget.scss', 'css')
	.sass('resources/sass/booking-link.scss', 'css');
//);

mix.js('resources/js/page.js', 'js').js('resources/dashboard/dashboard.js', 'js').js('resources/js/profile.js', 'js').js('resources/widget/index.js', 'js/widget/widget.js').js('resources/js/organization.js', 'js').js('resources/js/booking-link.js', 'js').js('resources/js/booking.js', 'js').js('resources/js/conversation.js', 'js').js('resources/js/account-setup.js', 'js').js('resources/js/video-message.js', 'js');

mix.options({
	postCss: [require('tailwindcss')]
});

if (mix.inProduction()) {
	mix.version();
} else {
	if (args.includes('--hot')) {
		mix.webpackConfig({
			output: {
				publicPath: `https://${host}:${port}/`
			},
			devServer: {
				http2: true,
				https: {
					key: key,
					cert: cert
				}
			}
		});
		mix.options({
			hmrOptions: {
				host: host,
				port: port
			}
		});
	} else if (args.includes('--watch')) {
		mix.webpackConfig({
			watchOptions: {
				aggregateTimeout: 300,
				poll: 1000
			}
		});
	}
}

mix.js('resources/js/form-builder.js', 'public/js');
mix.autoload({
	jquery: ['$', 'window.jQuery', 'jQuery']
});

mix.scripts(['node_modules/formBuilder/dist/form-builder.min.js', 'node_modules/formBuilder/dist/form-render.min.js'], 'public/js/formbuilder.js');

mix.webpackConfig({
	plugins: [new ESLintPlugin(), new IgnoreVuetifyStylesPlugin()],
	module: {
		rules: [
			{
				enforce: 'pre',
				exclude: /node_modules/,
				loader: 'eslint-loader',
				test: /\.(js|vue)?$/
			}
		]
	}
});
