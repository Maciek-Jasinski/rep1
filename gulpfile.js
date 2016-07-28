var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var autoprefix = require('gulp-autoprefixer');
var browserSync = require('browser-sync');

//SASS
gulp.task('styles',function(){
	return sass('sass/main.scss').pipe(gulp.dest('build/css/'));
});
//Autoprefixer
gulp.task('autopref', function(){
	gulp.src('build/css/*.css').pipe(autoprefix()).pipe(gulp.dest('css/'));
});
//
gulp.task('sass-watch', ['styles'], browserSync.reload);
//Watch
gulp.task('watch', function(){
	browserSync({
		server: {
			baseDir:'./'
		}
	});
	gulp.watch('sass/**/*', ['sass-watch']);
	gulp.watch('build/css/*.css', ['autopref']);
});

gulp.task('default',['styles','watch']);
