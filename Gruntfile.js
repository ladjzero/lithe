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
                    {src: 'bower_components/text/text.js', dest: 'js/dev/lib/text.js'},
                    {src: 'bower_components/blueimp-gallery/js/blueimp-gallery.js', dest: 'js/dev/lib/blueimp-gallery.js'},
                    {src: 'bower_components/blueimp-gallery/js/blueimp-helper.js', dest: 'js/dev/lib/blueimp-helper.js'},
                    {src: 'bower_components/blueimp-gallery/js/blueimp-gallery-indicator.js', dest: 'js/dev/lib/blueimp-gallery-indicator.js'},
                    {src: 'bower_components/blueimp-gallery/css/blueimp-gallery.css', dest: 'css/blueimp-gallery.css'},
                    {src: 'bower_components/blueimp-gallery/css/blueimp-gallery-indicator.css', dest: 'css/blueimp-gallery-indicator.css'},
                    {cwd: 'bower_components/blueimp-gallery/img/', src: '*', dest: 'img/', expand: true}
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task(s).
    grunt.registerTask('default', ['copy']);

};
