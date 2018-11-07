'use strict';

const 	gulp  = require('gulp');
const 	fs 		= require('fs');


module.exports = function(options){

	return function(cb){
		options.folders.forEach( dir =>{
			if(!fs.existsSync(dir)){
				fs.mkdirSync(dir);
			}
		});
		cb();
	};

}
