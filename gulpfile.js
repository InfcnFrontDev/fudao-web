// yangkk - 2016年09月26日
const path = require('path');
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const bsReload = browserSync.reload;

gulp.task('clean', function () {
});

gulp.task('dev', function () {
    browserSync.init({
        startPath: "/",
        files: ["app/**/*.*"],
        server: {
            baseDir: 'app'
        },
        open: false,
        notify: false
    });
});

gulp.task('build', function () {
});
