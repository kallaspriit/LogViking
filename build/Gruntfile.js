/* global module */
module.exports = function (grunt) {
	'use strict';

	// require all the dependencies
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// set grunt config
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// https://github.com/gruntjs/grunt-contrib-jshint
		jshint: {
			ui: {
				options: {
					jshintrc: '../client/.jshintrc',
				},
				src: [
					'../client/src/**/*.js',
					//'../client/components-build/**/*.js'
				]
			}
		},

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

		// https://github.com/ericclemmons/grunt-react
		react: {
			jsx: {
				expand: true,
				cwd: '../client/components',
				src: ['**/*.jsx'],
				dest: '../client/components-build',
				ext: '.js',
				watch: true
			}
		},

		// https://github.com/gruntjs/grunt-contrib-watch
		watch: {
			jsx: {
				files: ['../client/components/**/*.jsx'],
				tasks: ['react:jsx'],
				options: {
					spawn: false,
				},
			},
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
	grunt.registerTask('build', ['react:jsx', 'compress:build']);
	grunt.registerTask('jsx', ['watch:jsx']);
	grunt.registerTask('default', ['build']);
};