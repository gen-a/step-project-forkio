'use strict';

const 	gulp  = require('gulp');
const 	$  = require('gulp-load-plugins')();
const 	stream = require('stream-combiner2').obj;

module.exports = function(options){
		return function(){

			return stream(

				gulp.src(options.src, {since:gulp.lastRun('copy-img')}),
				$.newer(options.dest),
				$.imagemin(),
				gulp.dest(options.dest)

			).on('error', $.notify.onError());

	}
}


