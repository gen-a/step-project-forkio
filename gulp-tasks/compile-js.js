'use strict';
 
const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const stream = require('stream-combiner2').obj;

const isDevelopment = ! process.env.NODE_ENV || process.env.NODE_ENV == 'development';

module.exports = function (options) {
    return function () {
    
            return stream(
                gulp.src(options.src),
                $.if(isDevelopment, $.sourcemaps.init()),
                $.cached(options.cacheName),
                $.remember(options.cacheName),

                $.eslint(),
                $.eslint.format(),
                $.eslint.failAfterError(),

                $.babel({presets: ['@babel/env']}),
                $.concat(options.fileName),
                $.uglify(),

                $.if(isDevelopment, $.sourcemaps.write('.')),
                gulp.dest(options.dest)
            ).on('error', $.notify.onError());






        //return combiner(
            //gulp.src(options.src),
            //$.cached(options.cacheName),
            //$.remember(options.cacheName),

            //$.if((file) => file.extname == '.js', $.eslint()),
            //$.if((file) => file.extname == '.js', $.eslint.format()),
            //$.if((file) => file.extname == '.js', $.eslint.failAfterError()),
 
            //$.if((file) => file.extname == '.ts', $.tslint()),
            //$.if((file) => file.extname == '.ts', $.typescript({target: 'ES6'})),
 
            //$.babel({presets: ['es2015', 'stage-0']}),
            //$.concat(options.fileName),
            //$.uglify(),

            //gulp.dest(options.dest)
        //).on('error', $.notify.onError());
    }
};