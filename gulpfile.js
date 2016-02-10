'use strict'

// system
const path        = require('path')

// node_modules
const del         = require('del')
const exec        = require('child_process').exec
const gulp        = require('gulp')
const less        = require('gulp-less')

const run = (command, callback) => {
  exec(command, (error, stdout, stderr) => {
    if (stdout) console.info(stdout)
    if (stderr) console.error(stderr)
    callback(error)
  })
}

gulp.task('default', ['copy', 'less', 'browserify'])

gulp.task('browserify', (callback) => {
  run('browserify scripts/core.js -o dist/bundle.js', callback)
  gulp.src('main.js').pipe(gulp.dest('dist'))
})

gulp.task('clean', () => del(['dist']))

gulp.task('copy', () => {
  gulp.src([
    'index.html',
    'package.json',
    '*img/**/*'
  ])
  .pipe(gulp.dest('dist'))

  gulp.src('node_modules/bootstrap/dist/css/bootstrap.css')
    .pipe(gulp.dest('dist/css'))
})

gulp.task('less', () => {
  return gulp.src('less/**/*.less')
    .pipe(less({
      paths: ['less']
    }))
    .pipe(gulp.dest('dist/css'))
})