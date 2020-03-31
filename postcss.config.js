const argv = JSON.parse(process.env.npm_config_argv).original;
if (argv.indexOf('--widget') > -1) { 
	const prefixer = require('postcss-prefixer');
	const safeImportant = require('postcss-safe-important');
	module.exports = {
	  	plugins: [
	     	prefixer(
	     		{
	            	prefix: 'snapturebox-',
	        		ignore: [/snapturebox-/, /flatpickr-/, /animate/, /^.open/, /arrowTop/, /centerMost/, /vc-/]
	          	}
	       	)
	  	]
	}
}