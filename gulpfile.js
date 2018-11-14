'use strict';

const 	gulp 	= require('gulp');
const 	$  = require('gulp-load-plugins')();
const 	path = require('path');

function lazyRequireTask(taskName, path, options){
	options = options || {};
	options.taskName=taskName;

	gulp.task(taskName, function(callback){
		let task = require(path).call(this, options);
		return task(callback);
	});
}

const cssSrcPath = [
		//'src/components/**/*.{css,sass,scss}',
		'src/components/App/App.scss'
	];
const jsSrcPath = [
		'src/components/App/App.js'
	];

lazyRequireTask('serve', './gulp-tasks/serve', {
	src:'dist/**/*.*', 
	baseDir:'dist'
});

lazyRequireTask('compile-js', './gulp-tasks/compile-js', {
	src:jsSrcPath, 
	dest:'dist/js',
	cacheName:'jsCache',
	fileName:'index.min.js'
});

lazyRequireTask('compile-css', './gulp-tasks/compile-css', {
	src:cssSrcPath, 
	dest:'dist/css',
	fileName:'styles.min.css',
	cacheName:'cssCache',
	baseDir:'src'
});

lazyRequireTask('copy-img', './gulp-tasks/copy-img', {
	src: 'src/img/**', 
	dest:'dist/img'
});
lazyRequireTask('copy-fonts', './gulp-tasks/copy-fonts', {
    src: 'src/fonts/**',
    dest:'dist/fonts'
});
lazyRequireTask('copy-html', './gulp-tasks/copy-html', {
	src: 'src/**/*.html', 
	dest:'dist'
});

lazyRequireTask('clean', './gulp-tasks/clean', {
	dest:'dist'
});

lazyRequireTask('structure', './gulp-tasks/structure', {
	folders: [
		'src',
		'src/components',
		'src/img',
		'src/icons',
		'src/fonts'
	]
});


gulp.task('watch', function(){
	gulp.watch('src/components/**/*.{css,sass,scss}', gulp.series('compile-css'))
		.on('unlink', function(filepath){
			//$.remember.forget('cssCache', path.resolve(filepath));
			//delete $.cached.chaches.cssCache[path.resolve(filepath)];
		});
	gulp.watch('src/components/**/*.js', gulp.series('compile-js'))
		.on('unlink', function(filepath){
			//$.remember.forget('jsCache', path.resolve(filepath));
			//delete $.cached.chaches.jsCache[path.resolve(filepath)];
		});

	gulp.watch('src/img/**', gulp.series('copy-img'));
	gulp.watch('src/**/*.html', gulp.series('copy-html'));
    gulp.watch('src/fonts/**', gulp.series('copy-fonts'));
});


gulp.task('build', gulp.series(
	'clean', 
	gulp.parallel('copy-html', 'compile-css', 'compile-js', 'copy-fonts', 'copy-img')
	)
);

gulp.task('dev', gulp.series(
	'build', 
	gulp.parallel('watch', 'serve'))
);

