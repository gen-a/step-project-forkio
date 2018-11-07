'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync').create();


module.exports = function(options){

		return function(){

			let o = {notify:false};

			if(options.proxy){
				o.proxy = options.proxy;
			}else{
				o.server = {
					baseDir: options.baseDir
				}
			}

			browserSync.init(o);
			browserSync.watch('dist/**/*.*').on('change', browserSync.reload)
		}
}