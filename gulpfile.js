const gulp 		   = require('gulp'),
	  sass 		   = require('gulp-sass'),
	  browserSync  = require('browser-sync'),
	  concat 	   = require('gulp-concat'),
	  uglify   	   = require('gulp-uglifyjs'),
	  cssnano 	   = require('gulp-cssnano'),
	  rename 	   = require('gulp-rename'),
	  del 		   = require('del'),
	  imagemin     = require('gulp-imagemin'),
	  pngquant 	   = require('imagemin-pngquant'),
	  cache 	   = require('gulp-cache'),
	  autoprefixer = require('gulp-autoprefixer');

const path = {
	dist: {
		html: 'dist/',
		css: 'dist/css/',
		js: 'dist/js/',
		img: 'dist/img/',
		fonts: 'dist/fonts/'
	},
	app: {
		css: 'app/css',
		js: 'app/js'
	},
	src: {
		html: 'app/*.html',
		sass: 'app/sass/**/*.sass',
		css: 'app/css/**/*.*',
		js: 'app/js/**/*.js',
		img: 'app/img/**/*.*',
		fonts: 'app/fonts/**/*'
	},
	watch: {
		html: 'app/*.html',
		sass: 'app/sass/**/*.sass',
		js: 'app/js/script.js',
		img: 'app/img/**/*.*',
		fonts: 'app/fonts/img/**/*.*'
	},
	libs: {
		css: {
			linearicons: 'app/libs/linearicons/linearicons.css',
			magnificPopup: 'app/libs/magnific-popup/dist/magnific-popup.css',
			fontawesome: 'app/libs/font-awesome/fontawesome-all.min.css',
			bootstrap: 'app/libs/bootstrap/dist/css/bootstrap.min.css',
			animatecss: 'app/libs/animate.css/animate.min.css'
		},
		js: {
			jquery: 'app/libs/jquery/dist/jquery.min.js',
			magnificPopup: 'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
			bootstrap: 'app/libs/bootstrap/dist/js/bootstrap.min.js',
			wowjs: 'app/libs/wow/dist/wow.min.js'
		}
	},
	common: {
		js: 'app/js/script.js'
	},
	clean: './dist'
}

gulp.task('sass', function() {
	return gulp.src(path.src.sass)
		.pipe(sass())
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
		.pipe(gulp.dest(path.app.css))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('scripts', function() {
	return gulp.src([
			path.libs.js.jquery,
			path.libs.js.magnificPopup,
			path.libs.js.bootstrap,
			path.libs.js.wowjs,
			path.common.js
		])
		.pipe(concat('libs.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(path.app.js))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('css-libs', ['sass'], function() {
	return gulp.src([
			path.libs.css.linearicons,
			path.libs.css.magnificPopup,
			path.libs.css.fontawesome,
			path.libs.css.bootstrap,
			path.libs.css.animatecss
		])
		.pipe(concat('libs.min.css'))
		.pipe(cssnano())
		.pipe(gulp.dest(path.app.css))
});

gulp.task('watch', ['browser-sync', 'css-libs', 'scripts'], function() {

	gulp.watch(path.watch.sass, function(event, cb) {
        setTimeout(function() {
        	gulp.start('sass');
        }, 500) // hack for work with weak computers
    });
	// gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch(path.watch.html, browserSync.reload);
	gulp.watch(path.watch.js, ['scripts']);
});

gulp.task('clean', function() {
	return del.sync(path.clean);
});

gulp.task('img', function() {
	return gulp.src(path.src.img)
		.pipe(cache(imagemin({
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
		.pipe(gulp.dest(path.dist.img));
});

gulp.task('build', ['clean', 'img', 'sass', 'scripts'], function() {

	const buildCss = gulp.src(path.src.css)
	.pipe(gulp.dest(path.dist.css))

	const buildFonts = gulp.src(path.src.fonts)
	.pipe(gulp.dest(path.dist.fonts))

	const buildJs = gulp.src(path.src.js)
	.pipe(gulp.dest(path.dist.js))

	const buildHtml = gulp.src(path.src.html)
	.pipe(gulp.dest(path.dist.html))

});

gulp.task('clear', function() {
	return cache.clearAll();
});

gulp.task('default', ['watch']);