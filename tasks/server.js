/*
 * edools-grunt-server
 *
 *
 * Copyright (c) 2014 Diogo Beda
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('edools_server', 'Edools theme development server plugin', function () {
    var self = this,  target = {},
      paramsMiddleware = function (req, res, next) {
        if(req.url !== '/themes/params') {
          return next();
        }

        var params = grunt.file.readJSON('params.json');
        res.end(JSON.stringify(params));
      };

    this.data = this.data || { options: {} };
    this.data.options.middleware = function (connect, options, middlewares) {
      middlewares.unshift(paramsMiddleware);
      return middlewares;
    };
    target[this.target] = this.data;

    grunt.task.loadNpmTasks('grunt-contrib-connect');
    grunt.config.set('connect', target);
    grunt.task.run(['connect:'+this.target]);
  });

};
