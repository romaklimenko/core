'use strict';

// system
let path        = require('path');

// node_modules
let babel       = require("gulp-babel");
let del         = require('del');
let gulp        = require('gulp');
let less        = require('gulp-less');
let exec        = require('child_process').exec;

let run = (command, callback) => {
  exec(command, (error, stdout, stderr) => {
    if (stdout) {
      console.log(stdout);
    }
    if (stderr) {
      console.log(stderr)
    };
    callback(error);
  });
};

gulp.task('default', ['copy', 'less', 'browserify']);

gulp.task('babel', ['typescript'], () => {
  return gulp.src(['build/es6/**/*.js'])
    .pipe(babel())
    .pipe(gulp.dest("build/js"));
});

gulp.task('browserify', ['babel'], (callback) => {
  run('browserify build/js/scripts/core.js -o dist/core.js', callback);
  gulp.src('build/es6/main.js').pipe(gulp.dest('dist'));
});

gulp.task('clean', () => {
  return del(['build', 'dist']);
});

gulp.task('copy', () => {
  return gulp.src([
    'index.html',
    'package.json',
    '*img/**/*'
  ])
  .pipe(gulp.dest('dist'));
});

gulp.task('less', () => {
  return gulp.src('less/**/*.less')
    .pipe(less({
      paths: [ 'less' ]
    }))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('typescript', (callback) => {
  run('tsc', callback);
});