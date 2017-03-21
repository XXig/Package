var gulp = require('gulp'), 
gulpLoadPlugins = require('gulp-load-plugins'),
plugins = gulpLoadPlugins(),
rev = require('gulp-rev-append'),
cssver = require('gulp-make-css-url-version'),
sever = require('browser-sync');

gulp.task('cssmin',function () {
	return plugins.rubySass('../src/css/*.scss', { style: 'compact' })
	.on('error', function (err) {console.error(err.message)})
	.pipe(plugins.autoprefixer({
		browsers: ['last 2 versions', 'Android >= 4.0','ie 8', 'ie 9',],
		cascade: false, 
		remove:false 
	}))
	.pipe(gulp.dest('../src/css'))
	.pipe(cssver()) 
	.pipe(plugins.rename({ suffix: '.min' }))
	.pipe(plugins.minifyCss({
		advanced: false,
		compatibility: 'ie7',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
		keepBreaks: false,
		keepSpecialComments: '*'
	}))
	.pipe(gulp.dest('../app/css'));
});

gulp.task('jsmin', function () {
	return gulp.src(['../src/js/*.js','!../src/js/{1,3}.js'])//除了1、3 
	.pipe(plugins.changed('../app/js')) 
	.pipe(plugins.uglify({
		mangle: true,
		compress: true,
		preserveComments: 'some' 
	}))
	.pipe(plugins.rename({ suffix: '.min' }))
	// .pipe(plugins.concat('all.js'))
	.pipe(gulp.dest('../app/js'));
});

gulp.task('imgmin', function(){
	return gulp.src(['../src/images/*.{png,jpg}','../src/images/**/*.{png,jpg}']) 
	.pipe(plugins.changed('../app/images'))
	.pipe(plugins.tinypng('vo5bIIOTS-Z3R9hS0yJJbfjO9OHDu_v5'))
	.pipe(gulp.dest('../app/images')); 
});

gulp.task('sever', function () {
	var files = [
	'../src/**/*.html',
	'../src/css/**/*.css',
	'../src/images/**/*.{png,jpg}',
	'../src/js/**/*.js'
	];
	sever.init(files, {
		server: {
			baseDir: '../src'
		}
	});
});

gulp.task('default', function () {
	return gulp.src('../app/**/*', {read: false})
	.pipe(plugins.clean());
});

gulp.task('watch',function(){ 
	gulp.start('jsmin', 'cssmin', 'imgmin','sever');
	gulp.watch('../src/**/*', ['jsmin','cssmin','app','imgmin']);
});

gulp.task('app', function(){
	return gulp.src('../src/html/*.html')
	.pipe(plugins.useref())
	.pipe(gulp.dest('../app/html'))
	.pipe(rev())
	.pipe(gulp.dest('../app/html'));
});
// npm install cnpm -g --registry=https://registry.npm.taobao.org 
// 查看其版本号cnpm -v或关闭命令提示符重新打开
// cnpm install 安装所有
// cnpm uninstall gulp-cache --save-dev
// cnpm install gulp-useref --save-dev