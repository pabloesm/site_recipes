module.exports = function(grunt) {
	grunt.initConfig({

		sass: {
			dist: {
				files: {
					'site/css/main.css': 'site/css/main.scss'
				}
			}
		},

		browserify: {
			options: {
				browserifyOptions: { debug: true }
			},
			dist: {
				files: {
					//'site/app.bundle.js': 'site/js/app/app.js'
					'site/admin.bundle.js': 'site/js/app/admin.js'
				}
			}
		},

		eslint: {
			target: ['server.js', 'routes/*.js', 'site/js/*/*.js', 'site/js/*.js', '!site/js/lib/']
		},

		watch: {
			files: ['server.js', 'routes/*.js', 'site/js/*/*.js', 'site/js/*.js', 'site/css/main.scss'],
			tasks: ['eslint', 'browserify', 'sass']
		},

		// uglify: {
		// 	my_target: {
		// 		files: {
		// 			'public/js/bundle.js': ['public/js/bundle.js']
		// 		}
		// 	}
		// }

	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	// grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-eslint');

	grunt.registerTask('sasscomp', ['sass']);
  grunt.registerTask('default', ['eslint', 'browserify']);
  grunt.registerTask('bro', ['browserify']);
  // grunt.registerTask('deploy', 'linter + browserify + uglify', ['eslint', 'browserify', 'uglify']);
};