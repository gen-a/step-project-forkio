'use strict';

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const stream = require('stream-combiner2').obj;

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

module.exports = function (options) {
    return function (done) {

        options.src.map(function (entry) {

            return stream(

                browserify({
                    entries: [entry],
                    debug: true
                })
                    .transform(babelify, {presets: ['@babel/env']})
                    .bundle(),
                source(entry),
                $.rename(function (path) {
                    let baseName = (src) => {
                       return src
                           .replace(/^([A-Z])/, (g) => `${g[0].toLowerCase()}`)
                           .replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
                    };

                    path.dirname = "";
                    path.basename = baseName(path.basename);
                    path.extname = ".min.js";
                }),
                buffer(),
                $.if(isDevelopment, $.sourcemaps.init({loadMaps:true})),
                $.uglify(),
                $.if(isDevelopment, $.sourcemaps.write('./')),
                gulp.dest(options.dest)
            ).
            on('error', $.notify.onError());
        });

        return done();
    };

};