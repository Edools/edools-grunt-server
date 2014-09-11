/*
 * edools-grunt-server
 *
 *
 * Copyright (c) 2014 Diogo Beda
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');

module.exports = function (grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  var stripExtension = function (filename) {
    var names = filename.split('.');
    names.splice(names.length - 1);
    return names.join('');
  };

  var createSchemaPath = function (schemas, templateName, schemaPath) {
    var recurse = function () {

    };

    return function (subdir, index) {
      if(lastDir === undefined && schemas) {
        schemas[lastDir] = {};
      }
    };
  };

  grunt.registerMultiTask('edools_server', 'Edools theme development server plugin', function () {
    var self = this,  target = {},
      paramsMiddleware = function (req, res, next) {
        if(req.url !== '/themes/params') {
          return next();
        }

        var options = self.data.options,
          paramsPath = options.paramsPath || 'params.json';

        options.appPath = options.appPath || 'app';
        var templatesPath = options.appPath + '/templates',
          schemasPath = options.appPath + '/schemas',
          schemas = {}, params;

        grunt.file.recurse(templatesPath, function (absPath, rootDir, subDir, filename) {
          var templateName = stripExtension(filename),
            schemaName = templateName + '.json',
            schemaPath = [schemasPath, subDir, schemaName].join('/'),
            objectToFill;

          if (subDir === undefined) {
            schemas[templateName] = grunt.file.exists(schemaPath) ? grunt.file.readJSON(schemaPath) : {};
          } else {
            var subdirs = subDir.split('/'),
              len = subdirs.length,
              lastObj = schemas;

            subdirs.forEach(function (dir, index) {
              if(lastObj[dir] === undefined) {
                lastObj[dir] = {};
              }

              if(index+1 === len) {
                lastObj[dir][templateName] = grunt.file.exists(schemaPath) ? grunt.file.readJSON(schemaPath) : {};
              }

              lastObj = lastObj[dir];
            });
          }
        });

        if(grunt.file.exists(paramsPath)) {
          params = grunt.file.readJSON(paramsPath);
          params.schemas = schemas;
        }


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
