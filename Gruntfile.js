module.exports = grunt => {
	grunt.loadNpmTasks('grunt-exec');
	grunt.initConfig({
		exec: {
      build: 'sh ./build.sh'
		},
	});
	grunt.registerTask('default', ['exec:build']);
}