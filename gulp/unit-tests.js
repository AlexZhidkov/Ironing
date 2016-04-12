'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var karma = require('karma');
var coveralls = require('gulp-coveralls');

var pathSrcHtml = [
  path.join(conf.paths.src, '/**/*.html')
];

var pathSrcJs = [
  path.join(conf.paths.tmp, '/serve/app/index.module.js')
];

function runTests (singleRun, done) {
  var reporters = ['progress'];
  var preprocessors = {};

  pathSrcHtml.forEach(function(path) {
    preprocessors[path] = ['ng-html2js'];
  });

  if (singleRun) {
    pathSrcJs.forEach(function(path) {
      preprocessors[path] = ['coverage'];
    });
    reporters.push('coverage')
  }

  var localConfig = {
    configFile: path.join(__dirname, '/../karma.conf.js'),
    singleRun: singleRun,
    autoWatch: !singleRun,
    reporters: reporters,
    preprocessors: preprocessors
  };

  var server = new karma.Server(localConfig, function(failCount) {
    done(failCount ? new Error("Failed " + failCount + " tests.") : null);
  })
  server.start();
}

gulp.task('karma', ['scripts:test'], function (done) {
  runTests(true, done);
});

gulp.task('coveralls', ['karma'], function () {
  return gulp.src('../coverage/**/lcov.info')
    .pipe(coveralls());
});

gulp.task('test', ['karma', 'coveralls']);

gulp.task('test:auto', ['scripts:test-watch'], function (done) {
  runTests(false, done);
});
