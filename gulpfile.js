'use strict'

// system
const path        = require('path')

// node_modules
const babel       = require('gulp-babel')
const browserify  = require('gulp-browserify')
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

gulp.task('default', ['browserify'])

gulp.task('babel', ['typescript'], () => {
  return gulp.src('build/es2015/**/*.js')
    .pipe(babel()).pipe(gulp.dest('build/js'))
})

gulp.task('browserify', ['babel', 'copy', 'less'], () => {
  return gulp.src('build/js/core.js')
    .pipe(browserify())
    .pipe(gulp.dest('dist'))
})

gulp.task('clean', () => del(['build', 'dist']))

gulp.task('copy', ['copy-dist', 'copy-css'])

gulp.task('copy-css', () => {
  return gulp.src('node_modules/bootstrap/dist/css/bootstrap.css')
    .pipe(gulp.dest('dist/css'))
})

gulp.task('copy-dist', () => {
  return gulp.src([
    'index.html',
    '*img/**/*',
    'main.js',
    'package.json'
  ]).pipe(gulp.dest('dist'))
})

gulp.task('less', () => {
  return gulp.src('less/**/*.less')
    .pipe(less({ paths: ['less'] }))
    .pipe(gulp.dest('dist/css'))
})

gulp.task('typescript', (callback) => {
  return run('tsc', callback)
})