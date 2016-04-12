'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();
var tsConfig = $.typescript.createProject(path.join(__dirname, '/../tsconfig.json'));

function tsSources(test) {
  var sources = [ path.join(conf.paths.src, '/app/**/*.ts') ];
  if (!test) {
    sources.push(path.join('!' + conf.paths.src, '/app/**/*.spec.ts'));
  }

  return sources;
}

function tsCompile(test) {
  var dest = path.join(conf.paths.tmp, '/serve/app');

  return gulp.src(tsSources(test))
    .pipe($.changed(dest, {extension: '.js'}))
    .pipe($.tslint())
    .pipe($.tslint.report("verbose", { emitError: false }))
    .pipe($.typescript(tsConfig.compilerOptions))
    .pipe(gulp.dest(dest))
}

gulp.task('scripts', function () {
  return tsCompile(false);
});

gulp.task('scripts:watch', ['inject'], function () {
  return gulp.watch(tsSources(false), function () {
    gulp.start('inject-reload');
  });
});

gulp.task('scripts:test', function () {
  return tsCompile(true);
});

gulp.task('scripts:test-watch', ['scripts'], function () {
  return gulp.watch(tsSources(true), function () {
    gulp.start('scripts:test');
  });
});
