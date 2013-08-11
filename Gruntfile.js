module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		exec: {
			removeDeployDir: {
				cmd: 'if exist "<%= pkg.paths.publishDir %>" rd /s /q "<%= pkg.paths.publishDir %>"'
			},
			makeDeployDir: {
				cmd: 'md "<%= pkg.paths.publishDir %>"'
			},
			bake: {
				cmd: '"<%= pkg.paths.php %>" <%= pkg.paths.bake %> <%= pkg.paths.impact %> <%= pkg.paths.game %> <%= pkg.paths.publishDir %><%= pkg.paths.publishFile %>'
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
			}
		},
		cssmin: {
			minify: {
				src: ['theme.css'],
				dest: '<%= pkg.paths.publishDir %>/theme.css'
			}
		},
		htmlmin: {
			minify: {
				options: {
					removeComments: true,
					collapseWhitespace: true,
					useShortDoctype: true,
					removeEmptyAttributes: true
				},
				src: ['deploy.html'],
				dest: '<%= pkg.paths.publishDir %>/index.html'
			}
		}
	});

	grunt.loadNpmTasks('grunt-exec');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');

	grunt.registerTask('default', ['exec', 'copy', 'cssmin', 'htmlmin']);

};