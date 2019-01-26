var gulp = require('gulp');
var concat = require('gulp-concat');
var terser = require('gulp-terser');
var cleanCSS = require('gulp-clean-css');

// Concat and compress js files
gulp.task('js', function() {
    return gulp.src('./src/js/*.js')
        .pipe(concat('script.min.js'))
        .pipe(terser())
        .pipe(gulp.dest('./js/'));
});

// Concat and compress css files
gulp.task('css', function() {
    return gulp.src(['./src/css/normalize.css', './src/css/fonts.css', './src/css/fontello.css', './src/css/style.css'])
        .pipe(concat('style.min.css'))
        .pipe(cleanCSS({ level: { 1: { specialComments: 0 } } }))
        .pipe(gulp.dest('./css/'));
});

// Copy fonts
gulp.task('fonts', function() {
    return gulp.src('./src/fonts/*')
        .pipe(gulp.dest('./fonts/'));
});

// Rebuild js and css on change
gulp.task('watch', function() {
    gulp.watch('./src/js/*.js', gulp.series('js'));
    gulp.watch('./src/css/*.css', gulp.series('css'));
});

// Run all tasks
gulp.task('deploy', gulp.parallel('js', 'css', 'fonts'));