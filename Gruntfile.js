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
					src: ['<%= pkg.paths.publishDir %>']
				}]
			},
			intermediateBuildArtifacts: {
				files: [{
					src: [
						'<%= pkg.paths.publishDir %>/lib',
						'<%= pkg.paths.publishDir %>/tools'
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
					{src: ['Procfile'], dest: '<%= pkg.paths.publishDir %>'}
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

	grunt.registerTask('cleanup', ['clean:pubDir']);
	grunt.registerTask('build', [
		'clean:pubDir',
		'copy',
		'cssmin',
		'htmlmin',
		'uglify:minifyEachSource',
		'exec:bake',
		'clean:intermediateBuildArtifacts'
	]);
	grunt.registerTask('default', ['build']);

};