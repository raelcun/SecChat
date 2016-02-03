const gulp = require('gulp'),
			mocha = require('gulp-mocha'),
			istanbul = require('gulp-istanbul');

gulp.task('pre-lib-test', () => {
	return gulp
		.src(['src/**/*.js', '!src/**/test/**/*.js', '!src/lib/logger.js', '!src/app.js', '!src/validate/**/*.js', '!src/routes/**/*.js', '!src/controllers/**/*.js'])
		.pipe(istanbul({ includeUntested: true }))
		.pipe(istanbul.hookRequire());
})

gulp.task('test', ['pre-lib-test'], () => {
	return gulp
		.src(['src/lib/test/*.js', 'src/test/*.js'])
		.pipe(mocha())
		.pipe(istanbul.writeReports())
		.pipe(istanbul.enforceThresholds({ thresholds: { global: 90 }}));
})