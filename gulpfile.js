var gulp = require('gulp');
var flatten = require('gulp-flatten');
var flattenRequires = require('gulp-flatten-requires');
var ts = require('gulp-typescript');

var tsProject = ts.createProject('./tsconfig.json');

gulp.task('default', ['build']);

gulp.task('build', function() {
  gulp.src(['src/**/*.ts', 'typings/globals/**/*.d.ts'])
  .pipe(tsProject())
  .pipe(flatten())
  .pipe(flattenRequires())
  .pipe(gulp.dest('./'));
});

gulp.task('watch', function() {
    gulp.watch('src/**/*.ts', ['build'])
});