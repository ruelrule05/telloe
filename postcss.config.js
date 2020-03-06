const prefixer = require('postcss-prefixer');
const safeImportant = require('postcss-safe-important');
module.exports = {
  	plugins: [
     	prefixer(
     		{
            	prefix: 'snapturebox-',
        		ignore: [/snapturebox-/, /flatpickr-/, /animate/, /^.open/, /arrowTop/, /centerMost/]
          	}
       	)
  	]
}