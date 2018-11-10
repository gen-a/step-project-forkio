'use strict';

const 	gulp  = require('gulp');
const 	$  = require('gulp-load-plugins')();
const 	stream = require('stream-combiner2').obj;

const isDevelopment = ! process.env.NODE_ENV || process.env.NODE_ENV == 'development';

module.exports = function(options){

		return function(){
			
			let autoprefixBrowsers = ['> 1%', 'last 15 versions', 'IE 8', 'IE 9', 'IE 10', 'IE 11'];
			
			return stream(
				gulp.src(options.src),
				$.if(isDevelopment, $.sourcemaps.init()),
				//$.cached(options.cacheName),
				$.sass(),
				$.autoprefixer({ browsers: autoprefixBrowsers }),
				//$.remember(options.cacheName),
				$.base64({
		            baseDir: options.baseDir,
		            extensions: [/--base64\.(jpg|jpeg|gif|svg|png)$/i],
		            //exclude:    [/\.server\.(com|net)\/dynamic\//, '--live.jpg'],
		            //maxImageSize: 8*1024, // bytes
		            debug: true
		        }),
				$.concat(options.fileName),
                $.groupCssMediaQueries(),
				$.uglifycss({
					maxLineLen : 80,
					uglifyComments:true
				}),
				$.if(isDevelopment, $.sourcemaps.write('.')),
				gulp.dest(options.dest)
			).on('error', $.notify.onError());
		}
}



				

