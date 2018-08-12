const gulp = require('gulp');
const gpConcat = require('gulp-concat');
const gpUglify = require('gulp-uglify');
const rimraf = require('gulp-rimraf');

gulp.task('clear', () => gulp.src('./build', { read: false }).pipe(rimraf()));

gulp.task('build', () => gulp.src([
	'./**/*.js',
	'./*.js',
	'!./cluster.js',
	'!./gulpfile.js',
	'!./node_modules/**',
])
	.pipe(gpConcat('app.js'))
	.pipe(gpUglify())
	.pipe(gulp.dest('build/')));
