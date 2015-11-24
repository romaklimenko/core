// system
var path        = require('path');

// node_modules
var babel       = require('gulp-babel');
var del         = require('del');
var gulp        = require('gulp');
var less        = require('gulp-less');
var sourcemaps  = require('gulp-sourcemaps');
var ts          = require('gulp-typescript');

var tsProject = ts.createProject('tsconfig.json');

gulp.task('default', ['copy', 'less', 'ts']);

gulp.task('clean', function(){
  return del(['dist/**/*']);
});

gulp.task('copy', ['clean'], function () {
  gulp.src([
      'index.html',
      'package.json',
      '*css/**/*',
      '*img/**/*',
      '*lib/**/*'
  ])
  .pipe(gulp.dest('dist'));
});

gulp.task('less', ['clean'], function () {
  return gulp.src('less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less') ]
    }))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('ts', ['clean'], function(){
  return gulp.src(['ts/**/*.ts', 'main.ts'])
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject))
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});