const gulp = require('gulp');
const babel = require("gulp-babel");
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();

gulp.task('connect', ['sass', 'js'], () => {
    browserSync.init({
        port: 3000,
        server: './app/'
    });

    gulp.watch(['src/sass/*.scss', 'src/sass/**/*.scss', 'src/sass/**/**/*.scss'], ['sass']);
    gulp.watch(['src/scripts/*.js', 'src/scripts/**/*.js', 'src/scripts/**/**/*.js'], ['js']);
});


gulp.task('sass', function () {
    return gulp.src('src/sass/all.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('app/styles')).pipe(browserSync.stream());
});


gulp.task('js', () => {
    return gulp.src(['src/scripts/**/*.js', 'src/scripts/**/**/*.js', 'src/scripts/*.js'])
        // .pipe(babel({presets: ['@babel/env'], compact: false}))
        .pipe(concat('all.js'))
        .pipe(gulp.dest('app/scripts'));
});


gulp.task('build', ['js', 'sass']);
gulp.task('default', ['connect']);