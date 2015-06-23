/**
 * Created by chenzhuo on 15-6-20.
 */

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        copy: {
            dev: {
                files: [
                    {src: 'bower_components/requirejs/require.js', dest: 'js/dev/lib/require.js'},
                    {src: 'bower_components/knockout/dist/knockout.debug.js', dest: 'js/dev/lib/knockout.js'},
                    {src: 'bower_components/jquery/dist/jquery.js', dest: 'js/dev/lib/jquery.js'},
                    {src: 'bower_components/bootstrap/dist/css/bootstrap.css', dest: 'css/bootstrap.css'},
                    {src: 'bower_components/bootstrap/dist/js/bootstrap.js', dest: 'js/dev/bootstrap.js'},
                    {cwd: 'bower_components/bootstrap/dist/fonts/', src: '**', dest: 'fonts/', expand: true},
                    {src: 'bower_components/flat-ui/dist/css/flat-ui.css', dest: 'css/flat-ui.css'}
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task(s).
    grunt.registerTask('default', ['copy']);

};
