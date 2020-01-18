const mix = require('laravel-mix');
require('laravel-mix-purgecss');
require('laravel-mix-merge-manifest');
const dayjs =  require('dayjs');
let timestamp = '';
const production = process.env.NODE_ENV == 'production';
const argv = JSON.parse(process.env.npm_config_argv).original;

if (production) {
    console.log('Running in production...');
    timestamp = `-${dayjs().valueOf()}`;
}

if (argv.indexOf('--css') > -1) { 
    console.log('Running css...');
    mix
        .sass('resources/sass/bootstrap.scss', 'public/css')
        .sass('resources/sass/app.scss', 'public/css')
        .version()
        .mergeManifest();
}

else if (argv.indexOf('--js') > -1) { 
    console.log('Running js...');
    mix
        .js('resources/js/app.js', 'public/js')
        .js('resources/js/auth.js', 'public/js')
        .js('resources/js/dashboard.js', 'public/js')
        .webpackConfig({
            /*node: {
              fs: 'empty'
            },*/
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
            resolve: {
                alias: {
                }
            },
            externals: {
                moment: 'moment'
            }
        })
        .version()
        .mergeManifest();

    mix.browserSync({
        proxy: 'https://boxbi.app',
        host: 'boxbi.app',
        open: false,
        port: 8000,
        watch: true,
        notify: false,
        https: {
            key: '/Users/cleidoscope/.config/valet/Certificates/boxbi.app.key',
            cert: '/Users/cleidoscope/.config/valet/Certificates/boxbi.app.crt'
        }
    });
}



else if (argv.indexOf('--slek') > -1) { 
    console.log('Running slek assets...');
    mix
        .sass('resources/sass/slek.scss', 'public/css')
        .js('resources/js/slek.js', 'public/js')
        .version()
        .mergeManifest();
    
    mix.browserSync({
        proxy: 'https://boxbi.app',
        host: 'boxbi.app',
        open: false,
        port: 8000,
        watch: true,
        notify: false,
        https: {
            key: '/Users/cleidoscope/.config/valet/Certificates/boxbi.app.key',
            cert: '/Users/cleidoscope/.config/valet/Certificates/boxbi.app.crt'
        }
    });
}

else if (argv.indexOf('--widget') > -1) { 
    console.log('Running widget js...');
    mix
        .js('resources/js/widget/widget.js', 'public/js')
        .version()
        .mergeManifest();
    
    mix.browserSync({
        proxy: 'https://boxbi.app',
        host: 'boxbi.app',
        open: false,
        port: 8000,
        watch: true,
        notify: false,
        https: {
            key: '/Users/cleidoscope/.config/valet/Certificates/boxbi.app.key',
            cert: '/Users/cleidoscope/.config/valet/Certificates/boxbi.app.crt'
        }
    });
}


