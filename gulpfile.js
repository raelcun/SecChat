const gulp = require('gulp'),
			mocha = require('gulp-mocha'),
			istanbul = require('gulp-istanbul');

gulp.task('pre-lib-test', () => {
	return gulp
		.src([
			'src/lib/**/*.js',
			'!src/**/test/**/*.js',
			'!src/lib/logger.js'])
		.pipe(istanbul({ includeUntested: true }))
		.pipe(istanbul.hookRequire());
})

gulp.task('test', ['pre-lib-test'], () => {
	return gulp
		.src(['src/lib/test/*.js'])
		.pipe(mocha({ timeout: 10000 }))
		.pipe(istanbul.writeReports())
		.pipe(istanbul.enforceThresholds({ thresholds: { global: 90 }}));
})