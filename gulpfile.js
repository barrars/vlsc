/**
 * This example:
 *  Uses the built-in BrowserSync server for HTML files
 *  Watches & compiles SASS files
 *  Watches & injects CSS files
 *
 * More details: http://www.browsersync.io/docs/gulp/
 *
 * Install:
 * npm install browser-sync gulp gulp-sass --save-dev
 *
 * Then run it with:
 * gulp
 */
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var gulp        = require('gulp');
var sass        = require('gulp-sass');
var jade = require('gulp-jade');
var uncss = require('gulp-uncss');
var minifyCss = require('gulp-minify-css');


// Browser-sync task, only cares about compiled CSS
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('jade', function() {
  return gulp.src('*.jade')
    .pipe(jade({
          pretty: true
    }))
    .pipe(gulp.dest(''))
});

gulp.task('jade-watch',['jade'], reload);

// Sass task, will run when any SCSS files change & BrowserSync
// will auto-update browsers
// gulp.task('sass', function () {
//     return gulp.src('scss/**/*.scss')
//         .pipe(sass())
//         .pipe(gulp.dest('css'))
//         .pipe(reload({stream:true}));
// });


gulp.task('uncss', function () {
    return gulp.src('fullmat.css')
        .pipe(uncss({
            html: ['index.html']
        }))
        .pipe(gulp.dest('styles'))
        .pipe(minifyCss())
        .pipe(gulp.dest('styles/min'));
});


// Reload all Browsers
gulp.task('bs-reload', function () {
    browserSync.reload();
});

// Default task to be run with `gulp`
// This default task will run BrowserSync & then use Gulp to watch files.
// When a file is changed, an event is emitted to BrowserSync with the filepath.
gulp.task('default', ['browser-sync'], function () {
    gulp.watch('css/*.css', function (file) {
        if (file.type === "changed") {
            reload(file.path);
        }
    });
    gulp.watch("*.html", ['bs-reload']);
    gulp.watch("*.jade", ['jade']);
});