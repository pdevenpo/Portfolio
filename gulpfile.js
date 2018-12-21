const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const minify = require('gulp-minify');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const fs = require('fs');

const cssAddonsPath = './css/modules/';

// CSS Tasks
gulp.task('css-compile', function() {
  gulp.src('scss/*.scss')
    .pipe(sass({outputStyle: 'nested'}).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 10 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./css/'));

    gulp.start('css-compile-modules');
});

// CSS Tasks
gulp.task('css-compile-modules', function() {
  gulp.src('scss/**/modules/**/*.scss')
    .pipe(sass({outputStyle: 'nested'}).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 10 versions'],
      cascade: false
    }))
    .pipe(rename({ dirname: cssAddonsPath }))
    .pipe(gulp.dest('./'));
});


gulp.task('css-minify', function() {
    gulp.src(['./css/*.css', '!./css/*.min.css', '!./css/bootstrap.css'])
      .pipe(cssmin())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('./css'));

    gulp.start('css-minify-modules');
});

gulp.task('css-minify-modules', function() {
  gulp.src(['./css/modules/*.css', '!./css/modules/*.min.css'])
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./css/modules'));
});

// JavaScript Tasks
gulp.task('js-build', function() {

  const plugins = getJSModules();

  return gulp.src(plugins.modules)
    .pipe(concat('mdb.js'))
    .pipe(gulp.dest('./js/'));

    gulp.start('js-lite-build');
    gulp.start('js-minify');

});

gulp.task('js-minify', function() {
  gulp.src(['./js/mdb.js'])
    .pipe(minify({
      ext:{
        // src:'.js',
        min:'.min.js'
      },
      noSource: true,
    }))
    .pipe(gulp.dest('./js'));
});

// Image Compression
gulp.task('img-compression', function() {
  gulp.src('./img/*')
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
      })
    ]))
    .pipe(gulp.dest('./img'));
});

// Live Server
gulp.task('live-server', function() {
  browserSync.init({
    server: {
      baseDir: "./dist",
      directory: true
    },
    notify: false
  });

  gulp.watch("**/*", {cwd: './dist'}, browserSync.reload);
});

// Watch on everything
gulp.task('mdb-go', function() {
  gulp.start('live-server');
  gulp.watch("scss/**/*.scss", ['css-compile']);
  gulp.watch(["css/*.css", "!css/*.min.css"], ['css-minify']);
  gulp.watch("js/**/*.js", ['js-build']);
  gulp.watch(["js/*.js", "!js/*.min.js"], ['js-minify']);
  gulp.watch("**/*", {cwd: './img/'}, ['img-compression']);
});

function getJSModules() {
  delete require.cache[require.resolve('./js/modules.js')];
  return require('./js/modules');
}
