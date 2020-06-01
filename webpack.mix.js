const mix = require('laravel-mix');
require('laravel-mix-purgecss');
require('laravel-mix-merge-manifest');
const dayjs =  require('dayjs');
let timestamp = '';
const production = process.env.NODE_ENV == 'production';
const argv = JSON.parse(process.env.npm_config_argv).original;

if (production) {
    console.log('Running in production...');
    //timestamp = `-${dayjs().valueOf()}`;
} else {
    browserSync();
}

if (argv.indexOf('--css') > -1) { 
    console.log('Running css...');
    mix
        .sass('resources/app/auth/auth.scss', 'public/css')
        .sass('resources/app/dashboard/dashboard.scss', 'public/css')
        .sass('resources/sass/page.scss', 'public/css')
        .sass('resources/sass/profile.scss', 'public/css')
        .version()
        .mergeManifest();
}


else if (argv.indexOf('--profile') > -1) { 
    console.log('Running profile...');
    mix
        .js('resources/js/profile.js', 'public/js')
        .webpackConfig({
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
            },
        })
        .version()
        .mergeManifest()
        .browserSync({
            proxy: 'https://telloe.app',
            host: 'telloe.app',
            open: false,
            port: 8000,
            watch: true,
            notify: false,
            https: {
                key: '/Users/cleidoscope/.config/valet/Certificates/telloe.app.key',
                cert: '/Users/cleidoscope/.config/valet/Certificates/telloe.app.crt'
            }
        });
}

else if (argv.indexOf('--page') > -1) { 
    console.log('Running page...');
    mix
        .js('resources/js/page.js', 'public/js')
        .webpackConfig({
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
            },
        })
        .version()
        .mergeManifest()
        .browserSync({
            proxy: 'https://telloe.app',
            host: 'telloe.app',
            open: false,
            port: 8000,
            watch: true,
            notify: false,
            https: {
                key: '/Users/cleidoscope/.config/valet/Certificates/telloe.app.key',
                cert: '/Users/cleidoscope/.config/valet/Certificates/telloe.app.crt'
            }
        });
}

else if (argv.indexOf('--dashboard') > -1) { 
    console.log('Running dashboard...');
    mix
        .js('resources/app/dashboard/dashboard.js', 'public/js')
        .webpackConfig({
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
            },
        })
        .version()
        .mergeManifest();   
}

else if (argv.indexOf('--auth') > -1) { 
    console.log('Running auth...');
    mix
        .js('resources/app/auth/auth.js', 'public/js')
        .webpackConfig({
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
            },
        })
        .version()
        .mergeManifest();
}



else if (argv.indexOf('--widget') > -1) { 
    console.log('Running widget js...');
    mix
        .js('resources/js/widget/widget.js', 'public/js/widget')
        .webpackConfig({
            output: {
                chunkFilename: `js/widget/chunks/[name]${timestamp}.js`
            },
            optimization: {
                splitChunks: {
                    chunks: 'all',
                    cacheGroups: {
                        vendors: false
                    }
                }
            }
        })
        .mergeManifest()
        .browserSync({
            proxy: 'https://telloe.app',
            host: 'telloe.app',
            open: false,
            port: 8001,
            watch: true,
            notify: false,
            https: {
                key: '/Users/cleidoscope/.config/valet/Certificates/telloe.app.key',
                cert: '/Users/cleidoscope/.config/valet/Certificates/telloe.app.crt'
            }
        });
}

else if (argv.indexOf('--admin') > -1) { 
    console.log('Running admin assets...');
    mix
        .sass('resources/sass/admin.scss', 'public/css')
        .js('resources/js/admin.js', 'public/js')
        .version()
        .mergeManifest();
    
    mix.browserSync({
        proxy: 'https://admin.telloe.app',
        host: 'admin.telloe.app',
        open: false,
        port: 8000,
        watch: true,
        notify: false,
        https: {
            key: '/Users/cleidoscope/.config/valet/Certificates/telloe.app.key',
            cert: '/Users/cleidoscope/.config/valet/Certificates/telloe.app.crt'
        }
    });
}



function browserSync(){
    mix.browserSync({
        proxy: 'https://telloe.app',
        host: 'telloe.app',
        open: false,
        port: 8000,
        watch: true,
        notify: false,
        https: {
            key: '/Users/cleidoscope/.config/valet/Certificates/telloe.app.key',
            cert: '/Users/cleidoscope/.config/valet/Certificates/telloe.app.crt'
        }
    });
}
