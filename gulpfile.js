// include gulp
var  gulp = require('gulp');
var jasmine = require('gulp-jasmine');
var  reporters = require('jasmine-reporters');

// include plug-ins
var jshint = require('gulp-jshint');

// JS hint task
gulp.task('jshint', function() {
  gulp.src(['./**/**.js', '!node_modules/**'])
    .pipe(jshint({
        esversion: 6
    }))
    .pipe(jshint.reporter('default'));
});

gulp.task('test', function() {
    gulp.src(['./spec/**/**.js'])
    .pipe(jasmine());
});

gulp.task('default', ['jshint', 'test'] );
