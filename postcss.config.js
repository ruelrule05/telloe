const prefixer = require('postcss-prefixer');
module.exports = {
  	plugins: [
     	prefixer(
     		{
            	prefix: 'snapturebox-',
        		ignore: [/snapturebox-/]
          	}
       	),
  	]
}