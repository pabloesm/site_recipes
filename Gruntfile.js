module.exports = function(grunt) {
	grunt.initConfig({

		browserify: {
			options: {
				browserifyOptions: { debug: true }
			},
			dist: {
				files: {
					'site/bundle.js': ['site/js/*/*.js']
				}
			}
		},

		eslint: {
			target: ['site/js/*/*.js', 'site/js/*.js','!site/js/lib/']
		},

		watch: {
			files: ['server.js', 'routes/*.js', 'site/js/*/*.js', 'site/js/app.js',],
			tasks: ['eslint', 'browserify']
		},

		// uglify: {
		// 	my_target: {
		// 		files: {
		// 			'public/js/bundle.js': ['public/js/bundle.js']
		// 		}
		// 	}
		// }

	});

	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	// grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-eslint');

  grunt.registerTask('default', ['eslint', 'browserify']);
  // grunt.registerTask('deploy', 'linter + browserify + uglify', ['eslint', 'browserify', 'uglify']);
};