var gulp 					= require('gulp'),
		sass 					= require('gulp-sass'),
		browserSync 	= require('browser-sync'),
		concat 				= require('gulp-concat'),
		uglify 				= require('gulp-uglifyjs'),
		cssnano				= require('gulp-cssnano'),
		rename				= require('gulp-rename'),
		del						= require('del'),
		imagemin			= require('gulp-imagemin'),
		pngquant			= require('imagemin-pngquant'),
		cache					=	require('gulp-cache'),
		autoprefixer 	= require('gulp-autoprefixer');
		htmlmin 			= require('gulp-htmlmin');

//Компилятор Sass
gulp.task('sass',function(){
	return gulp.src('app/sass/**/*.sass')
	.pipe(sass())
	.pipe(autoprefixer({
			browsers: ['last 15 versions'],
      cascade: false}))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}))
});

gulp.task('scripts',function(){
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
	])
	.pipe(concat('libs.min.js')) //собираем все файлы js в 1
	.pipe(uglify())								// сжимаем
	.pipe(gulp.dest('app/js'))			//выгружаем в указанную директорию
})

gulp.task('scripts2',function(){
	return gulp.src([
		'app/js/scripts.js'
	])
	.pipe(concat('scripts.min.js')) //собираем все файлы js в 1
	.pipe(uglify())								// сжимаем
	.pipe(gulp.dest('app/js'))			//выгружаем в указанную директорию
})

gulp.task('css-libs',['sass'],function(){
	return gulp.src('app/css/libs.css')
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('app/css'));
})

//liveReload
gulp.task('browserSync',function(){
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
})

//удаляем директорию dist для очистки
gulp.task('clean',function(){
	return del.sync('dist');
})

//Чистим кеш
gulp.task('clean',function(){
	return cache.clearAll();
})

//сжимаем изображение
gulp.task('img',function(){
	return gulp.src('app/img/*')
	.pipe(cache(imagemin({
		interlaced: true,
		progrssive: true,
		svgoPlugins: [{removeViewBox: false}],
		une:[pngquant()]
	})))
	.pipe(gulp.dest('dist/img/'));
})

//Отслеживание изменения файлов
gulp.task('watch',['browserSync','css-libs','scripts','scripts2'],function(){  //[] -параметры выполняемые до запуска таска
	gulp.watch('app/sass/**/*.sass',['sass']); // [''] массив выполняемых тасков при изменении отслеживаемых файлов 
	gulp.watch('app/*.html',browserSync.reload);
	gulp.watch('app/js/**/*.js',browserSync.reload);
});

//Переносим готовые файлы в конечную папку 
gulp.task('build', ['clean','img','sass','scripts','scripts2'], function(){
	var buildCss 		= gulp.src([
		'app/css/main.css',
		'app/css/stylesheet.css',		
		'app/css/libs.css'	
	])
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('dist/css'));

	var buildFonts 	= gulp.src('app/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'));

	var buildJs 		= gulp.src('app/js/**/*')
	.pipe(gulp.dest('dist/js'));

	var buildHTML 	= gulp.src('app/*html')
	.pipe(htmlmin({collapseWhitespace: true}))
	.pipe(gulp.dest('dist/'));
})