const mix = require('laravel-mix');
require('laravel-mix-purgecss');
require('laravel-mix-merge-manifest');

console.log('Running vendor css...');
mix
    .sass('resources/sass/bootstrap.scss', 'public/css')
    .mergeManifest();


if(mix.config.production) {
    mix.version();
}