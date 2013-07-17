module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*\n' +
                '<%= pkg.name %> | v<%= pkg.version %> | Build date: <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                'Copyright (C) 2013 - <%= grunt.template.today("yyyy") %> n-fuse GmbH - All Rights Reserved\n' +
                'Licensed under the <%= pkg.licenses[0].type %> license\n' +
                '*/\n',
        sourceMap: 'dist/<%= pkg.name %>-source-map.js',
        sourceMapRoot: 'dist/'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['uglify']);
};