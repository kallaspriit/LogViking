/* global module */
module.exports = function (grunt) {
	'use strict';

	// require all the dependencies
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// set grunt config
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// https://github.com/gruntjs/grunt-contrib-compress
		compress: {
			build: {
				cwd: '../client',
				expand: true,
				options: {
					mode: 'zip',
					archive: '../bin/LogViking.nw'
				},
				src: ['**/*']
			}
		},

		// https://github.com/gruntjs/grunt-contrib-copy
		//copy: {
		//	build: {
		//		files: [{
		//			expand: true,
		//			cwd: './node-webkit',
		//			src: ['**/*.dll', '**/*.exe', '**/*.pak'],
		//			dest: '../bin',
		//		}]
		//	}
		//}
	});

	// register default task
	grunt.registerTask('default', ['compress:build']);
};