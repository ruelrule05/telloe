const mix = require('laravel-mix');
require('laravel-mix-purgecss');
require('laravel-mix-merge-manifest');
const argv = JSON.parse(process.env.npm_config_argv).original;

mix.setPublicPath('../../public').mergeManifest();

mix
	.sass(__dirname + '/Resources/sass/admin.scss', 'css')
    .js(__dirname + '/Resources/js/admin.js', 'js')
    .webpackConfig({
        output: {
            chunkFilename: `js/chunks/[name].js`
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    vendors: false
                }
            }
        },
    }); 



if(mix.config.production) {
    console.log('Running in production...');
    mix.version();
}
browserSync();
function browserSync(){
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

