# edools-grunt-server

> Edools theme development server plugin

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install edools-grunt-server --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('edools-grunt-server');
```

## The "edools_server" task

### Overview
In your project's Gruntfile, add a section named `edools_server` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  edools_server: {
    your_target: {
      options: {
        paramsPath: 'params.json',
        port: 9000,
        hostname: '0.0.0.0',
        livereload: 35729,
        base: [
          '<%= yeoman.app %>',
        ]
      }
    }
})
```

### Options

#### options.paramsPath
Type: `String`
Default value: `'params.json'`

The path of the JSON file that contains the theme parameters.

#### Any other options

The other options are form `grunt-contrib-connect` repo, please refer to its [docs](https://github.com/gruntjs/grunt-contrib-connect#options).

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2014 Diogo Beda. Licensed under the MIT license.
