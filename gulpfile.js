var gulp = require('gulp'),
    gp_concat = require('gulp-concat'),
    gp_rename = require('gulp-rename'),
    gp_uglify = require('gulp-uglify');
    gp_sourcemaps = require('gulp-sourcemaps');
    rimraf = require('gulp-rimraf'); // rimraf directly

gulp.task('clear', function (cb) {
    return gulp.src('./build', { read: false }) // much faster
        .pipe(rimraf());
});

gulp.task('build', function (cb) {
    return gulp.src([
            './**/*.js',
            './*.js',
            '!./cluster.js',
            '!./gulpfile.js',
            '!./node_modules/**'
        ])
        .pipe(gp_concat('app.js'))
        .pipe(gp_uglify())
        .pipe(gulp.dest('build/'));
});

