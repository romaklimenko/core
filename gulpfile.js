var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');


gulp.task('default', ['copy', 'less']);

gulp.task('less', function () {
  return gulp.src('./less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less') ]
    }))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('copy', function () {
  return gulp
    .src('css/*')
    .pipe(gulp.dest('./dist/css'))
})