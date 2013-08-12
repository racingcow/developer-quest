module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		exec: {
			removeDeployDir: {
				cmd: 'if exist "<%= pkg.paths.publishDir %>" rd /s /q "<%= pkg.paths.publishDir %>"'
			},
			makeDeployDir: {
				cmd: 'md "<%= pkg.paths.publishDir %>"'
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
			options: {
				compress: false,
				mangle: true,
				beautify: false
			},
			minify: {
				files: [{
					expand: true,
					src: ['lib/**/*.js'],
					dest: '<%= pkg.paths.publishDir %>'
				}]
			}
		}
	});

	grunt.loadNpmTasks('grunt-exec');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('bake', 'bake', function() {
		grunt.log.writeln('-----------------------------------------------------------');
		grunt.config('exec.removeDeployDir.cmd', 'dir');
		grunt.config('exec.makeDeployDir.cmd', 'dir');
		grunt.config('exec.bake.cwd', '<%= pkg.paths.publishDir %>');
		grunt.config('exec.bake.cmd', '"<%= pkg.paths.php %>" <%= pkg.paths.bake %> <%= pkg.paths.impact %> <%= pkg.paths.game %> <%= pkg.paths.publishFile %>');
		grunt.task.run('exec');
	});

	grunt.registerTask('default', ['exec', 'copy', 'cssmin', 'htmlmin', 'uglify', 'bake']);

};