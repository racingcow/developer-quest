module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: {
			options: {
				force: true
			},
			pubDir: {
				files: [{
					//BE VERY CAREFUL WHEN CHANGING THIS PATH IF options:force IS SET TO TRUE ABOVE
					src: [
						'<%= pkg.paths.publishDir %>/lib',
						'<%= pkg.paths.publishDir %>/media',
						'<%= pkg.paths.publishDir %>/*'
					]
				}]
			},
			intermediateBuildArtifacts: {
				files: [{
					src: [
						'<%= pkg.paths.publishDir %>lib/devquest',
						'<%= pkg.paths.publishDir %>lib/impact/*.js',
						'<%= pkg.paths.publishDir %>lib/plugins',
						'<%= pkg.paths.publishDir %>lib/plusplus',
						'<%= pkg.paths.publishDir %>lib/weltmeister',
						'<%= pkg.paths.publishDir %>tools'
					]
				}]
			}
		},
		copy: {
			node: {
				files: [
					{src: ['app.js', 'config.js'], dest: '<%= pkg.paths.publishDir %>'}
				]
			},
			heroku: {
				files: [
					{src: ['Procfile', 'package.json'], dest: '<%= pkg.paths.publishDir %>'}
				]
			},
			media: {
				files: [
					{expand: true, src: ['media/**/*.{png,jpg}'], dest: '<%= pkg.paths.publishDir %>'}
				]
			},
			tools: {
				files: [
					{expand: true, src: ['tools/**/*'], dest: '<%= pkg.paths.publishDir %>'}
				]
			},
			debug: {
				files: [
					{expand: true, src: ['lib/impact/debug/**/*'], dest: '<%= pkg.paths.publishDir %>'}
				]
			}
		},
		cssmin: {
			minify: {
				src: ['theme.css'],
				dest: '<%= pkg.paths.publishDir %>/theme.css'
			}
		},
		htmlmin: {
			options: {
				removeComments: true,
				collapseWhitespace: true
			},
			minify: {
				src: ['deploy.html'],
				dest: '<%= pkg.paths.publishDir %>/index.html'
			}
		},
		uglify: {
			minifyEachSource: {
				options: {
					mangle: true,
					compress: false,
					preserveComments: false
				},
				files: [{
					expand: true,
					src: ['lib/**/*.js'],
					dest: '<%= pkg.paths.publishDir %>'
				}]
			}
		},
		exec: {
			bake: {
				cwd: '<%= pkg.paths.publishDir %>',
				cmd: '"<%= pkg.paths.php %>" <%= pkg.paths.bake %> <%= pkg.paths.impact %> <%= pkg.paths.game %> <%= pkg.paths.publishFile %>'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-exec');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-leading-indent');

	grunt.config.set('leadingIndent.indentation', 'tabs');
	grunt.config.set('leadingIndent.jsFiles', {
		src : [
			'lib/devquest/**/*.js',
			'app.js',
			'config.js',
			'Gruntfile.js',
			'mobile-buttons.js'
		]
	});
	grunt.config.set('leadingIndent.cssFiles', {
		src : ['*.css']
	});
	grunt.config.set('leadingIndent.htmlFiles', {
		src : ['*.html']
	});

	grunt.registerTask('cleanup', ['clean:pubDir']);
	grunt.registerTask('checkStyle', [
		'leadingIndent:jsFiles', 
		'leadingIndent:cssFiles',
		'leadingIndent:htmlFiles'
	]);
	grunt.registerTask('build', [
		'checkStyle',
		'cleanup',
		'copy',
		'cssmin',
		'htmlmin',
		'uglify:minifyEachSource',
		'exec:bake',
		'clean:intermediateBuildArtifacts'
	]);
	grunt.registerTask('default', ['build']);

};