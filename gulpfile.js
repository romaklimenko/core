// system
var path        = require('path');

// node_modules
var del         = require('del');
var gulp        = require('gulp');
var less        = require('gulp-less');
var ts          = require('gulp-typescript');

var tsProject = ts.createProject('tsconfig.json');

gulp.task('default', ['copy', 'less', 'ts']);

gulp.task('clean', function(){
  return del(['dist/**/*', '!dist/css/**', '!dist/js/**', '!dist/main.js']);
});

gulp.task('copy', ['clean'], function () {
  return gulp.src([
      'index.html',
      'package.json',
      '*img/**/*',
      '*lib/**/*',
      '*typings/**/*'
  ])
  .pipe(gulp.dest('dist'));
});

gulp.task('css-clean', function() {
  return del(['dist/css/**/*']);
});

gulp.task('less', ['css-clean'], function () {
  return gulp.src('less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less') ]
    }))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('ts-clean', function() {
  return del(['dist/js/**/*', 'dist/main.js']);
});

gulp.task('ts', ['ts-clean'], function(){
  return gulp.src(['ts/**/*.ts', 'main.ts'])
    .pipe(ts(tsProject))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  gulp.watch(['ts/**/*.ts', 'main.ts'], ['ts']);
  gulp.watch(['less/**/*.less'], ['less']);
});