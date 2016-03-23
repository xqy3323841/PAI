var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
//var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
/*var jshint = require('gulp-jshint');*/
/*
var paths = {
  sass: ['./scss/!**!/!*.scss']
};*/

gulp.task('default', ['concat-controllers', 'concat-services', 'concat-directives', 'concat-filters']);

/*gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});*/

gulp.task('watch', ['default'], function() {
  //gulp.watch(paths.sass, ['sass']);

  // AngularJS鏂囦欢鐩戝惉
  gulp.watch('www/js/controllers/*.js', ['concat-controllers'], function (event) {
    console.log('Concat controllers ' + event.path);
  });

  gulp.watch('www/js/services/*.js', ['concat-services'], function (event) {
    console.log('Concat services' + event.path);
  });

  gulp.watch('www/js/directives/*.js', ['concat-directives'], function (event) {
    console.log('Concat directives' + event.path);
  });

  gulp.watch('www/js/filters/*.js', ['concat-filters'], function (event) {
    console.log('Concat filters' + event.path);
  });
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

// Angular鍚堝苟js
gulp.task('concat-controllers', function () {
  gulp.src(['www/js/controllers/base.js', 'www/js/controllers/*.js'])
    .pipe(concat('controllers.js'))
    .pipe(gulp.dest('www/js'));
});

gulp.task('concat-services', function () {
  gulp.src(['www/js/services/base.js', 'www/js/services/*.js'])
    .pipe(concat('services.js'))
    .pipe(gulp.dest('www/js'));
});

gulp.task('concat-directives', function () {
  gulp.src(['www/js/directives/base.js', 'www/js/directives/*.js'])
    .pipe(concat('directives.js'))
    .pipe(gulp.dest('www/js'));
});

gulp.task('concat-filters', function () {
  gulp.src(['www/js/filters/base.js', 'www/js/filters/*.js'])
    .pipe(concat('filters.js'))
    .pipe(gulp.dest('www/js'));
});

gulp.task('lint', function() {
  return gulp.src(['www/js/**/*.js', '!www/js/controllers.js', '!www/js/directives.js', '!www/js/services.js', '!www/js/filters.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('gulp-jshint-html-reporter', {
      filename: __dirname + '/jshint-output.html',
      createMissingFolders : false
    }));
});
