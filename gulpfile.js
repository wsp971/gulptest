var gulp=require("gulp");
var clean=require("gulp-clean");
var sequence=require("gulp-sequence");
var jsmin=require('gulp-jsmin');
var uglifyjs=require('gulp-uglifyjs');
var task_id=0;
gulp.task("default",function(){
	console.log("test");
});
gulp.task("copy",function(){
	console.log("start 第 "+(task_id++)+"个task-->copy");
	return gulp.src("src/js/**/*.js").pipe(gulp.dest("disk/"));
});
gulp.task("clean",function(){
	console.log("start 第 "+(task_id++)+"个task-->clean");
	return gulp.src("disk/",{read:false}).pipe(clean());
});
gulp.task("sequence-test",
	 sequence('clean','copy')
);
gulp.task('jsmin',function(){
	console.log("start 第 "+(task_id++)+"个task-->jsmin");
	return gulp.src('disk/modules/**/*.js').pipe(jsmin()).pipe(gulp.dest('disk/'));
})
gulp.task('uglifyjs',function(){
	console.log("start 第 "+(task_id++)+"个task-->uglifyjs");
	return gulp.src("disk/modules/index/*.js").pipe(uglifyjs()).pipe(clean()).pipe(gulp.dest('disk/modules/index/'));
});
