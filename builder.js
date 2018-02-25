/*
  Modules
*/
const browserify = require('browserify');
const fs = require('fs');
const gulp = require('gulp');
const panini = require('panini');
const sass = require('gulp-sass');

/*
  Tasks
*/
gulp.task('build', gulp.series(compile, style, bundle));
gulp.task('default', gulp.series('build', watch));

/*
  Functions
*/
function compile() {
  return gulp.src('./src/html/pages/**/*.html')
             .pipe(panini({
               root: './src/html/pages',
               layouts: './src/html/layouts',
               partials: './src/html/partials'
             }))
             .pipe(gulp.dest('./web'));
}

function style() {
  return gulp.src('./src/scss/**/*.scss')
             .pipe(sass({
               includePaths: ['./node_modules/foundation-sites/scss']
             }).on('error', sass.logError))
             .pipe(gulp.dest('./web/css'));
}

function bundle() {
  gulp.src('./src/js/**/*.js')
      .pipe(gulp.dest('./web/js'));
      
  return browserify('./src/js/bundle.js')
         .bundle()
         .pipe(fs.createWriteStream('./web/js/bundle.js'));
}

function resetPages(done) {
  panini.refresh();
  done();
}

function watch() {
  gulp.watch('./src/html/pages/**/*.html').on('all', gulp.series(compile));
  gulp.watch('./src/html/{layouts,partials}/**/*.html').on('all', gulp.series(resetPages, compile));
  gulp.watch('./src/scss/**/*.scss').on('all', gulp.series(style));
  gulp.watch('./src/js/**/*.js').on('all', gulp.series(bundle));
}
