var gulp = require('gulp'), 
gulpLoadPlugins = require('gulp-load-plugins'),
plugins = gulpLoadPlugins(),
rev = require('gulp-rev-append'),
cssver = require('gulp-make-css-url-version'),
sever = require('browser-sync');

var srclj = '../src',
    distlj = '../app';


gulp.task('cssmin',function () {
	return plugins.rubySass(srclj+'/css/*.scss', { style: 'compact' })
	.on('error', function (err) {console.error(err.message)})
	.pipe(plugins.autoprefixer({
		browsers: ['> 5%','last 2 versions', 'Android >= 4.0'],
		// browsers: ['> 5%','last 2 versions', 'ie 6-11'],
		cascade: false, 
		remove:false 
	}))
	.pipe(gulp.dest(srclj+'/css'))
	.pipe(cssver()) 
	.pipe(plugins.rename({ suffix: '.min' }))
	.pipe(plugins.minifyCss({
		advanced: false,
		compatibility: 'ie8',// 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
		keepBreaks: false,
		keepSpecialComments: '*'
	}))
	.pipe(gulp.dest(distlj+'/css'));
});

gulp.task('jsmin', function () {
	return gulp.src([srclj+'/js/*.js','!'+srclj+'/js/{1,3}.js'])//除了1、3 
	.pipe(plugins.changed(distlj+'/js')) 
	.pipe(plugins.uglify({
		mangle: true,
		compress: true,
		preserveComments: 'some' 
	}))
	.pipe(plugins.rename({ suffix: '.min' }))
	// .pipe(plugins.concat('all.js'))
	.pipe(gulp.dest(distlj+'/js'));
});

gulp.task('imgmin', function(){
	return gulp.src([srclj+'/images/*.{png,jpg}',srclj+'/images/**/*.{png,jpg}']) 
	.pipe(plugins.changed(distlj+'/images'))
	.pipe(plugins.tinypng('vo5bIIOTS-Z3R9hS0yJJbfjO9OHDu_v5'))
	.pipe(gulp.dest(distlj+'/images')); 
});

gulp.task('sever', function () {
	var files = [
	srclj+'/**/*.html',
	srclj+'/css/**/*.css',
	srclj+'/images/**/*.{png,jpg}',
	srclj+'/js/**/*.js'
	];
	sever.init(files, {
		server: {
			baseDir: srclj
		}
	});
});

gulp.task('copy', function() {
    return gulp.src([srclj+'/font/**/*',srclj+'/media/**/*',])
        .pipe(gulp.dest(distlj+'/'));
});

gulp.task('default', function () {
	return gulp.src(distlj+'/**/*', {read: false})
	.pipe(plugins.clean());
});

gulp.task('watch',function(){ 
	gulp.start('copy','jsmin', 'cssmin', 'imgmin','sever');
	gulp.watch(srclj+'/**/*', ['jsmin','cssmin','app','imgmin']);
});

gulp.task('app', function(){
	return gulp.src(srclj+'/html/*.html')
	.pipe(plugins.useref())
	.pipe(gulp.dest(distlj+'/html'))
	.pipe(rev())
	.pipe(gulp.dest(distlj+'/html'));
});
// npm install cnpm -g --registry=https://registry.npm.taobao.org 
// 查看其版本号cnpm -v或关闭命令提示符重新打开
// cnpm install 安装所有
// cnpm uninstall gulp-cache --save-dev
// cnpm install gulp-useref --save-dev