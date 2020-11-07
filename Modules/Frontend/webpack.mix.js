const mix = require('laravel-mix');
require('laravel-mix-purgecss');
require('laravel-mix-merge-manifest');
const argv = JSON.parse(process.env.npm_config_argv).original;
const fs = require('fs');
//const LiveReloadPlugin = require('webpack-livereload-plugin');

mix.setPublicPath('../../public').mergeManifest();

let timestamp = '';

if (mix.config.production) {
	timestamp = '-' + new Date().valueOf();
}

// CSS
if (argv.indexOf('--css') > -1) {
	console.log('Running css...');
	mix.sass(__dirname + '/Resources/dashboard/dashboard.scss', 'css')
		.sass(__dirname + '/Resources/app/auth/auth.scss', 'css')
		.sass(__dirname + '/Resources/sass/page.scss', 'css')
		.sass(__dirname + '/Resources/sass/profile.scss', 'css')
		.sass(__dirname + '/Resources/sass/organization.scss', 'css')
		.sass(__dirname + '/Resources/sass/widget.scss', 'css')
		.sass(__dirname + '/Resources/sass/call.scss', 'css');
} else {
	if (argv.indexOf('--dashboard') > -1) {
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
	} else if (argv.indexOf('--page') > -1) {
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
	} else if (argv.indexOf('--call') > -1) {
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
	} else if (argv.indexOf('--profile') > -1) {
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
	} else if (argv.indexOf('--widget') > -1) {
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
	} else if (argv.indexOf('--organization') > -1) {
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
	if (mix.config.production) {
		mix.version();
	} else {
		mix.options({
			hmrOptions: {
				host: 'telloe.dev',
				port: 8080
			}
		});
		mix.webpackConfig({
			watchOptions: {
				aggregateTimeout: 300,
				poll: 1000
			}
		});
	}
}
