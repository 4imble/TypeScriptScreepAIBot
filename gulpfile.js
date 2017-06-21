var gulp = require('gulp');
var flatten = require('gulp-flatten');
var flattenRequires = require('gulp-flatten-requires');

gulp.task('default', function() {
  gulp.src(['src/**/*.js'])
  .pipe(flatten())
  .pipe(flattenRequires())
  .pipe(gulp.dest('./'));
});