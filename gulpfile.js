 var gulp = require('gulp'),
 	 connect = require('gulp-connect'),
 	 opn = require('opn'),
     useref = require('gulp-useref'),
     gulpif = require('gulp-if'),
     uglify = require('gulp-uglify'),
     minifyCss = require('gulp-minify-css'),
     del = require('del');

var wiredep = require('wiredep').stream;
 
gulp.task('bower', function () {
  gulp.src('./app/index.html')
    .pipe(wiredep({
      directory: "app/bower"
    }))
    .pipe(gulp.dest('./app'));
});

gulp.task('connect', function() {
	connect.server({
		root: 'app',
		livereload: true,
		port: 8888
	});
	opn('http://localhost:8888');
});

// HTML
gulp.task('html', function () {
  gulp.src('./app/*.html')
    .pipe(connect.reload());
});

// CSS
gulp.task('css', function () {
  gulp.src('./app/css/*.css')
    .pipe(connect.reload());
});

// JS
gulp.task('js', function () {
  gulp.src('./app/js/*.js')
    .pipe(connect.reload());
});

// Watch
gulp.task('watch', function () {
  gulp.watch(['./app/*.html'], ['html']);
  gulp.watch(['./app/css/*.css'], ['css']);
  gulp.watch(['./app/js/*.js'], ['js']);
  gulp.watch('bower.json', ['bower']);
});

// Default task
gulp.task('default', ['connect', 'watch']);

// Clean dist
gulp.task('clean:dist', function() {
  del([
    'dist/*',
  ]);
});

// Move images and fonts to dist
gulp.task('move', ['clean:dist'], function() {
  gulp.src('./app/img/*')
  .pipe(gulp.dest('dist/img'));

  gulp.src('./app/fonts/*')
  .pipe(gulp.dest('dist/fonts'));
});

// Build
gulp.task('build', ['move'], function () {
    var assets = useref.assets();
    
    return gulp.src('app/*.html')
        .pipe(assets)
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});