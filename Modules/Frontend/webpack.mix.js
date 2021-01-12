const mix = require('laravel-mix');
const ESLintPlugin = require('eslint-webpack-plugin');
require('laravel-mix-purgecss');
require('laravel-mix-merge-manifest');

const target = process.env.npm_config_target;

mix.setPublicPath('../../public').mergeManifest();

let timestamp = '';

if (mix.config.production) {
	timestamp = '-' + new Date().valueOf();
}

// CSS
if (target == 'css') {
	console.log('Running css...');
	mix.sass(__dirname + '/Resources/dashboard/dashboard.scss', 'css')
		.sass(__dirname + '/Resources/app/auth/auth.scss', 'css')
		.sass(__dirname + '/Resources/sass/page.scss', 'css')
		.sass(__dirname + '/Resources/sass/profile.scss', 'css')
		.sass(__dirname + '/Resources/sass/organization.scss', 'css')
		.sass(__dirname + '/Resources/sass/widget.scss', 'css')
		.sass(__dirname + '/Resources/sass/call.scss', 'css');
} else {
	if (target == 'dashboard') {
		console.log('Running dashboard...');
		mix.js(__dirname + '/Resources/dashboard/dashboard.js', 'js').webpackConfig({
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
	} else if (target == 'page') {
		console.log('Running page...');
		mix.js(__dirname + '/Resources/js/page.js', 'js').webpackConfig({
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
	} else if (target == 'call') {
		console.log('Running call...');
		mix.js(__dirname + '/Resources/js/call.js', 'js').webpackConfig({
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
	} else if (target == 'profile') {
		console.log('Running profile...');
		mix.js(__dirname + '/Resources/js/profile.js', 'js').webpackConfig({
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
	} else if (target == 'widget') {
		console.log('Running widget...');
		mix.js(__dirname + '/Resources/widget/index.js', 'js/widget/widget.js').webpackConfig({
			/*output: {
                    chunkFilename: `js/chunks/[name].js`
                },*/
			optimization: {
				splitChunks: {
					chunks: 'all',
					cacheGroups: {
						vendors: false
					}
				}
			}
		});
	} else if (target == 'organization') {
		console.log('Running organization...');
		mix.js(__dirname + '/Resources/js/organization.js', 'js').webpackConfig({
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
	}
}

if (mix.config.production) {
	mix.version();
} else {
	mix.options({
		hmrOptions: {
			host: 'telloe.test',
			port: 8080
		},
		postCss: [require('autoprefixer')]
	});
	mix.webpackConfig({
		watchOptions: {
			aggregateTimeout: 300,
			poll: 1000
		},
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
