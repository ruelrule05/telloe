const host = 'telloe.codes';
const port = 8080;
const key = `/Users/cleidoscope/.config/valet/Certificates/${host}.key`;
const cert = `/Users/cleidoscope/.config/valet/Certificates/${host}.crt`;

const args = process.argv;
const mix = require('laravel-mix');
const ESLintPlugin = require('eslint-webpack-plugin');
//require('laravel-mix-purgecss');
//require('laravel-mix-merge-manifest');
let timestamp = '';

if (mix.inProduction()) {
	timestamp = '-' + new Date().valueOf();
}

mix.setPublicPath('../../public');
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

mix.sass(__dirname + '/Resources/dashboard/dashboard.scss', 'css')
	.sass(__dirname + '/Resources/sass/page.scss', 'css')
	.sass(__dirname + '/Resources/sass/profile.scss', 'css')
	.sass(__dirname + '/Resources/sass/organization.scss', 'css')
	//.sass(__dirname + '/Resources/sass/widget.scss', 'css')
	.sass(__dirname + '/Resources/sass/booking-link.scss', 'css');

mix.js(__dirname + '/Resources/dashboard/dashboard.js', 'js')
	.js(__dirname + '/Resources/js/page.js', 'js')
	.js(__dirname + '/Resources/js/profile.js', 'js')
	//.js(__dirname + '/Resources/widget/index.js', 'js/widget/widget.js')
	//.js(__dirname + '/Resources/js/organization.js', 'js')
	.js(__dirname + '/Resources/js/booking-link.js', 'js');

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
			},
			postCss: [require('autoprefixer')]
		});
	} else if (args.includes('--watch')) {
		mix.webpackConfig({
			watchOptions: {
				aggregateTimeout: 300,
				poll: 1000
			}
		});
	}

	mix.webpackConfig({
		plugins: [new ESLintPlugin()],
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
}
