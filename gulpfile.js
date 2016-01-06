'use strict'

// system
const path        = require('path')

// node_modules
const del         = require('del')
const gulp        = require('gulp')
const less        = require('gulp-less')
const exec        = require('child_process').exec

const run = (command, callback) => {
  exec(command, (error, stdout, stderr) => {
    if (stdout) console.info(stdout)
    if (stderr) console.error(stderr)
    callback(error)
  })
}

gulp.task('default', ['copy', 'less', 'browserify'])

gulp.task('browserify', ['typescript'], (callback) => {
  run('browserify build/js/scripts/core.js -o dist/core.js', callback)
  gulp.src('build/js/main.js').pipe(gulp.dest('dist'))
})

gulp.task('clean', () => del(['build', 'dist']))

gulp.task('copy', () => {
  return gulp.src([
    'index.html',
    'package.json',
    '*img/**/*'
  ])
  .pipe(gulp.dest('dist'))
})

gulp.task('less', () => {
  return gulp.src('less/**/*.less')
    .pipe(less({
      paths: [ 'less' ]
    }))
    .pipe(gulp.dest('dist/css'))
})

gulp.task('typescript', (callback) => run('tsc', callback))